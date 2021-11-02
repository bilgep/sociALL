import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { SocialEvent } from "../../../app/modules/socialevent";
import { useStore } from "../../../app/stores/store";


export default observer (function EventForm(){

const {eventStore} = useStore();
const {selectedEvent, closeForm, createEditEvent} = eventStore;

    const initialState = selectedEvent ?? {
        id: '',
        title: '',
        category: '',
        date: '',
        description: '',
        city: '',
        venue: ''        
    };

    const [formEvent, setEvent] = useState<SocialEvent>(initialState);

    function handleSubmit(){
        createEditEvent(formEvent);
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
                <Button floated='right' type='button' content='Cancel'  onClick={() => {closeForm()}}/>
            </Form> 
        </Segment>
    )
})