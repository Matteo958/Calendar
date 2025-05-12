import React from "react";
import "../styles/CalendarDay.css";
import Work from "./Work.component";

const CalendarDay = props => {

    const {
        day,
        works,
    } = props;

    console.log(works)

    return (
        <div className="calendar-cell"
             data-day-in-month={day}>
            <div className="calendar-number-day">{day}</div>
            <div className="calendar-day-works">
                {works && works.map((work, index) => {
                    return <Work key={index}
                                workId={work.workId}
                                operatorName={work.operatorName}
                                operatorSurname={work.operatorSurname}
                                customer={work.customer}/>
                    })}
            </div>
            
        </div>

    )
}

export default CalendarDay;