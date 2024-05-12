
import "./Custominput.css"
export const CustomInput= ({
    typeProp, 
    nameProp, 
    placeholderProp, 
    handlerProp,
    isDisable,
    value})=>{  // props, properties, propiedades, se reciben como un objeto
    return(
        <input className="customInputDesign"
        trype={typeProp} 
        name={nameProp}
        placeholder={placeholderProp}
        value= {value}
        disable={isDisable}
        onChange= {(e)=> handlerProp(e)}
        
        >
        </input>
    )
}

// <custominput type="email" name="emailinput" placeholder="introduce tu email..."/>