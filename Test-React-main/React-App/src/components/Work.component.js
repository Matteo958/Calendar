import React from "react";

const Work = props => {

    const {
        workId,
        operatorName,
        operatorSurname,
        customer
    } = props;

    return (
        <div className="calendar-work">
            <div>Operatore: {operatorName} {operatorSurname}</div>
            <div>Cliente: {customer}</div>
        </div>
    )
}

export default Work;