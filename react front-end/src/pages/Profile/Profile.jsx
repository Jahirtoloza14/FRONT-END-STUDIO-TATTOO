import "./Profile.css"
import { bringProfile, updateProfile } from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { CustomInput } from "../../components/Custominput";
//import { inputValidator } from "../../utils/validators";
import { useSelector } from "react-redux";
import { getUserData } from "../userSlice";
import { useNavigate } from 'react-router-dom';


export const Profile = () => {    
    const navigate = useNavigate();
    const userData = useSelector(getUserData)
    
    const myPassport = JSON.parse(sessionStorage.getItem("passport"))
    
    
    const [errorMessage, setErrorMessage] = useState("")
    const [isEditing, setIsEditing] = useState(false)
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
    console.log(profileData, "esto es profileData ");


    const inputHandler = (e) => {
        setProfileData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

    }

    useEffect(() => {
            const fetchProfile = async() => {
            const myProfileData = await bringProfile(userData.token);
            console.log(myProfileData, "seteando prifiledata");
            setProfileData(myProfileData.data)
            
        }
        fetchProfile()


    }, []);

    useEffect(() => {
        console.log(profileData, "aqui esta  profile data bringprofile ");
    }, [profileData])
    ;
     

    

    const updateProfileHandler = () => {
       
         try {     
           /*
        if (!inputValidator(profileData.first_name, "fist_name") || !inputValidator(profileData.email, "email")) {
                console.log("nombre o email no validos")
                setErrorMessage("no se pueden actualizar los datos")
                return;
            }*/
            
         updateProfile(profileData, token)
            
        } catch (error) {
            console.log(error);
        }
    }


    
   
    return (
        <>
            <CustomInput
                type="text"
                name="first_name"  
                placeholder="First name"  
                value={profileData.first_name}
                handler={inputHandler}
                disabled={!isEditing}
            />
            <CustomInput
                type="text"
                name="last_name"
                placeholder="last name"
                value= {profileData.last_name}
                handler={inputHandler}                
                disabled={!isEditing}


            />
            <CustomInput
                type="email"
                name="email"
                placeholder="email"   
                value={profileData.email}
                handler={inputHandler}
                disabled={!isEditing}



            />
            <CustomInput
                type="text"
                name="role_name"    
                placeholder="role"
                value={profileData.role_name}
                handler={inputHandler}
                disabled={"disabled"}


            />

            {isEditing ? (
                <div className="button-container">
                    <button onClick={() => updateProfileHandler(true)} >Guardar</button>
                    <button onClick={() => setErrorMessage(false)}>Cancelar</button>
                </div>
            ) : (
                <button onClick={() => setIsEditing(true)}>Modificar</button>
            )}

        </>
    );
}; 
export default Profile;