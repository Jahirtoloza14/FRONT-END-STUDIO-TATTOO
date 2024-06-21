import "./Admin.css"

import { useEffect, useState } from "react";
import { CustomInput } from "../../components/Custominput";
//import { inputValidator } from "../../utils/validators";
import { useSelector } from "react-redux";
import { getUserData } from "../userSlice";
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { bringAllAppointments, bringAllUsersCall } from "../../services/apiCalls";
import { getAppointment } from "../appointmentSlice";
export const Admin = () => {    

    const userData = useSelector(getUserData)
    const appointmentsData = useSelector(getAppointment)
    const myPassport = JSON.parse(sessionStorage.getItem("passport"))
    
    
    const [adminData, setAdminData] = useState([])
    console.log(adminData, "esto es profileData ");
    const [adminDataAppointments, setAdminDataAppointments] = useState([])
    console.log(adminData, "esto es profileData ");
    
    const [userBackUp, setUserBackUp] = useState([])

    
    


    const inputHandler = (e) => {
        setAdminData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

    }
    // bring all users
    useEffect(() => {
            const fetchProfile = async() => {
            const myProfileData = await bringAllUsersCall(userData.token);
            console.log(myProfileData, "seteando prifiledata");
            setAdminData(myProfileData.data)
            setUserBackUp(myProfileData.data)
            
        }
        fetchProfile()


    }, []);
// bring all appointments
    useEffect(() => {
        const fetchProfile = async() => {
        const myProfileData = await bringAllAppointments(appointmentsData.token);
        console.log(myProfileData, "seteando Appointmentsdata");
        setAdminDataAppointments(myProfileData.data)
        setUserBackUp(myProfileData)
        
    }
    fetchProfile()


}, []);



    useEffect(() => {
        console.log(adminData, "aqui esta  profile data bringprofile ");
    }, [adminData])
    

    
    const columns = [
        {
            name: "ID",
            selector: row => row.id
        },
        {
            name: "First Name",
            selector: row => row.first_name
        },
        {
            name: "Last Name",
            selector: row => row.last_name
        },
        {
            name: "Email",
            selector: row => row.email
        },
        {
            name: "Role Name",
            selector: row => row.role_name
        }
    ]

    const columnsAppointments = [

        {

            name: "tittle",
            selector: row => row.tittle

        },
        {

            name: "user_id",
            selector: row => row.user_id

        },
        {

            name: "artist_id",
            selector: row => row.artist_id

        },
        {

            name: "start_time",
            selector: row => row.start_time

        },
        {

            name: "end_time",
            selector: row => row.end_time

        },
        {

            name: "location",
            selector: row => row.location

        }
    ]
        return (
        
            <div >
            
            <DataTable
            columns={columns}
            data={adminData}
             selectableRows
             pagination
             paginationPerPage={5}
             onSelectedRowsChange={data=> console.log(data)}
            />
            </div>,

<div >
            
<DataTable
columns={columnsAppointments}
data={adminDataAppointments}
 selectableRows
 pagination
 paginationPerPage={5}
 onSelectedRowsChange={data=> console.log(data)}
/>
</div>
        
        );
};