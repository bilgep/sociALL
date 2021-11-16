import { makeAutoObservable, runInAction, toJS } from "mobx";
import agent from "../api/agent";
import { SocialEvent } from "../models/socialevent";
import {format} from 'date-fns';


export default class EventStore {

    events: SocialEvent[] = [];
    selectedEvent: SocialEvent | undefined = undefined;
    editMode = false;

    get getEventsByDate(){
        return Array.from(this.events.values()).sort((a,b) => a.date!.getTime() - b.date!.getTime());
    }

    get getGroupedEvents(){
        return Object.entries(
            this.getEventsByDate.reduce((evnts, evnt) => {
                // const date = evnt.date!.toISOString().split('T')[0];
                const date = format( evnt.date!, 'dd MMM yyyy' );
                evnts[date] = evnts[date] ? [...evnts[date], evnt] : [evnt];
                return evnts;
            }, {} as {[key: string]: SocialEvent[]})
        )
    }

    constructor() {
        makeAutoObservable(this)
    }

    loadEvents = async () => {
        try {
            const tempEvents = await agent.Events.list();
            runInAction(() => { this.events = toJS(this.events); });
            if(this.events.length <= 0)
            {
                tempEvents.forEach(e => {
                    this.modifyDate(e);
                    runInAction(() => {
                        this.events.push(e);
                    });
                });
            }   
        } catch (error) {
            console.log(error);
        }
    }

    loadEvent = async (id: string) => {
        runInAction(() => {
            this.selectedEvent = undefined;
        });
        
        try{

            if(this.getEvent(id))
            {
                let event = this.getEvent(id);

                this.modifyDate(event as SocialEvent);
                runInAction(() => {
                    this.selectedEvent = event;

                });

            }
            else{
                let event = await agent.Events.details(id);
                this.modifyDate(event as SocialEvent);
                runInAction(() => {
                    this.selectedEvent = event;

                });
            }

            return toJS(this.selectedEvent);
        }
        catch(e){
            console.log(e);
        }
    }

    private getEvent = (id: string) => {
        return this.events.find(e =>  e.id === id);
    }

    private modifyDate = (e: SocialEvent) => {
        e.date = new Date(e.date!);       
    }

    // selectEvent = (id: string | undefined) => {
    //     this.selectedEvent = toJS(this.events).find(x => x.id === id);

    // }

    // cancelSelectedEvent = () => {
    //     this.selectedEvent = undefined;
    //     this.editMode = false;
    // }

    // openForm = (id?: string) => {
    //     id ? this.selectEvent(id) : this.cancelSelectedEvent();
    //     this.editMode = true;
    // }

    // closeForm = () => {
    //     this.selectedEvent = undefined;
    //     this.editMode = false;
    // }

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

    createEvent = async(event: SocialEvent) =>{
        try {
            await agent.Events.create(event);

                runInAction(() => {
                    this.events.push(event);
                    this.selectedEvent = event;
                    this.editMode = false;
                })

        } catch (error) {
            console.log(error);
        }
    }

    updateEvent = async (event: SocialEvent) => {
        try {
                await agent.Events.update(event);

                runInAction(() => {
                    this.events = toJS(this.events).filter(x => x.id !== event.id);
                    toJS(this.events).push(event);
                    this.selectedEvent = event;
                    this.editMode = false;
                });

            }
            catch (error) {
            console.log(error);
        }
    }

}