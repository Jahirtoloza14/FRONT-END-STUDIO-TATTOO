import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import { CustomInput } from "../../components/Custominput";
import { bringProfile } from "../../services/apiCalls";

export const Home = () => {
    const [count, setCount] = useState(0);
    const [inputData, setInputData] = useState("");
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    
    const inputHandler = (event) => {
        setCredentials((prevState)=>({
           ...prevState, 
           [event.target.name]: event.target.value
        }));
    };
    
    //useEffects
    useEffect(()=>{}, [count]);

    useEffect(()=>{
    console.log(credentials, "yo soy tus credenciales");
    },[credentials]);

    return (
        <>
       <h1>Soy home</h1>
       <h1>Vite + React</h1>
       <h2>Este es el subtiitulo</h2>
       <div className="card">
        <button>Birng my profile</button>
        <h3>LOGIN</h3>
        <CustomInput
        typeProp="email"
        nameProp="email"
        placeholderProp="introduce tu email"
        handlerProp={inputHandler}
        />
       
        <CustomInput
        typeProp="password"
        nameProp="password"
        placeholderProp=""
        handlerProp={inputHandler}
        />
            <p>
                Edit <code>src/App.jsx</code> and save to test HMR
            </p>
       </div>

       </>
    )
}