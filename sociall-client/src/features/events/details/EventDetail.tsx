import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import {  Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TempComponent from "../../../TempComponent";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";


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

        <Grid>
        
            <Grid.Column width={10}>
                <EventDetailedHeader event={selectedEvent}/>
                <EventDetailedInfo event={selectedEvent}/>
                <EventDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSidebar/>
            </Grid.Column>
        </Grid>


        // <Card fluid>
        //     <Image src={`/assets/categoryImages/${selectedEvent.category}.jpg`} />
        //     <Card.Content>
        //         <Card.Header>{selectedEvent.title}</Card.Header>
        //         <Card.Meta>
        //             <span>{selectedEvent.date}</span>
        //         </Card.Meta>
        //         <Card.Description>
        //             {selectedEvent.description}
        //         </Card.Description>
        //     </Card.Content>
        //     <Card.Content extra>
        //         <Button.Group widths='2'>
        //             <Button basic color='blue' content='Edit' as={Link} to={`/editEvent/${selectedEvent.id}`} />
        //             <Button basic color='grey' content='Cancel' as={Link} to={`/events/${selectedEvent.id}`}  /> 
        //         </Button.Group>
        //     </Card.Content>
        // </Card>
    )

})