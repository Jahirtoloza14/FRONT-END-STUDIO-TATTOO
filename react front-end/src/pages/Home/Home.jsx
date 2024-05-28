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
       <div>
        <h1>Studio tattoo</h1>
       <h2>Bienvenidos</h2>
       </div>
       
    
        
        
      
           
       

       </>
    )
}