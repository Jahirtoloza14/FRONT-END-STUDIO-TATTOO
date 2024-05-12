import "./Profile.css"
import { bringProfile } from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { CustomInput } from "../../components/Custominput";
import { inputValidator } from "../../utils/validators";




export const Profile = () => {
    const [profileData, setProfileData] = useState({
        name:"", 
        email:"",
        first_name:"", 
        last_name:""
    })
    const [errorMessage,setErrorMessage] = useState("")
    const [isEditing, setIsEditing] = useState(false)



    const myPassport = JSON.parse(sessionStorage.getItem("passport"))
    const token = myPassport.token
    console.log(token, "estoy viendo un token, verdad?");


    
   useEffect(()=>{
    const fetchProfile = async()=>{
        const myProfileData = await bringProfile(token)
        
        setProfileData(myProfileData)
    }
    fetchProfile()
   }, [])
        useEffect(()=> {
            console.log(profileData, "bringprofile");
        }, [profileData])
    ;
    const inputHandler = (e) => {
        setUpdateData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

    }
    const updateProfileHandler = () => {
        if(!inputValidator(profileData.first_name, "fist_name") || !inputValidator(profileData.email, "email")){
            console.log("nombre o email no validos")
            setErrorMessage("no se pueden actualizar los datos")
            return;
        }
        try {
            updateProfileData(profileData, token)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <CustomInput
                typeProp={"text"}
                nameProp={"first name"}
                handlerProp={(e) => inputHandler(e)}
                placeholderProp={"escribe tu primer nombre"}
                value={profileData.first_name}
                isDisable={!isEditing}
            />
            <CustomInput
                typeProp={"text"}
                nameProp={"last name"}
                handlerProp={(e) => inputHandler(e)}
                placeholderProp={"escribe tu apellido nombre"}
                value={profileData.last_name}
                isDisable={!isEditing}
            />
            <CustomInput
                typeProp={"email"}
                nameProp={"email"}
                handlerProp={(e) => inputHandler(e)}
                placeholderProp={"escribe tu e-mail"} 
                value={profileData.email}         
                isDisable={!isEditing}

            />
            { isEditing ?(
                <div className="button-container">
         <button onClick={() => updateProfileHandler(true)}>Guardar</button>
         <button onClick={() => setIsEditing(false)}>Cancelar</button>
         </div>
        ): ( 
         <button onClick={() => setIsEditing(true)}>Modificar</button>
         )}

        </>
    )
  }