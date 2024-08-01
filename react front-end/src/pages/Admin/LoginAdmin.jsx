import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/Custominput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import "./LoginAdmin.css"
import { useState, useEffect } from "react"
import { loginCall } from "../../services/apiCalls";
import { decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";

export const LoginAdmin = () => {
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const [msg, setMsg] = useState("")
    const dispatch = useDispatch()


    const inputHandler = (e) => {
        //genero la funcion que bindea

        setCredentials(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            })
        )
    }

    const loginMe = async () => {
        // esta sera la funcion que desencadenara el login

        const anwser = await loginCall(credentials)

        if (anwser.data.token) {
            // decodificamos el token
            const uDecodificado = decodeToken(anwser.data.token);
            const passport = {
                token: anwser.data.token,
                decodificado: uDecodificado

            }
            dispatch(login(passport))


            // guardariamos passport
            sessionStorage.setItem("passport", JSON.stringify(passport))
            setMsg(`${uDecodificado.name}, bienvenid@ de nuevo`)

            setTimeout(() => {
                navigate("/admin", { state: passport })
            }, 9000)
        }



    }


    return (
        <div className="login-container loginElementDesign">
            {msg === "" ? <>

                <CustomInput
                    typeP={"email"}
                    name={"email"}
                    handler={(e) => inputHandler(e)}
                    placeholder={"escribe tu e-mail"}
                />

                <CustomInput
                    type={"password"}
                    name={"password"}
                    handler={(e) => inputHandler(e)}
                    placeholder={"escribe el password"}
                />
                <ButtonC
                    title={"log me"}
                    className={"regularButtonClass"}
                    functionEmit={loginMe}
                />
            </>
                : <div>{msg}</div>}

        </div>
    )
}