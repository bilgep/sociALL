import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { SocialEvent } from "../../../app/modules/socialevent";

interface Props
{
    event: SocialEvent;
    cancelSelectEvent: () => void;
    openForm: (id: string) => void;
}


export default function EventDetail({event, cancelSelectEvent, openForm}: Props) {
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
                    <Button basic color='blue' content='Edit' onClick={() => {openForm(event.id);console.log('Selected event is: ' + event.title)}} />
                    <Button basic color='grey' content='Cancel'  onClick={() => { cancelSelectEvent() ;console.log('Selected Event Cancelled')}}  /> 
                </Button.Group>
            </Card.Content>
        </Card>
    )

}