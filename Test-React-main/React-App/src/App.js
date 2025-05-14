import React, { useCallback, useEffect, useState, useContext } from 'react';
import Calendar from './components/Calendar.component';
import { DataContext } from "./components/DataContext";
import './styles/App.css';

const App = () => {

    const [operators, setOperators] = useState([]);
    const [customers, setCustomers] = useState([]);

    const {getData} = useContext(DataContext);

    // GET: Recupera tutte le lavorazioni
    const testGet = useCallback(
        async () => {
            const response = await fetch('http://localhost:12345/works');
            const result = await response.json();
            console.log('GET /works', result);
            return result;
        }, []
    )

    // POST: Crea una nuova lavorazione
    const testPost = useCallback(
        async () => {
            const response = await fetch('http://localhost:12345/works', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "operatorId": 1,
                    "ticketId": 2,
                    "creationDate": Date.now(),
                    "endDate": Date.now() + 3600000,
                    "description": "Test POST nuova lavorazione"
                })
            });
            if (!response.ok) {
                console.error('POST error:', response.statusText);
                return;
            }
            const result = await response.json();
            console.log('POST /works', result);
            return result;
        }, []
    )

    // PUT: Aggiorna una lavorazione esistente (id 1 come esempio)
    const testPut = useCallback(
        async () => {
            const response = await fetch('http://localhost:12345/works/1', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id": 1,
                    "operatorId": 2,
                    "ticketId": 1,
                    "creationDate": 1727852400000,
                    "endDate": 1727866800000,
                    "description": "Test PUT aggiornamento lavorazione"
                })
            });
            if (!response.ok) {
                console.error('PUT error:', response.statusText);
                return;
            }
            const result = await response.json();
            console.log('PUT /works/1', result);
            return result;
        }, []
    )



    useEffect(
        () => {
            getData("/operators").then(
                result => setOperators(result)
            );
            getData("/customers").then(
                result => setCustomers(result)
            );
        }, []
    )

    return (
        <Calendar operators={operators} customers={customers}/>
    );
};

export default App;
