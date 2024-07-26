import "./Admin.css"

import { useState, useEffect, useMemo, useCallback, StrictMode, useRef } from "react";
import { CustomInput } from "../../components/Custominput";
//import { inputValidator } from "../../utils/validators";
import { useSelector } from "react-redux";
import { getUserData } from "../userSlice";
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { bringAllAppointments, bringAllUsersCall, editAppointmentCall } from "../../services/apiCalls";
import { getAppointment } from "../appointmentSlice";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const Admin = () => {

    const userData = useSelector(getUserData)
    const appointmentsData = useSelector(getAppointment)
    const myPassport = JSON.parse(sessionStorage.getItem("passport"))


    const [adminData, setAdminData] = useState([])
    console.log(adminData, "esto es profileData ");
    const [adminDataAppointments, setAdminDataAppointments] = useState([

    ])
    console.log(adminData, "esto es profileData ");

    const [userBackUp, setUserBackUp] = useState([])

    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState([]);
    console.log(rowData, "DATOS DE ROW");
    const [columnDefs, setColumnDefs] = useState([
        { field: "id" },
        { field: "title" },
        { field: "user_id" },
        { field: "artist_id" },
        { field: "start_time" },
        { field: "end_time" },
        { field: "location" }

    ]);
    console.log(columnDefs, "datos de columnas")

    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            cellDataType: false,
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myData = await bringAllAppointments(userData.token);
                setRowData(myData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(rowData, "aqui esta  appointment data de la otra tabla diferente");
    }, [rowData])

    const onCellValueChanged = useCallback(async (event) => {
        try {
            // Ajusta la URL de la API y los datos según sea necesario
            const updatedData = event.data;
            const response = await axios.put(`http://localhost:3000/api/appointments/${updatedData.id}`, updatedData);

            console.log("Data updated successfully:", response.userData);
        } catch (error) {
            console.error("Error updating data:", error);
        }
    }, []);

    useEffect(() => {
        console.log(adminDataAppointments, "aqui esta  appointment data bringprofile ");
    }, [adminDataAppointments]);




    const editAppointment = async () => {
        try {
            await editAppointmentCall(
                appointmentsData,
                userData.token,
                rowData.id
            );
            console.log("Cita editada");
            setShow(false);
        } catch (error) {
            console.log("Error editando cita:" + error);
        }
    };
    // filtro de busqueda

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);











    function inputHandler(e) {
        setAdminData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

    }
    // bring all users
    useEffect(() => {
        const fetchProfile = async () => {
            const myProfileData = await bringAllUsersCall(userData.token);
            console.log(myProfileData, "seteando prifiledata");
            setAdminData(myProfileData.data)
            setUserBackUp(myProfileData.data)

        }
        fetchProfile()


    }, []);
    useEffect(() => {
        console.log(adminData, "aqui esta  profile data bringprofile ");
    }, [adminData])

    // bring all appointments
    useEffect(() => {
        const fetchAppointment = async () => {
            const myData = await bringAllAppointments(userData.token);
            console.log(myData, "seteando Appointmentsdata");
            setAdminDataAppointments(myData.data)


        }
        fetchAppointment()


    }, []);

    useEffect(() => {
        console.log(adminDataAppointments, "aqui esta  appointment data bringprofile ");
    }, [adminDataAppointments])





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

        },

    ]


    return (
        <>



            <div >
                <h1>Usuarios</h1>
                <DataTable
                    columns={columns}
                    data={adminData}
                    selectableRows
                    pagination
                    paginationPerPage={5}

                    onSelectedRowsChange={data => console.log(data)}
                />
            </div>



            <h1>CITAS</h1>
            <div style={containerStyle}>
                <div className="example-wrapper">
                    <div className="example-header">

                        <input
                            type="text"
                            id="filter-text-box"
                            placeholder="Search..."
                            onInput={onFilterTextBoxChanged}
                        />


                    </div>




                    <div
                        style={gridStyle}
                        className="ag-theme-quartz-dark"
                    >
                        <AgGridReact

                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            /*editAppointment={editAppointment}*/
                            onCellValueChanged={onCellValueChanged}
                        />
                    </div>
                </div>
            </div>



        </>

    );
};