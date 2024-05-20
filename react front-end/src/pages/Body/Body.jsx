import { Navigate,Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import  {Register}  from "../Register/Register";
import {Home} from "../Home/Home";
import React from 'react';
import { Profile } from "../Profile/Profile";
import { Admin } from "../Admin/Admin";


export const Body =()=>{
return (
    <>
   
    <Routes>
        <Route path="*" element={<Navigate to="/"/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin" element={<Admin/>}/>


    </Routes> 
    
    </>

    ); 
}