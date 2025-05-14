import React, { useCallback, useContext } from "react";
import { DataContext } from "./DataContext";

const Work = props => {

    const {
        workId,
        operatorName,
        operatorSurname,
        customer,
        customerId,
        description,
        ticketDescription,
        creationDate,
        endDate
    } = props;

    const {setOpenDetail} = useContext(DataContext);

    const handleClick = useCallback((event) => {
        event.stopPropagation();
        setOpenDetail(
                      {
                          open: true,
                          editable: false,
                          details: {
                                    operatorName,
                                    operatorSurname,
                                    customer,
                                    customerId,
                                    description,
                                    ticketDescription,
                                    creationDate,
                                    endDate
                            }
                        })
    }, [operatorName, operatorSurname, customer, customerId, description, ticketDescription, creationDate, endDate])

    return (
        <div className="calendar-work"
             onClick={(e) => {handleClick(e)}}>
            <div>Operatore: {operatorName} {operatorSurname}</div>
            <div>Cliente: {customer}</div>
        </div>
    )
}

export default Work;