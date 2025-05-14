import React, { useCallback, useState } from "react";
import { createContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({children}) => {

    const [openDetail, setOpenDetail] = useState({open: false, editable: false, details: {}});

    const baseUrl = 'http://localhost:12345';

    const getData = useCallback( async (endpoint, params = {}) => {
        
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
    }, []);

    const postData = useCallback( async (endpoint, data = {}) => {
        const url = new URL (`${baseUrl}${endpoint}`);
        const response = await fetch(url, {
            method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
        })
        if (!response.ok) {
                console.error('POST error:', response.statusText);
                return;
            }
            const result = await response.json();
            return result;
    }, [])

    return (
        <DataContext.Provider value={{openDetail, setOpenDetail, getData, postData}}>
            {children}
        </DataContext.Provider>
    );
}
