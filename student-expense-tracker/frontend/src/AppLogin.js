

import React,{ useEffect, useReducer, useState } from "react";
import {Router,Routes} from "react-router-dom";
import {GoogleAuthProvider,signInWithPopup,getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import  "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "firebase/auth";
// import firebase from "firebase/app";
import {useNavigate,Link} from "react-router-dom";
import axios from "axios";
import {app} from "./config/firebase.config";
import { useGlobalContext } from "./context/globalcontext";
import styled from "styled-components";
import MyMoneyVideo from './img/MyMoney2.mp4';

const AppLogin=()=>
 {
  const firebaseauth=getAuth(app);
   const provider=new GoogleAuthProvider();
   const {addUser,userid}=useGlobalContext();
//   const[token,setToken]=useState();
  const [auth,setAuth]=useState(false);
 
//   const[email,setEmail]=useState('');
//   const [password,setPassword]=useState('');
  const history=useNavigate();
//   const[user,setUser]=useState();
  
  const loginWithGoogle= async()=>
  {
        try{

        const res= await signInWithPopup(firebaseauth,provider).then((useCred)=>
        {    
                
                try
                {
                        if(useCred._tokenResponse.emailVerified)
                        {
                            // setAuth(true);
                            const user=
                            {
                                name:useCred._tokenResponse.displayName,
                                email:useCred._tokenResponse.email
                            }
                           
                            addUser(user);         
                            history("/App");
                        }
                }
            catch(err)
            {
                        console.log(err);    
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }

      
  }

  return(
    <>
           
  
           <div class="min-h-screen flex flex-col">
    <div class="flex-grow bg-white md:mt-0 mt-16">
        <div class="absolute inset-x-0 top-0 flex flex-wrap items-center justify-center z-10">
            <video autoPlay loop muted playsInline class="video-bg">
                <source src={MyMoneyVideo} alt="myvideo" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div class="max-w-md w-full bg-transparent rounded p-16">
                <h2 class="text-2xl font-semibold mb-4">Sign In with Google</h2>
                <div id="googleSignInBtn" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md mb-4" onClick={loginWithGoogle}>
                    Sign In with Google
                </div>
                <p class="text-sm text-gray-500">By signing in, you agree to our <a href="#" class="text-blue-500">Terms</a>.</p>
            </div>
        </div>
    </div>
</div>
<footer class="fixed bottom-0 inset-x-0 bg-blue-400 rounded-xl text-white text-center py-3 mt-2">
    <p>&copy; 2024 Student Expense Tracker. All rights reserved.</p>
</footer>


            
   

                   

      



   
</>)
}

export default AppLogin;





