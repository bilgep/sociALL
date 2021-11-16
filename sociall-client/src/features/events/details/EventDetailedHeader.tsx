import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { SocialEvent } from '../../../app/models/socialevent';
import {format} from 'date-fns';

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    event: SocialEvent
}

export default observer (function EventDetailedHeader({event}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid style={eventImageStyle}/>
                <Segment style={eventImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={event.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(event.date!, 'dd MMM yyyy h:mm aa')}</p>
                                <p>
                                    Hosted by <strong>USER</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Event</Button>
                <Button>Cancel attendance</Button>
                <Button color='orange' floated='right' as={Link} to={`/editEvent/${event.id}`}>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})