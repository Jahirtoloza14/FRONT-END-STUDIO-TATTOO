import "./Profile.css"
import { bringProfile, updateProfile } from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { CustomInput } from "../../components/Custominput";
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
        role: ""

    });

    const [profileData, setProfileData,] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role: ""


    })
    console.log(profileData, "esto es profileData ");


    const inputHandler = (e) => {
        setProfileData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

    }

    useEffect(() => {
        const fetchProfile = async () => {
            const myProfileData = await bringProfile(userData.token);
            setProfileData(myProfileData.data)

        }
        fetchProfile()


    }, []);

    useEffect(() => {
       
    }, [profileData])
        ;

    return (
        <>

            <CustomInput
                type="text"
                name="id"
                placeholder="ID"
                value={profileData.id}
                handler={inputHandler}
                disabled={!isEditing}
            />
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
                value={profileData.last_name}
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



        </>
    );
};
export default Profile;