import { useEffect, useState } from "react"
import "./Admin.css"
import { bringProfiles } from "../../services/apiCalls"



export const Admin =() => {
    const [adminData, setAdminData,] = useState({
        id:"",
        first_name: "",
        last_name: "",
        email: "",
        role_name: ""

    })

    const myPassport = JSON.parse(sessionStorage.getItem("passport"))
    const token =myPassport.token


    const inputHandler = (e) => {
        setAdminData((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    useEffect(()=> {
        const fetchAdmin= async ()=> {
            const myAdminData= await bringProfiles(token) 
            setAdminData(myAdminData)
        }
        fetchAdmin()
    }, [])
    useEffect(() => {
        console.log(adminData, "bringprofiles");
    }, [adminData])
        ;


    const FilterTable = ({adminData}) => {

        const [filterText, setFilterText] = useState('');


        return (
            <div>
                <SearchBar 
                filterText = {filterText}
                onFilterTextChange={setFilterText}
                />
                <ProfilesTable 
                 adminData= {adminData}
                filterText={filterText}
                
                />
            </div>

        )

    }
    const IdRow =({id})=> {
        return (
            <tr>
                <th colSpan="2">
                    {id}
                </th>
            </tr>
        )

    }
    const FirstNameRow =({first_name})=> {
        return (
            <tr>
                <th colSpan="2">
                    {first_name}
                </th>
            </tr>
        )

    }
    const LastNameRow =({last_name})=> {
        return (
            <tr>
                <th colSpan="2">
                    {last_name_name}
                </th>
            </tr>
        )

    }
    const RolesRow =({role_name})=> {
        return (
            <tr>
                <th colSpan="2">
                    {role_name}
                </th>
            </tr>
        )

    }
    const UserTable = ({ users, isAdmin }) => {
        if (!isAdmin) {
          return <div>No tienes permiso para ver esta información.</div>;
        }
      
        return (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <React.Fragment key={user.id}>
                  <IdRow id={user.id} />
                  <FirstNameRow first_name={user.first_name} />
                  <LastNameRow last_name={user.last_name} />
                  <RolesRow role_name={user.role_name} />
                </React.Fragment>
              ))}
            </tbody>
          </table>
        );
      };

    const SearchBar =() =>({
        filterText,
        onFilterTextChange
    })
        return (
            <form>
            <input 
            type="text"
            value={filterText} placeholder="Buscar..."
            onChange={(e)=>onFilterTextChange(e.target.value)}/>
            </form>
        )
    

}