import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik , Form} from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import { SocialEvent } from "../../../app/models/socialevent";


export default observer(function EventForm() {

    const { eventStore } = useStore();
    const { loadEvent, createEvent, updateEvent } = eventStore;
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const [formEvent, setEvent] = useState<SocialEvent>({
        id: '',
        title: '',
        category: '',
        date: null,
        description: '',
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required'),
        description: Yup.string().required('The event description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('The date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required()
    });

    useEffect(() => {
        if (id) {
            loadEvent(id).then(event => setEvent(event!));
        }
    }, [id, loadEvent]);


    function handleFormSubmit(formEvent: SocialEvent){

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

    return (
        <Segment clearing>
            <Header content='Event Details' sub color='teal'/>
            
            <Formik 
                enableReinitialize 
                initialValues={formEvent} 
                onSubmit={values => handleFormSubmit(values)} 
                validationSchema={validationSchema}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (

                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea placeholder='Description' name='description' rows={3}/>
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput name='date' placeholderText='Date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa'/>
                        
                        <Header content='Location Details' sub color='teal'/>
                        <MyTextInput placeholder='City' name='city'/>
                        <MyTextInput placeholder='Venue'name='venue' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            floated='right' positive type='submit' content='Submit' />
                        <Button floated='right' type='button' content='Cancel' />
                    </Form>

                )}
            </Formik>


        </Segment>
    )
})