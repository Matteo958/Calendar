import React, { useCallback } from "react";

const Button = props => {

    const {
        label,
        direction,
        handleClick,
    } = props;


    return (
        <button onClick={handleClick}>
            {label}
        </button>
    )
}

export default Button;