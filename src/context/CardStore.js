import { createSlice } from "@reduxjs/toolkit"
import { camelize } from "../helpers/tools"


export const gameSlice = createSlice({
    name: "card",
    initialState: {
        cards: [],
        selectedCards: {
            oneHandedWeapon: { selected: false, card: null },
            twoHandedWeapon: { selected: false, card: null },
            armour: { selected: false, card: null },
            shield: { selected: false, card: null },
            ring: { selected: false, card: null, asWeapon: true },
            amulet: { selected: false, card: null, asWeapon: true }
        },
        rewardCards: []
    },
    reducers: {
        addRewards: (state, action) => {
            state.rewardCards = action.payload
        },
        removeRewards: (state) => { state.rewardCards = [] },
        clipCards:(state)=> {
            let newCards = state.cards


            state.cards = newCards
        },
        updateCards: (state, action) => {
            state.cards = action.payload;
        },
        updateAsWeaponState: (state, action) => {
            let newSelectedCards = state.selectedCards
            let card = action.payload
            newSelectedCards[camelize(card.type)].card = card
            newSelectedCards[camelize(card.type)].asWeapon = newSelectedCards[camelize(card.type)].asWeapon ? false : true
            state.selectedCards = newSelectedCards
        },
        updateSelected: (state, action) => {
            let selectedCard = action.payload
            let newCards = state.cards
            let newCardIndex = newCards.findIndex(card => { return selectedCard.id === card.id })
            newCards[newCardIndex].selected = newCards[newCardIndex].selected ? false : true;
            let selectedType = camelize(selectedCard.type)
            let newSelectedCards = state.selectedCards
            if (!state.selectedCards[selectedType].selected) {
                console.log("hasn't been selected yet")
                newSelectedCards[selectedType].selected = true
                newSelectedCards[selectedType].card = selectedCard
            } else if (state.selectedCards[selectedType].card.id === selectedCard.id) {
                newSelectedCards[selectedType].selected = false
                newSelectedCards[selectedType].card = null
            } else {
                let oldSelectedSameTypeCard = newCards.findIndex(card => { return card.id === newSelectedCards[selectedType].card.id })
                newCards[oldSelectedSameTypeCard].selected = false
                newSelectedCards[selectedType].card = selectedCard
            }
            if (selectedType === "twoHandedWeapon") {
                if (newSelectedCards.oneHandedWeapon.selected) {
                    let oldSelectedSameTypeCard = newCards.findIndex(card => { return card.id === newSelectedCards.oneHandedWeapon.card.id })
                    newCards[oldSelectedSameTypeCard].selected = false
                    newSelectedCards.oneHandedWeapon.selected = false
                    newSelectedCards.oneHandedWeapon.card = null
                }
            }
            if (selectedType === "oneHandedWeapon") {
                if (newSelectedCards.twoHandedWeapon.selected) {
                    let oldSelectedSameTypeCard = newCards.findIndex(card => { return card.id === newSelectedCards.twoHandedWeapon.card.id })
                    newCards[oldSelectedSameTypeCard].selected = false
                    newSelectedCards.twoHandedWeapon.selected = false
                    newSelectedCards.twoHandedWeapon.card = null
                }
            }
            state.selectedCards = newSelectedCards
            state.cards = newCards
        }
    }
})


export const { updateCards, updateSelected, updateAsWeaponState, addRewards, removeRewards } = gameSlice.actions

export default gameSlice.reducer;

