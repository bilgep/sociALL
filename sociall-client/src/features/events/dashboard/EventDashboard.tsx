import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import EventDetail from "../details/EventDetail";
import EventForm from "../form/EventForm";
import EventList from "./EventList";

export default observer( function EventDashboard() {

    const {eventStore} = useStore();
    const {selectedEvent, editMode} = eventStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <EventList />
            </Grid.Column>
            <Grid.Column width='6'>

                    {selectedEvent && !editMode &&
                        <EventDetail />
                    }

                    {editMode &&
                        <EventForm />
                    }

            </Grid.Column>

        </Grid>
    )

})