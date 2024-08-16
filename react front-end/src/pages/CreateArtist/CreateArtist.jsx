import { CustomInput } from "../../components/Custominput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import "./CreateArtist.css"
import { useState } from "react";
import { registerNewArtistCall } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";




export const RegisterArtist = () => {

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
        const answer = await registerNewArtistCall(credentials);
        setMsg(answer.data.message)


        if (answer.data.success) {
            dispatch(login(token));
            setTimeout(() => {
                navigate("/login");
            }, 1000)
        }


    }

    
    return (
        <div className="register-container registerElementsDesign">
            <h1>REGISTRATE COMO ARTISTA</h1>
            {msg === "" ?
                <>
                    <CustomInput
                        type={"text"}
                        name={"first_name"}
                        handler={(e) => inputHandler(e)}
                        placeholder={"escribe tu primer nombre"}
                    />
                    <CustomInput
                        type={"text"}
                        name={"last_name"}
                        handler={(e) => inputHandler(e)}
                        placeholder={"escribe tu apellido "}
                    />
                    <CustomInput
                        type={"email"}
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
                        title={"Register"}
                        className={"regularButtonClass"}
                        functionEmit={RegisterMe}
                    />
                </> : <div>{msg}</div>}
          
        </div>
    )

};