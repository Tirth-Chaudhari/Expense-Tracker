
import { useState,useEffect } from "react";
import React from "react";
import styled from "styled-components";
import { Route,Routes,Link, useNavigate} from "react-router-dom";
import App from "./App";
import AppLogin from "./AppLogin";
import GoogleNote from "./Components/Dashboard/GoogleNotes/GoogleNote";

const LoginCard=()=>
{
    const navigate = useNavigate();

    
    return(
        <>

        <Routes>
          <Route path="/" element={<AppLogin/>}/>
          <Route path="/App" element={<App />} />


        </Routes>
      </>
    
    )    
        
}

export default LoginCard;