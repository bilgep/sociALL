import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container, Button} from "semantic-ui-react";


export default function NavBar()
{

    return (

        <Menu inverted fixed='top'>
            <Container> 
                {/* Container is for padding */}
                <Menu.Item as={NavLink} to='/' exact header>
                sociALL <img src="/assets/logo.png" alt="logo" style={{marginLeft: '10px'}}/> 
                </Menu.Item>
                <Menu.Item as={NavLink} to='/events' name="Events"/>
                <Menu.Item>
                    <Button positive content="Create Event" as={NavLink} to='/createEvent'></Button>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

