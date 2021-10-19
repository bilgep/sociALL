import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  // We're storing out state in events variable
  // We're using the function setEvents to set the state
  // We're setting our state to empty array by using useState([]) hook
  const [events, setEvents] = useState([]);

  // Use effect hook is used to pass dependencies or to do some final tasks like cleaning up
  useEffect(() => {
    axios.get('http://localhost:5000/api/events').then((response: any) => {
      setEvents(response.data);
    })
  }, []);

  return (
    <div>

    <Header as='h2' icon='users' content="SociALL" />

      <List >
          {events.map((event: any) => (         
              <List.Item key={event.id}>
                {event.title}
              </List.Item>
          ))}
      </List>

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


    </div>
  );
}

export default App;
