import React, { useCallback} from "react";
import { DataContext } from "./DataContext";

const Select = props => {

    const {
        name,
        label,
        defaultValue,
        dataOptions,
        selected,
        onChangeValue,
        disabled
    } = props;

    const handleChange = useCallback((event) => {
        if (onChangeValue) {
             onChangeValue(event.target.value);
        } 
       
    }, [])

    return (
        <div className="calendar-filters-select">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} value={selected} onChange={handleChange} disabled={disabled}>
                <option value=''>{defaultValue}</option>
                {dataOptions && dataOptions.map((option, index) => {
                    return <option key={index} value={option.id}>{option.name} {option.surname}</option>
                })}
            </select>
        </div>
        
    )
}

export default Select;