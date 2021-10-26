import React from "react";
import { Grid } from "semantic-ui-react";
import { SocialEvent } from "../../../app/modules/socialevent";
import EventDetail from "../details/EventDetail";
import EventForm from "../form/EventForm";
import EventList from "./EventList";

interface Props {
    events: SocialEvent[];
    selectedEvent: SocialEvent | undefined;
    selectEvent: (id: string) => void;
    cancelSelectEvent: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createEditEvent: (event: SocialEvent) => void;
    deleteEvent: (id: string) => void;
}

export default function EventDashboard({ events, selectedEvent, selectEvent, cancelSelectEvent, editMode, openForm, closeForm, createEditEvent, deleteEvent }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <EventList events={events} selectEvent={selectEvent} deleteEvent={deleteEvent} />
            </Grid.Column>
            <Grid.Column width='6'>

                    {selectedEvent && !editMode &&
                        <EventDetail 
                            event={selectedEvent} 
                            cancelSelectEvent={cancelSelectEvent} 
                            openForm={openForm}
                        />
                    }

                    {editMode &&
                        <EventForm 
                            event={selectedEvent} 
                            closeForm={closeForm}
                            createEditEvent={createEditEvent}
                        />
                    }

            </Grid.Column>

        </Grid>
    )

}