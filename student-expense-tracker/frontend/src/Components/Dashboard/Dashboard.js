
import { useState,useEffect } from "react";
import React from "react";
import styled from "styled-components";
import GoogleNote from "./GoogleNotes/GoogleNote";
import { Route,Routes,Link, useNavigate} from "react-router-dom";
// import Dashboard1 from "./Dashboard1";
import BottomNavigation from "./BottomNavigation";
import Group from "./Groups/Group";
import Member from "./Groups/Member";
import Trips from "./Trip/Trips";
import TripGroup from "./Trip/TripGroup";
import GraphData from "./Graph/GraphData";
const Dashboard=()=>
{
    const navigate = useNavigate();
    const [active,setActive]=useState(1);
    const [x_id,setxid]=useState('');
    const [TripId,setTripId]=useState('');
    const displayData=()=>
    {
        switch(active)
          {
              case 1:
                  return <GoogleNote/>
              case 2:
                return <GraphData/>
              case 3:
                return <Trips setActive={setActive} setTripId={setTripId}/>
              case 4:
                return <Group setActive={setActive} setxid={setxid}/>
              case 5:
                return <Member x_id={x_id} setActive={setActive}/>
              case 6:
                return <TripGroup  TripId={TripId} setActive={setActive}/>;
                  
          }

    }

    return(
        <>
      


        {displayData()}
        <BottomNavigation active={active} setActive={setActive}/>
       
       
       
        

        
      </>
    
    )    
        
}

export default Dashboard;