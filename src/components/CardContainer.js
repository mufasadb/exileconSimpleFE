import React from "react";
import Card from "./Card"
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd"

import { updateCards } from "../context/CardStore"
import { useDispatch, useSelector } from "react-redux"




const CardContainer = () => {


    const dispatch = useDispatch()
    const { cards } = useSelector(state => state.cards)



    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(cards);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);


        dispatch(updateCards(items))
    }

    return (

        < DragDropContext onDragEnd={handleOnDragEnd} >
            < Droppable droppableId="Cards" >
                {(provided) => (
                    <ul className="Cards" {...provided.droppableProps} ref={provided.innerRef} >
                        {cards.map((card, index) => {
                            return (
                                <Draggable key={`droppable:${card.id}`} draggableId={card.id.toString()} index={index} >
                                    {provided => (
                                        <li key={card.id} {...provided.draggableProps}  {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <Card key={card.id} title={card.name} index={index} card={card} />
                                        </li>
                                    )}
                                </Draggable>)
                        })}
                    </ul>
                )}
            </Droppable >
        </DragDropContext >

    )
}

export default CardContainer;