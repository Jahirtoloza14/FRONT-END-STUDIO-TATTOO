import "./Profile.css"
import { bringProfile } from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { CustomInput } from "../../components/Custominput";
import { inputValidator } from "../../utils/validators";
import { getLoggedAmount, getUserData, resetCount } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";



export const Profile = () => {

    const [profileData, setProfileData,] = useState({
       
        first_name: "",
        last_name: "",
        email: "",
        role_name: ""

    })

    const [profileBackup, setprofilebackup] = useState({
        
        first_name: "",
        last_name: "",
        email: "",
        role_name: ""

    })


  
    const [errorMessage, setErrorMessage] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    const myPassport = JSON.parse(sessionStorage.getItem("passport"))
    
    const dispatch = useDispatch()    

    
    const veces= useSelector(getLoggedAmount)
    //const myPassport = useSelector(getUserData)
    
    const token = myPassport.token
    



    const inputHandler = (e) => {
        setProfileData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

    }

    useEffect(() => {
        const fetchProfile = async () => {
            const myProfileData = await bringProfile(token)

            setProfileData(myProfileData)
        }
        fetchProfile()
    }, [])

    useEffect(() => {
        console.log(profileData, "bringprofile");
    }, [profileData])
        ;

    const updateProfileHandler = () => {
        if (!inputValidator(profileData.first_name, "fist_name") || !inputValidator(profileData.email, "email")) {
            console.log("nombre o email no validos")
            setErrorMessage("no se pueden actualizar los datos")
            return;
        }
        try {
            updateProfile(profileData, token)
        } catch (error) {
            console.log(error);
        }
    };
    const resetLoggedCount = () =>{
    
        console.log(veces);
        
    }

    return (
        <>
            <CustomInput
                typeProp="text"
                nameProp="first name"
                handlerProp={inputHandler}
                placeholderProp="first name"
                value={profileData.first_name}
                isDisable={!isEditing}

            />
            <CustomInput
                typeProp="text"
                nameProp="last name" 
                placeholderProp="last name"
                value={profileData.last_name}
                isDisable={!isEditing}
                handlerProp={inputHandler}
            />
            <CustomInput
                typeProp="email"
                nameProp="email"
                handlerProp={inputHandler}
                placeholderProp="email"
                value={profileData.email}
                isDisable={!isEditing}

            />
            <CustomInput
                typeProp="text"
                nameProp="role name"
                handlerProp={inputHandler}
                placeholderProp="role"
                value={profileData.role_name}
                isDisable={!isEditing}

            />
            {isEditing ? (
                <div className="button-container">
                    <button onClick={() => updateProfileHandler()}>Guardar</button>
                    <button onClick={() => setIsEditing(flase)}>Cancelar</button>
                </div>
            ) : (
                <button onClick={() => resetLoggedCount()}>Modificar</button>
            )}

        </>
    );
};