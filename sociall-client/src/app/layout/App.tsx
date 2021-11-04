import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import EventForm from '../../features/events/form/EventForm';
import EventDetail from '../../features/events/details/EventDetail';

function App() {

  const location = useLocation();

  return (
    <>
      <Route path="/" component={HomePage} exact /> {/* If we go to this URL (/), the router routes us to the HomePage component*/}

      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              {/* <EventDashboard /> */}
              <Route exact path="/events" component={EventDashboard} />
              <Route path="/events/:id" component={EventDetail} />
              <Route path={['/createEvent', '/editEvent/:id']} component={EventForm} key={location.key} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
