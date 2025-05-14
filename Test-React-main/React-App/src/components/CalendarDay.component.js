import React, { useCallback, useContext } from "react";
import "../styles/CalendarDay.css";
import Work from "./Work.component";
import { DataContext } from "./DataContext";

const CalendarDay = props => {

    const {
        day,
        works,
    } = props;

    const {setOpenDetail} = useContext(DataContext);

    const handleClick = useCallback(() => {
        setOpenDetail({
            open: true,
            editable: true,
            details: {}
        })
    }, []);


    return (
        <div className="calendar-cell"
             data-day-in-month={day}
             onClick={handleClick}>
            <div className="calendar-number-day">{day}</div>
            <div className="calendar-day-works">
                {works && works.map((work, index) => {
                    return <Work key={index}
                                workId={work.workId}
                                operatorName={work.operatorName}
                                operatorSurname={work.operatorSurname}
                                customer={work.customer}
                                customerId={work.customerId}
                                description={work.description}
                                ticketDescription={work.ticketDescription}
                                creationDate={work.creationDate}
                                endDate={work.endDate}/>
                    })}
            </div>
            
        </div>

    )
}

export default CalendarDay;