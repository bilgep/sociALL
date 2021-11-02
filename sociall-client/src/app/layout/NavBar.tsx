import React from "react";
import { Menu, Container, Button} from "semantic-ui-react";
import { useStore } from "../stores/store";


export default function NavBar()
{
    const {eventStore} = useStore();

    return (

        <Menu inverted fixed='top'>
            <Container> 
                {/* Container is for padding */}
                <Menu.Item header>
                sociALL <img src="/assets/logo.png" alt="logo" style={{marginLeft: '10px'}}/> 
                </Menu.Item>
                <Menu.Item name="Events"/>
                <Menu.Item>
                    <Button positive content="Create Event" onClick={() => {eventStore.openForm()}}></Button>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

