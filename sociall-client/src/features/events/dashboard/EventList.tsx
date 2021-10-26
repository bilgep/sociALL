import React from "react";
import { Button, Item, Label, Segment} from "semantic-ui-react";
import { SocialEvent } from "../../../app/modules/socialevent";

interface Props
{
    events: SocialEvent[];
    selectEvent: (id: string) => void;
    deleteEvent: (id: string) => void;
}

export default function EventList({events, selectEvent, deleteEvent}: Props){
    return(
        <Segment>
            <Item.Group divided>
                {events.map(event =>
                    <Item key={event.id}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {event.title}
                            </Item.Header>
                            <Item.Meta>
                                {event.date}
                            </Item.Meta>
                            <Item.Description>
                                <div>{event.description}</div>
                                <div>{event.city}, {event.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' onClick={() => {selectEvent(event.id)}}/>
                                <Button floated='right' content='Delete' color='red' onClick={() => {deleteEvent(event.id)}}/>
                                <Label content={event.category} basic/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )}
            </Item.Group>
            
        </Segment>
    )
}