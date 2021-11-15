import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import EventStore from "./eventStore";

interface Store{
    eventStore: EventStore
    commonStore: CommonStore
}

export const store: Store = { 
    eventStore: new EventStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
