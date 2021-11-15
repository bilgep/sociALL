import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import EventForm from '../../features/events/form/EventForm';
import EventDetail from '../../features/events/details/EventDetail';
import { ToastContainer } from 'react-toastify';
import TestErrors from '../../features/errors/TestErrors';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';



function App() {

  const location = useLocation();

  return (
    <>
      <Route path="/" component={HomePage} exact /> {/* If we go to this URL (/), the router routes us to the HomePage component*/}

      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <ToastContainer position='bottom-right' hideProgressBar />

            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path="/events" component={EventDashboard} />
                <Route path="/events/:id" component={EventDetail} />
                <Route path={['/createEvent', '/editEvent/:id']} component={EventForm} key={location.key} />
                <Route exact path='/errors' component={TestErrors}/>
                <Route path='/server-error' component={ServerError}/>
                <Route component={NotFound}/> 
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
