import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import EventFilters from "./EventFilters";
import EventList from "./EventList";

export default observer( function EventDashboard() {

    const {eventStore} = useStore();
    const {loadEvents} = eventStore;

    useEffect(() => {
        loadEvents();    
    }, [loadEvents]);
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <EventList />
            </Grid.Column>
            <Grid.Column width='6'>
                <EventFilters />
            </Grid.Column>

        </Grid>
    )

})