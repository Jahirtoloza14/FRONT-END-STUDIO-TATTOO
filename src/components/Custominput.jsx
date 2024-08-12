import React from "react"
import "./Custominput.css"


export const CustomInput = ({
    type,
    name,
    placeholder,
    handler,
    value,
    disabled
}) => {  // props, properties, propiedades, se reciben como un objeto
    return (
        <input
            className="customInputDesign"
            type={type}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => handler(e)}
            value={value}
        />

    );
};
export default CustomInput;
