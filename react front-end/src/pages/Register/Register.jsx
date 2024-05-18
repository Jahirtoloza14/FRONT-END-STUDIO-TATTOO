import { CustomInput } from "../../components/Custominput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import "./Register.css"
import { inputValidator } from "../../utils/validators";
import { useState, useEffect } from "react";
import { registerNewUserCall } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../userSlice";




export const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState({

        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role_name: ""
    });
    const [msg, setMsg] = useState("")

    const inputHandler = (e) => {
        //genero la funcion que bindea

        setCredentials(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));

    };


    const RegisterMe = async () => {
        if (inputValidator(credentials.first_name, "first_name") && inputValidator(credentials.password, "password")) {
            const answer = await registerNewUserCall(credentials);


            setMsg(answer.data.message)
            console.log(answer);


            if (answer.data.success) {
                dispatch(login(token));
                setTimeout(() => {
                    navigate("/login");
                }, 2000)
            }
        }
        else {
            console.log("credenciales incorrectas, hay algun campo no esta bien intrducido");
        };



}

        /* esta sera la funcion que desencadenara register
        const answer = await registerNewUserCall(credentials);
        console.log(answer)
        
        if (answer?.data.token) {
            // decodificamos el token
            const uDecodificado = decodeToken(answer.data.token);
        
            const passport = {
                token: answer.data.token,
                decodificado: uDecodificado
        
            }
            console.log(passport)
        
            setMsg(`${uDecodificado.name}, bienvenid@ de nuevo`)
        
            setTimeout(() => {
                navigate("/")
            }, 3000)
        }*/



        return (
            <div className="register-container registerElementsDesign">
                {msg === "" ?
                    <>
                        <CustomInput
                            typeProp={"text"}
                            nameProp={"first_name"}
                            handlerProp={(e) => inputHandler(e)}
                            placeholderProp={"escribe tu primer nombre"}
                        />
                        <CustomInput
                            typeProp={"text"}
                            nameProp={"last_name"}
                            handlerProp={(e) => inputHandler(e)}
                            placeholderProp={"escribe tu apellido "}
                        />
                        <CustomInput
                            typeProp={"email"}
                            nameProp={"email"}
                            handlerProp={(e) => inputHandler(e)}
                            placeholderProp={"escribe tu e-mail"}
                        />

                        <CustomInput
                            typeProp={"password"}
                            nameProp={"password"}
                            handlerProp={(e) => inputHandler(e)}
                            placeholderProp={"escribe el password"}
                        />
                     

                        <ButtonC
                            title={"Register me"}
                            className={"regularButtonClass"}
                            functionEmit={RegisterMe}
                        />
                    </> : <div>{msg}</div>}
                {/*<pre>{JSON.stringify(credentials,null,2)}</pre>*/}


            </div>
        )
    
};