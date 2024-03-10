
import { useState,useEffect } from "react";
import React from "react";
import styled from "styled-components";
import GoogleNote from "./GoogleNotes/GoogleNote";
import { Route,Routes,Link, useNavigate} from "react-router-dom";
import { notes, search } from "../../utils/Icon";
import note_bg from "../../img/note_bg.png";
import { useGlobalContext } from "../../context/globalcontext";

const Dashboard1=()=>
{
   
    
    return(
        <>
       
       
        <nav className="fixed bottom-0 left-0 w-full bg-pink-100 shadow-2xl flex justify-around lg:rounded-full items-center py-2">
         
            <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
                <search className="w-6 h-6" />
                <span className="text-xs">Analysis</span>
            </Link>
            <Link to="/search" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
                <search className="w-6 h-6" />
                <span className="text-xs">Budget</span>
            </Link>
            <Link to="/note" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
                <search className="w-6 h-6" />
                <span className="text-xs">Note</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
                <search className="w-6 h-6" />
                <span className="text-xs">Groups</span>
            </Link>
        </nav>
        {/* <Board>

            <div className="item" id="income-expanse">
                    <div className="income-item">

                    </div>
                    <div className="expanse-item">

                    </div>
            </div>
            <div className="item">

            </div>
            <div className="item">

            </div>
           
            <div className="item" id="Note">
                 <button><Link to="/note">{notes}</Link></button>
             </div>
           

           
        </Board>*/}
      </> 
    
    )    
        
}

const Board=styled.nav`
    width:100%;
    color: rgba(50, 50, 90, 1);
    display:flex;
    height:100%;
    overflow-y:auto;
    justify-content:space-around;
    flex-wrap:wrap;
    padding-top:2rem;
    .item
    {
        width:24rem;
        height:15rem;
        background-color:hsl(200, 53%, 79%);
        border-radius:4rem;
        flex-grow:.25rem;
        margin-bottom:2.5rem;
        box-shadow: 0 4px 8px rgba(10, 10, 10, 0.7); 

    }
    #income-expanse
    {
        display:flex;
        align-items:center;
    }
    
            .income-item,.expanse-item
            {
                width:40%;
                height:50%;
                background:red;
                margin-left:2rem;
                border-radius:2rem;
            }
        #Note
        {
            display:flex;
            justify-content:flex-end;
            background-image: url(${note_bg});
            background-size: cover;
            background-position: center;
            align-items:flex-end;

            button
            {
                margin-bottom: 1.5rem;
                font-size: 2rem;
                margin-right: .8rem;
                border-radius: 1rem; /* Adjust the border-radius as needed */
                background-color: transparent;
                border: 2px solid #3498db; /* Border style */
                color: #3498db; /* Text color */
                padding: 0.5rem .7rem; /* Adjust padding as needed */
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 5px -5px 11px rgba(52, 152, 219, 0.5);
                Background-color:pink;
                &:hover {
                    background-color: #3498db; /* Background color on hover */
                    color: #ffffff; /* Text color on hover */
                }
                
            }
        }
        
  


`;


export default Dashboard1;

