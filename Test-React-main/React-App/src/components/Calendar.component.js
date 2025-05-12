import React, { useCallback, useState, useEffect, useContext } from "react";
import CalendarDay from "./CalendarDay.component";
import Button from "./Button.component";
import "../styles/Calendar.css";
import { DataContext } from "./DataContext";
import Select from "./Select.component";

const Calendar = props => {

    const months = [ "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", 
           "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre" ];

    const {

    } = props;

    const {getData} = useContext(DataContext);
    const [works, setWorks] = useState([]);
    const [operators, setOperators] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [tickets, setTickets] = useState([]);

    const [selectedOperator, setSelectedOperator] = useState();
    const [selectedCustomer, setSelectedCustomer] = useState();

    const [currentDate, setCurrentDate] = useState({
            currentDay: new Date().getDate(),
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
        });

    const handleCurrentDate = useCallback((movement) => {
        if (movement == -1) {
            switch (currentDate.currentMonth) {
                case 0:
                    setCurrentDate(prevDate => ({...prevDate, 
                                    currentMonth: 11,
                                    currentYear: prevDate.currentYear - 1,
                    }))
                    break;
                default:
                    setCurrentDate(prevDate => ({...prevDate,
                                    currentMonth: prevDate.currentMonth - 1,
                    }))
                    break
            }
        } else {
            switch (currentDate.currentMonth) {
                case 11:
                    setCurrentDate(prevDate => ({...prevDate, 
                                    currentMonth: 0,
                                    currentYear: prevDate.currentYear + 1,
                    }))
                    break;
                default:
                    setCurrentDate(prevDate => ({...prevDate,
                                    currentMonth: prevDate.currentMonth + 1,
                    }))
                    break
            }
        }

        
    }, [currentDate])

    const getFirstDayInMonth = useCallback(() => {
        return new Date(currentDate.currentYear, currentDate.currentMonth, 1).getDay();
    }, [currentDate])

    const getDaysInMonth = useCallback(() => {
        return new Date(currentDate.currentYear, currentDate.currentMonth + 1, 0).getDate();
    }, [currentDate])

    const handleWorks = useCallback((works) => {
        let worksByMonth = [];
        works.forEach(element => {
            if (new Date(element.creationDate).getMonth() == currentDate.currentMonth &&
                new Date(element.creationDate).getFullYear() == currentDate.currentYear) {
                worksByMonth.push({
                    id: element.id,
                    day: new Date(element.creationDate).getDate(),
                    month: new Date(element.creationDate).getMonth(),
                    description: element.description,
                    operator: element.operatorId,
                    ticket: element.ticketId,
                });
            }
        });
        return worksByMonth;
    })

    const filterWorksByDay = useCallback((works, day) => {
        return works
            .filter(work => work.day == day && 
                    (!selectedOperator || work.operator == selectedOperator) && 
                    (!selectedCustomer || customers.find(customer => customer.id == tickets.find(ticket => ticket.id == work.ticket).customerId).id == selectedCustomer))
            .map(work => {
                const operator = operators.find(operator => operator.id == work.operator);
                const ticket = tickets.find(ticket => ticket.id == work.ticket);
                const customer = ticket ? customers.find(customer => customer.id == ticket.customerId) : null;
                return {
                    workId: work?.id,
                    operatorName: operator?.name,
                    operatorSurname: operator?.surname,
                    customerId: customer?.id,
                    customer: customer?.name
                };
            });
    }, [operators, customers, tickets, selectedOperator, selectedCustomer]);

    const selectOperator = useCallback((value) => {
        setSelectedOperator(value);
    }, []);

    const selectCustomer = useCallback((value) => {
        setSelectedCustomer(value);
    }, []);

    useEffect(
        () => {
            getData('/works').then(
                result => setWorks(handleWorks(result))
            );

        }, [currentDate]
    )

    useEffect(
        () => {
            getData('/operators').then(
                result => setOperators(result)
            );
            getData('/customers').then(
                result => setCustomers(result)
            );
            getData('/tickets').then(
                result => setTickets(result)
            );

        }, []
    )

    return (
        <div className="calendar-container">
            <div className="calendar-date-filters">
                <div className="calendar-date">{months[currentDate.currentMonth]} - {currentDate.currentYear}</div>
                <div className="calendar-filters">
                    <Select name="operators-select" 
                            label="Seleziona un operatore: " 
                            defaultValue="--Tutti gli operatori--" 
                            dataOptions={operators}
                            selectedOperator={selectedOperator}
                            onChangeValue={selectOperator}/>
                    <Select name="customers-select" 
                            label="Seleziona un cliente: " 
                            defaultValue="--Tutti i clienti--" 
                            dataOptions={customers}
                            onChangeValue={selectCustomer}/>
                </div>
            </div>
            
            <div className="calendar-header">
            <Button label={"<"} handleClick={() => handleCurrentDate(-1)}/>
                <div className="calendar-header-weekdays">
                    <div className="calendar-header-day">DOM</div>
                    <div className="calendar-header-day">LUN</div>
                    <div className="calendar-header-day">MAR</div>
                    <div className="calendar-header-day">MER</div>
                    <div className="calendar-header-day">GIO</div>
                    <div className="calendar-header-day">VEN</div>
                    <div className="calendar-header-day">SAB</div>
                </div>
                
            <Button label={">"} handleClick={() => handleCurrentDate(1)}/>
            </div>
            <div className="calendar">
                {[...Array(getDaysInMonth() + getFirstDayInMonth())].map((_, index) => {
                    if (index < getFirstDayInMonth()) {
                        return <CalendarDay key={index} day={""}/>
                    } else {
                        
                        return <CalendarDay key={index} day={index - (getFirstDayInMonth() - 1)} works={filterWorksByDay(works, index - (getFirstDayInMonth() - 1))}/>
                    }
                })}
            </div>
        </div>
        
    )
}

export default Calendar;