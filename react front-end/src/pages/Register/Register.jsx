import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/Custominput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import "./Register.css"
import { useState, useEffect } from "react"
import { registerNewUserCall } from "../../services/apiCalls";
import { decodeToken } from "react-jwt";
import { inputValidator } from "../../utils/validators";


export const Register = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: ""
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
        if (inputValidator(credentials.first_name, "first_name") && inputValidator(credentials.password, "password")){

            const answer = await registerNewUserCall(credentials);

          setMsg(answer.data.message);


        if (answer.data.success) {
            setTimeout(() => {
                navigate("/")
            }, 2000);
        }
    }
     else {
            console.log("credenciales incorrectas, algun campo no esta bien introducido ");
        }
};




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
    <div className="login-container RegisterElementDesign">
        {msg === "" ? <>
            <CustomInput
                typeProp={"text"}
                nameProp={"first name"}
                handlerProp={(e) => inputHandler(e)}
                placeholderProp={"escribe tu primer nombre"}
            />
            <CustomInput
                typeProp={"text"}
                nameProp={"last name"}
                handlerProp={(e) => inputHandler(e)}
                placeholderProp={"escribe tu apellido nombre"}
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
}