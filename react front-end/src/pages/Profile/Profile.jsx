import "./Profile.css"
import { bringProfile, updateProfile } from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { CustomInput } from "../../components/Custominput";
//import { inputValidator } from "../../utils/validators";
import { useSelector } from "react-redux";
import  {getUserData}  from "../userSlice";
import { useNavigate } from 'react-router-dom';


export const Profile = () => {    
       
    const myPassport = JSON.parse(sessionStorage.getItem("passport"))
    const [userBackUp, setUserBackUp] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role_name: ""

    });
   
    const [profileData, setProfileData,] = useState({
       
        first_name: "",
        last_name: "",
        email: "",
        role_name: ""

    })

    const navigate = useNavigate();
  
    const [errorMessage, setErrorMessage] = useState("")

    const [isEditing, setIsEditing] = useState(false)


    
   
    
   
   const userData = useSelector(getUserData)
    
   
    



    const inputHandler = (e) => {
        setProfileData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

    }



    useEffect(() => {
        setTimeout(() => {
            const fetchProfile = async () => {                
                   const myProfileData = await bringProfile(userData.token);                    
                   setProfileData(myProfileData.data)
                   setUserBackUp(myProfileData.data);
                                              
           }
           fetchProfile()
             
       }, 1000);
        
    },[]);

    useEffect(() => {
        console.log(profileData, "bringprofile");
    }, [profileData])
        ;

   const updateProfileHandler = () => {
    /*    if (!inputValidator(profileData.first_name, "fist_name") || !inputValidator(profileData.email, "email")) {
            console.log("nombre o email no validos")
            setErrorMessage("no se pueden actualizar los datos")
            return;
        }}*/
        try {
            updateProfile(profileData, token)
        } catch (error) {
            console.log(error);
        }
    ;
    } 

    return (
        <>
        

       
            
                           
            <CustomInput
                typeProp={"text"}
                nameProp={"first name"}
                handlerProp={inputHandler}
                placeholderProp={"first name"}
                value={profileData.first_name}
                isDisable={!isEditing}

            />
            <CustomInput
                typeProp={"text"}
                nameProp={"last name"}
                placeholderProp={"last name"}
                value={profileData.last_name}
                handlerProp={inputHandler} 
                isDisable={!isEditing}
            />
            <CustomInput
                typeProp={"email"}
                nameProp={"email"}
                handlerProp={inputHandler}
                placeholderProp={"email"}
                value={profileData.email}
                isDisable={!isEditing}

            />
            <CustomInput
                typeProp={"text"}
                nameProp={"role name"}
                handlerProp={inputHandler}
                placeholderProp={"role"}
                value={profileData.role_name}
                isDisable={!isEditing}

            />


           

        

            

            {isEditing ? (
                <div className="button-container">
                    <button onClick={() => updateProfileHandler(false)} >Guardar</button>
                    <button onClick={() => setErrorMessage(false)}>Cancelar</button>
                </div>
            ) : (
                <button onClick={() => setIsEditing(true)}>Modificar</button>
            )}

        </>
    );
};
export default Profile;