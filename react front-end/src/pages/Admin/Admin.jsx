import { useEffect, useState } from "react"
import "./Admin.css"
import { bringProfiles } from "../../services/apiCalls"
import { getUserData } from "../userSlice";
import { useSelector } from "react-redux";
import DataTable from 'react-data-table-component';

export const Admin =() => {

    const userData = useSelector(getUserData)
    const [userBackUp, setUserBackUp] = useState({})
    const [adminData, setAdminData,] = useState({
        user_id:"",
        first_name: "",
        last_name: "",
        email: "",
        role_name: ""

    })

    const myPassport = JSON.parse(sessionStorage.getItem("passport"))
    //const token =myPassport.token


    const inputHandler = (e) => {
        setAdminData((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    useEffect(()=> {
        const fetchAdmin= async ()=> {
            const myAdminData= await bringProfiles(userData.token) 
            setAdminData(myAdminData.data)
            setUserBackUp(myAdminData.data)
        }
        fetchAdmin()
    }, [])
    useEffect(() => {
        console.log(adminData, "bringprofiles");
    }, [adminData])
        ;


    
   const columns = [
    {
        name: "User id",
        selector: row => row.adminData.user_id
    },
    {
        name: "First Name",
        selector: row => row.adminData.first_name,
        sortable: true
    },
    {
        name: "Last Name",
        selector: row => row.adminData.last_name
    },
    {
       name: "Email",
       selector: row => row.adminData.email
      
    },
    {
        name: "Role Name",
        selector: row => row.adminData.role_name
    }
]
        return (
            <>
            <DataTable
            columns={columns}
            data={adminData}
            selectableRows
            pagination
            paginationPerPage={5}
            onSelectedRowsChange={data=> console.log(data)}
            
            
            />
            </>
        )
}