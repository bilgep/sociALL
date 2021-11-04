import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer( function EventList(){

    const {eventStore} = useStore();
    const {getEventsByDate: events, deleteEvent} = eventStore;
    

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
                                <Button floated='right' content='View' color='blue' as={Link} to={`/events/${event.id}`}/>
                                <Button floated='right' content='Delete' color='red' onClick={() => {deleteEvent(event.id)}}/>
                                <Label content={event.category} basic/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )}
            </Item.Group>
            
        </Segment>
    )
})