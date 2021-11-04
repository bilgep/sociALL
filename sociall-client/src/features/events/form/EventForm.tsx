import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';


export default observer (function EventForm(){

    const {eventStore} = useStore();
    const {createEvent, updateEvent, loadEvent} = eventStore;
    const {id} = useParams<{id: string}>();
    const history = useHistory();

    const [formEvent, setEvent] = useState({
            id: '',
            title: '',
            category: '',
            date: '',
            description: '',
            city: '',
            venue: ''        
    });

    useEffect(() => {
        if(id) loadEvent(id).then(event =>  setEvent(event!))
    }, [id, loadEvent]);


    function handleSubmit(){

        if(formEvent.id.length === 0) {
            let tempEvent = {...formEvent, id: uuid()};
            createEvent(tempEvent).then(() => {
                formEvent.id = tempEvent.id;
                history.push(`/events/${tempEvent.id}`);
            });

            
        }
        else
        {
            updateEvent(formEvent).then(() => {
                history.push(`/events/${formEvent.id}`);
            });
        }
    }

    function handleInputChange(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setEvent({...formEvent, [name] : value});
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={formEvent.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={formEvent.description} name='description'  onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={formEvent.category} name='category'  onChange={handleInputChange} />
                <Form.Input placeholder='Date' value={formEvent.date} name='date' type='date'  onChange={handleInputChange} />
                <Form.Input placeholder='City' value={formEvent.city} name='city'  onChange={handleInputChange}  />
                <Form.Input placeholder='Venue' value={formEvent.venue} name='venue'  onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button floated='right' type='button' content='Cancel'  />
            </Form> 
        </Segment>
    )
})