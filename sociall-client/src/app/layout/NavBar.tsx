import React from "react";
import { Menu, Container, Button} from "semantic-ui-react";

interface Props
{
    openForm: () => void;
}

export default function NavBar({openForm}: Props)
{
    return (

        <Menu inverted fixed='top'>
            <Container> 
                {/* Container is for padding */}
                <Menu.Item header>
                sociALL <img src="/assets/logo.png" alt="logo" style={{marginLeft: '10px'}}/> 
                </Menu.Item>
                <Menu.Item name="Events"/>
                <Menu.Item>
                    <Button positive content="Create Event" onClick={() => {openForm() ;console.log('Open Form for new Event')}}></Button>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

