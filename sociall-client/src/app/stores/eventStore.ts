import { makeAutoObservable, runInAction, toJS } from "mobx";
import agent from "../api/agent";
import { SocialEvent } from "../modules/socialevent";
import { v4 as uuid } from 'uuid';

export default class EventStore {

    events: SocialEvent[] = [];
    selectedEvent: SocialEvent | undefined = undefined;
    editMode = false;

    get getEventsByDate(){
        return Array.from(this.events.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
    }

    constructor() {
        makeAutoObservable(this)
    }

    loadEvents = async () => {
        try {
            const tempEvents = await agent.Events.list();

            runInAction(() => {
                tempEvents.forEach(e => {
                    e.date = e.date.split('T')[0];
                    this.events.push(e);
                });

                this.events = toJS(this.events);
            });
        } catch (error) {
            console.log(error);
        }
    }


    selectEvent = (id: string | undefined) => {
        this.selectedEvent = toJS(this.events).find(x => x.id === id);

    }

    cancelSelectedEvent = () => {
        this.selectedEvent = undefined;
        this.editMode = false;
    }

    openForm = (id?: string) => {
        id ? this.selectEvent(id) : this.cancelSelectedEvent();
        this.editMode = true;
    }

    closeForm = () => {
        this.selectedEvent = undefined;
        this.editMode = false;
    }

    deleteEvent = async (id: string) => {
        try {
            await agent.Events.delete(id);

            runInAction(async () => {
                this.events = this.events.filter(x => x.id !== id);
                this.editMode = false;
                this.selectedEvent = undefined;
            });

        } catch (error) {
            console.log(error);
        }
    }

    createEditEvent = async (event: SocialEvent) => {
        try {
            if(event.id) {
                await agent.Events.update(event);

                runInAction(() => {
                    this.events = toJS(this.events).filter(x => x.id !== event.id);
                    this.events.push(event);
                    this.selectedEvent = event;
                    this.editMode = false;
                });
            }
            else {
                event.id = uuid();
                await agent.Events.create(event);

                runInAction(() => {
                    this.events.push(event);
                    this.selectedEvent = event;
                    this.editMode = false;
                })
            }

            runInAction(() => {
                toJS(this.events).push(event);
                this.selectedEvent = event;
                this.editMode = false;
            })

        } catch (error) {
            console.log(error);
        }
    }

}