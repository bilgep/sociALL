import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TempComponent from "../../../TempComponent";


export default observer (function EventDetail() {

    const {eventStore} = useStore();
    const {loadEvent, selectedEvent } = eventStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) {
            loadEvent(id);
        }
      }, [id, loadEvent]);

    if(!selectedEvent)  return <TempComponent />; // TODO
    

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedEvent.category}.jpg`} />
            <Card.Content>
                <Card.Header>{selectedEvent.title}</Card.Header>
                <Card.Meta>
                    <span>{selectedEvent.date}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedEvent.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' content='Edit' as={Link} to={`/editEvent/${selectedEvent.id}`} />
                    <Button basic color='grey' content='Cancel' as={Link} to={`/events/${selectedEvent.id}`}  /> 
                </Button.Group>
            </Card.Content>
        </Card>
    )

})