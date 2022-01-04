import React, { useState, useContext, useEffect } from "react";
// import { Paper, Grid } from "@mui/material";
import Card from "./Card"
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd"
import { GameContext } from "../context/GameContext";
import { camelize } from "../helpers/tools"
const CardContainer = ({ }) => {

    const game = useContext(GameContext)
    const [cards, setCards] = useState(game.state.cards);



    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(cards);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setCards(items)
    }

    function select(selectedCard) {
        if (selectedCard.selected) {
            //the current card
            selectedCard.selected = false
        } else {
            //not the current card
            selectedCard.selected = true
            if (game.state.selectedCards[camelize(selectedCard.type)].selected) {

                //different card, same type
                if (game.state.selectedCards[camelize(selectedCard.type)].card.id !== selectedCard.id) {
                    // console.log(`this is the old card`)
                    // console.log(game.state.selectedCards[camelize(selectedCard.type)])
                    let oldCard = cards.findIndex(card => { return card.id === game.state.selectedCards[camelize(selectedCard.type)].card.id })
                    cards[oldCard].selected = false
                    setCards(cards)
                }
            }
        }

        if (selectedCard.type === "OneHandedWeapon") {
            let oldCard = cards.findIndex(card => { return card.type === "TwoHandedWeapon" && card.selected })
            if (oldCard > -1) {
                cards[oldCard].selected = false
            }
            setCards(cards)
        }
        if (selectedCard.type === "TwoHandedWeapon") {
            let oldCard = cards.findIndex(card => { return card.type === "OneHandedWeapon" && card.selected })
            if (oldCard > -1) {
                cards[oldCard].selected = false
            }
            setCards(cards)
        }



        game.updateSelected(selectedCard)

    }
    function asWeaponClick(card) {
        let oldCard = cards.findIndex(thisCard => { return thisCard.id == card.id })
        if (oldCard > -1) {
            cards[oldCard].asWeapon = cards[oldCard].asWeapon ? false : true
        }
        setCards(cards)
        game.updateAsWeaponState(card)
    }
    return (



        < DragDropContext onDragEnd={handleOnDragEnd} >
            {game.state.player}
            < Droppable droppableId="Cards" >
                {(provided) => (

                    <ul className="Cards" {...provided.droppableProps} ref={provided.innerRef} >

                        {cards.map((card, index) => {
                            return (

                                <Draggable key={card.id.toString()} draggableId={card.id.toString()} index={index} >
                                    {provided => (

                                        <li key={card.id} {...provided.draggableProps}  {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <Card card={card} asWeaponClick={asWeaponClick} select={select} />
                                        </li>
                                    )
                                    }
                                </Draggable>)
                        })}

                    </ul>
                )}
            </Droppable >
        </DragDropContext >

    )
}

export default CardContainer;