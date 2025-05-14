import React, { useCallback, useContext, useState } from "react";
import "../styles/Detail.css";
import Button from "./Button.component";
import Select from "./Select.component";
import { DataContext } from "./DataContext";

const Detail = props => {

    const {
        editable,
        details,
        close,
        selectedCustomer,
        customers

    } = props;

    const {postData} = useContext(DataContext);

    const [name, setName] = useState('');

    const closeDetail = useCallback(() => {
        close();
    }, []);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        postData('/works', {name})
    }, [name])

    return (
        <div className="detail-container">
            <div className="detail-close">
                <Button label={"X"} handleClick={closeDetail}></Button>
            </div>
            <form className="detail-form" onSubmit={handleSubmit}>
                <div className="operator-name">
                    <label>Nome:</label>
                    <input type="text" disabled={!editable} value={details.operatorName} onChange={(e) => {setName(e.target.value)}}></input>
                </div>
                <div className="operator-surname">
                    <label>Cognome:</label>
                    <input type="text" disabled={!editable} value={details.operatorSurname}></input>
                </div>
                <div className="detail-customer">
                    <Select name="customers-select-modal" 
                            label="Cliente: " 
                            dataOptions={customers}
                            selected={details.customerId}
                            disabled={!editable}/>
                </div>
                <div className="detail-work-description">
                    <label>Descrizione lavoro:</label>
                    <textarea type="text" disabled={!editable} value={details.description}></textarea>
                </div>
                <div className="detail-ticket-description">
                    <label>Descrizione ticket:</label>
                    <textarea type="text" disabled={!editable} value={details.ticketDescription}></textarea>
                </div>
                <div className="detail-work-start">
                    <label>Inizio:</label>
                    <input type="number" disabled={!editable} value={details.creationDate ? new Date(details.creationDate).getHours() : undefined}></input>
                </div>
                <div className="detail-work-end">
                    <label>Fine:</label>
                    <input type="number" disabled={!editable} value={details.endDate ? new Date(details.endDate).getHours() : undefined}></input>
                </div>
                <div className="detail-work-total">
                    <label>Ore lavorazione:</label>
                    <input type="number" disabled={!editable} value={(details.creationDate && details.endDate) ? new Date(details.endDate).getHours() - new Date(details.creationDate).getHours() : undefined}></input>
                </div>
                {editable && 
                    <input type="submit" value="invia"></input>}
            </form>

        </div>
    )
}

export default Detail;