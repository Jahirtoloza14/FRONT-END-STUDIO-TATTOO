import "./Admin.css"
import { bringProfiles, updateProfile } from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { CustomInput } from "../../components/Custominput";
//import { inputValidator } from "../../utils/validators";
import { useSelector } from "react-redux";
import { getUserData } from "../userSlice";
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";

export const Admin = () => {    

    const userData = useSelector(getUserData)
    
    const myPassport = JSON.parse(sessionStorage.getItem("passport"))
    
    

    const [userBackUp, setUserBackUp] = useState({
       
   

    });

    const [adminData, setAdminData,] = useState({
    
     

    })
    console.log(adminData, "esto es profileData ");


    const inputHandler = (e) => {
        setAdminData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

    }

    useEffect(() => {
            const fetchProfile = async() => {
            const myProfileData = await bringProfiles(userData.token);
            console.log(myProfileData, "seteando prifiledata");
            setAdminData(myProfileData.data)
            setUserBackUp(myProfileData.data)
        }
        fetchProfile()


    }, []);

    useEffect(() => {
        console.log(adminData, "aqui esta  profile data bringprofile ");
    }, [adminData])
    ;
    

    

    
    


    
   const columns = [
   
    {
        id: 'id',
        name: 'user ID',
        selector: row => row.id
    },
    {   
        id: "first_name",
        name: "First Name",
        selector: row => row.first_name,
    
    },
    {
        id: "last_name",
        name: "Last Name",
        selector: row => row.last_name
    },
    {
        id: "email",
       name: "Email",
       selector: row => row.email
      
    },
    {
        id: "role_name",
        name: "Role Name",
        selector: row => row.role_name
    }
];

        return (
            <div className="App">
            
            <DataTable
            columns={columns}
            data={[adminData]}
             keyField="id"
             selectableRows
             pagination
             paginationPerPage={5}
             onSelectedRowsChange={data=> console.log(data)}
            />
            </div>
           
        );
};