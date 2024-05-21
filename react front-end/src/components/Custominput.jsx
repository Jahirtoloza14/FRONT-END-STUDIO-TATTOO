import React from "react"
import "./Custominput.css"


export const CustomInput= ({
    typeProp, 
    nameProp, 
    placeholderProp, 
    handlerProp,
    valueProp,
    isDisable
})=>{  // props, properties, propiedades, se reciben como un objeto
    return (
        <input 
        className="customInputDesign"
        type={typeProp} 
        name={nameProp}
        placeholder={placeholderProp}
        value={valueProp}
        disabled={isDisable}
        onChange= {(e)=> handlerProp(e)}
        />
       
    );
};
export default CustomInput;
// <custominput type="email" name="emailinput" placeholder="introduce tu email..."/>