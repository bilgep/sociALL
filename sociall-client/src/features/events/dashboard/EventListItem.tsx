import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { SocialEvent } from "../../../app/models/socialevent";

interface Props {
    event: SocialEvent;
}

export default function EventListItem({ event }: Props) {

    return (
        <>
            <Segment.Group>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image size='tiny' circular src='\assets\user.png' />
                            <Item.Content>
                                <Item.Header as={Link} to={`/events/${event.id}`}>
                                    {event.title}
                                </Item.Header>
                                <Item.Description>
                                    Hosted by PERSON (TO DO)
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment>
                    <span>
                        <Icon name='clock' />{event.date} 
                        &nbsp; &nbsp; 
                        <Icon name='marker' />{event.venue}
                    </span>
                </Segment>
                <Segment secondary>
                    Attendees List (TO DO)
                </Segment>
                <Segment clearing>
                    <span>{event.description}</span>
                    <Button as={Link} to={`/events/${event.id}`}  color='teal' floated='right' content='View' />
                </Segment>
            </Segment.Group>


            {/* <Item key={event.id}>
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
                        <Button floated='right' content='View' color='blue' as={Link} to={`/events/${event.id}`} />
                        <Button floated='right' content='Delete' color='red' onClick={() => { deleteEvent(event.id) }} />
                        <Label content={event.category} basic />
                    </Item.Extra>
                </Item.Content>
            </Item> */}

        </>
    )
}