import React from "react";
import { createContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const baseUrl = 'http://localhost:12345';

    const getData = async (endpoint, params = {}) => {
        
        const url = new URL(`${baseUrl}${endpoint}`);
        Object.entries(params).forEach(([key, value]) =>
            url.searchParams.append(key, value)
            );
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Errore nel recupero dati');
        } 
        const result = await response.json();
        
        return result;
    };

    return (
        <DataContext.Provider value={{ getData}}>
            {children}
        </DataContext.Provider>
    );
}
