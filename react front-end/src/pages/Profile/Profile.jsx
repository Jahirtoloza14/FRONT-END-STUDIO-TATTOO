import "./Profile.css"
import { bringClientAppointment, bringProfile } from "../../services/apiCalls";
import { useEffect, useState, useMemo, useRef } from "react";
import { CustomInput } from "../../components/Custominput";
import { useSelector } from "react-redux";
import { getUserData } from "../userSlice";
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";


ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const Profile = () => {
    const navigate = useNavigate();
    const userData = useSelector(getUserData)

    const myPassport = JSON.parse(sessionStorage.getItem("passport"))


    const [errorMessage, setErrorMessage] = useState("")
    

    const [profileData, setProfileData,] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role: ""


    })

    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        { field: "id" },
        { field: "title" },
        { field: "user_id" },
        { field: "artist_id" },
        { field: "start_time" },
        { field: "end_time" },
        { field: "location" }

    ]);



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
        const fetchAppointment = async () => {

            const myAppointmentData = await bringClientAppointment(userData.token);
            setRowData(myAppointmentData.data)



        }
        fetchAppointment()


    }, []);

    console.log(rowData, "cita de usuario")

    return (
        <>
            <div><h1>BIENVENIDO : </h1></div>
            <h2>Perfil</h2>
            <div>ID:<CustomInput
                type="text"
                name="id"

                placeholder="ID"
                value={profileData.id}
                handler={inputHandler}
                disabled={true}
            /></div>
            <div>Nombre:<CustomInput
                type="text"
                name="first_name"
                placeholder="First name"
                value={profileData.first_name}
                handler={inputHandler}
                disabled={true}
            /></div>
            <div>Apellido
                <CustomInput
                    type="text"
                    name="last_name"
                    placeholder="last name"
                    value={profileData.last_name}
                    handler={inputHandler}
                    disabled={true}


                /></div>
            <div>Email:<CustomInput
                type="email"
                name="email"
                placeholder="email"
                value={profileData.email}
                handler={inputHandler}
                disabled={true}
            /></div>

            <h2>Cita</h2>
            <div style={containerStyle}>
                <div className="example-wrapper">
                    


                    <div
                        style={gridStyle}
                        className="ag-theme-quartz-dark"
                    >
                        <AgGridReact

                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            

                           
                        />
                    </div>
                </div>
            </div>

            


                   
        </>
    );
};
export default Profile;