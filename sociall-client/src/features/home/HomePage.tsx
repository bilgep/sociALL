import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

export default function HomePage(){
    return(


         <Segment inverted  textAlign='center' vertical className='masthead'>
             <Container text>
                 <Header as='h1' inverted >
                     <Image size='massive' src='/assets/logo.png' alt='logo' styke={{marginBottom:12}}/>
                     Events
                 </Header>
                 <Header as='h2' inverted content='Welcome to sociALL'/>
                 <Button as={Link} to='/events' size='huge' inverted content='Take me to Events'/>
             </Container>
         </Segment>
    )
}