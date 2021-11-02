import React, {useEffect} from 'react';
import {Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {eventStore} = useStore();
  
  useEffect(() => {
    eventStore.loadEvents();
  }, [eventStore]);

  // We're storing out state in events variable
  // We're using the function setEvents to set the state
  // We're setting our state to empty array by using useState([]) hook

  // Use effect hook is used to pass dependencies or to do some final tasks like cleaning up


  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <EventDashboard />
      </Container>
    </>
  );
}

export default observer(App);
