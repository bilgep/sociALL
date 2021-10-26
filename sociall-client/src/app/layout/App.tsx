import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { SocialEvent } from '../modules/socialevent';
import NavBar from './NavBar';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  // We're storing out state in events variable
  // We're using the function setEvents to set the state
  // We're setting our state to empty array by using useState([]) hook
  const [events, setEvents] = useState<SocialEvent[]>([]);
  const [selectedEvent , setSelectedEvent] = useState<SocialEvent | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  // Use effect hook is used to pass dependencies or to do some final tasks like cleaning up
  useEffect(() => {
    axios.get<SocialEvent[]>('http://localhost:5000/api/events').then((response) => {
      setEvents(response.data);
    });
    
  }, []);


  function handleSelectEvent(id: string){
    setSelectedEvent(events.find(event => event.id === id))
  }

  function handleCancelSelectEvent(){
    setSelectedEvent(undefined);
  }

  function handleFormOpen(id?: string ){
    id ? handleSelectEvent(id) : handleCancelSelectEvent();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateEditEvent(event: SocialEvent){
    event.id ? setEvents([...events.filter(x => x.id !== event.id), event]) : setEvents([...events, {...event, id: uuid()}]);
    setEditMode(false);
    setSelectedEvent(event);
  }

  function handleDeleteEvent(id: string){
    setEvents([...events.filter( x => x.id !== id)]);
    setEditMode(false);
    setSelectedEvent(undefined);
  }

  return (
    <Fragment>

      <NavBar openForm={handleFormOpen} />

      <Container style={{marginTop: '7em'}}>

        <EventDashboard 
          events={events} 
          selectedEvent={selectedEvent} 
          selectEvent={handleSelectEvent} 
          cancelSelectEvent={handleCancelSelectEvent}
          editMode = {editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createEditEvent={handleCreateEditEvent}
          deleteEvent={handleDeleteEvent}
        />

      </Container>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />  
      <br/>

        <ul>
          {events.map((event: any) => (
              <li key={event.id}>
                {event.title}
              </li>
          ))}
        </ul>

      </header> */}


    </Fragment>
  );
}

export default App;