import * as React from "react";
import { useLocalStore } from 'mobx-react-lite';
import { createStore, TStore, store } from "./store";

export const storeContext = React.createContext<TStore | null>(null);

export const StoreProvider = ({children}: any) => {
    const store = useLocalStore(createStore);
    return <storeContext.Provider value={store}>{children}</storeContext.Provider>
};

export const useStore = () => {
    // const store = React.useContext(storeContext);
    if(!store){
        throw new Error('You have forgot to use StoreProvider.');
    }
    return store;
};
