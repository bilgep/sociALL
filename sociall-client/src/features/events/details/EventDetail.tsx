import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TempComponent from "../../../TempComponent";


export default function EventDetail() {

    const {eventStore} = useStore();
    const {selectedEvent: event, openForm, cancelSelectedEvent} = eventStore;
    
    if(!event) return <TempComponent />; 
    // TODO

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${event.category}.jpg`} />
            <Card.Content>
                <Card.Header>{event.title}</Card.Header>
                <Card.Meta>
                    <span>{event.date}</span>
                </Card.Meta>
                <Card.Description>
                    {event.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' content='Edit' onClick={() => {openForm(event.id)}} />
                    <Button basic color='grey' content='Cancel'  onClick={() => {cancelSelectedEvent()}}  /> 
                </Button.Group>
            </Card.Content>
        </Card>
    )

}