import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   
const GlobalContext=React.createContext();



const BASE_URL = process.env.REACT_APP_BASE_URL

export const GlobalProvider=({children})=>
{
   

    const [incomes,setIncomes]=useState([]);
    const [expenses,setExpenses]=useState([]);
    const [totalData,setData]=useState([]);
    const [error,setError]=useState(null);
    const [GroupIncome,setGroupIncome]=useState([]);
    const [GroupExpense,setGroupExpense]=useState([]);
    const [success,setSuccess]=useState('');
    const [Note,setNote]=useState([]);
    const [Trip,setTrip]=useState([]);
    const [TripInfo,setTripData]=useState([]);
    const [Username,setUserName]=useState(null);
    const [ImageUrl,setImageUrl]=useState(null);
    let userid='';
    let name='';
    let email1='';
    const [Members,setMember]=useState([]);

    const DeleteTripGroup=async (id)=>{
            const data={
                id:id
            }
        await axios.post(`${BASE_URL}delete-TripGroup`,data).then((response)=>
        {
              
               
               
        })
        .catch((err) =>{
                setError(err.response.data.message)
        })
    }

    const getTripData=async(id)=>
    {   
        console.log('here');

        await axios.get(`${BASE_URL}get-TripData/${id}`).then((response)=>
        {
            if(response)
            {
                    setTripData(response.data);
                    console.log(response.data);
            }
        
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })


    }
    
    const updateTripData=async(data)=>
    {
        await axios.post(`${BASE_URL}update-TripData`,data).then((response)=>
        {
          
            // getTripData(data.id);
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })

    }

    const deleteTripData=async(data)=>
    {
       
        await axios.post(`${BASE_URL}delete-TripData`,data).then((response)=>
        {
          
            // getTripData(data.id);
           
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
    }
    

    const addTripData=async (data)=>
    {
        await axios.post(`${BASE_URL}add-TripData`,data).then((response)=>
        {
            if(response.data.message==='Successfully Added')
            {
                toast.success('Member Added',
                {
                    position:"top-center"
                })
            }
            else if(response.data.message==='Trip Not Found')
            {
                toast.info('Member Not Found',
                {
                    position:"top-center"
                })
            }
            else if(response.data.message==='Server Error')
            {
                toast.error('Server Errror',
                {
                    position:"top-center"
                })
            }
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
    }

    const AddTripMember=async(data)=>
    {
        await axios.post(`${BASE_URL}add-TripMember`,data).then((response)=>
        {
            if(response.data.message==='Successfully Added')
            {
                toast.success('Member Added',
                {
                    position:"top-center"
                })
            }
            else if(response.data.message==='Member Not Found')
            {
                toast.info('Member Not Found',
                {
                    position:"top-center"
                })
            }
            else if(response.data.message==='Server Error')
            {
                toast.error('Server Errror',
                {
                    position:"top-center"
                })
            }
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
    }   
   
    const getTrip=async()=>
    {
        userid=localStorage.getItem('userid');
        
        await axios.get(`${BASE_URL}get-Trip/${userid}`,).then((response)=>
        {
                if(response)
                {
                 setTrip(response.data);
                }
            
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })

    }

    const AddTrip=async(TripName)=>
    {
        const user_id=localStorage.getItem('userid');
        name=localStorage.getItem('name');
        const email=localStorage.getItem('email');
        const data=
        {
            TripName,
            user_id,
            name,
            email


        }
        await axios.post(`${BASE_URL}add-Trip`,data).then((response)=>
        {
            if(response)
            {
                getTrip();
            }
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })

    }

    const getNote=async()=>
    {
        userid=localStorage.getItem('userid');
        
        await axios.get(`${BASE_URL}get-descriptions/${userid}`,).then((response)=>
        {
            if(response)
            {
                 setNote(response.data);
            }
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
    }

    const updateNote=async(data)=>
    {

        
        await axios.post(`${BASE_URL}update-description`,data).then((response)=>
        {
            if(response)
            {
                getNote();
            }
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
    }
    const addNote=async()=>
    {
        
        userid=localStorage.getItem('userid');
        const data=
        {
            user_id:userid,
            description:''

        }
        await axios.post(`${BASE_URL}add-description`,data).then((response)=>
        {
            if(response)
            {
                getNote();
            }
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
    }

    const deleteNote=async(id)=>
    {
        const data=
        {
            id
        }
       
        await axios.post(`${BASE_URL}delete-description`,data).then((response)=>
        {
            if(response)
            {
                getNote();
            }
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
    }



    const deleteMember=async(id)=>
    {
        const data={
            id
        }
        console.log(data.id+"a");
        console.log(data.id);
        await axios.post(`${BASE_URL}delete-groups`,data).then((response)=>
        {
                     if(response.data.message==='Server Error')
                    {
                        toast.error("Server Error !", {
                            position: "top-center"
                        });    
                    }
                    else if(response.data.message==='Invalid ID format')
                    {
                        toast.error("Something went wrong! Try again later.", {
                            position: "top-center"
                        });  
                    }
                    else if(response.data.message==='Member Not Found')
                    {
                        toast.error("Something went wrong! Try again later.", {
                            position: "top-center"
                        });  
                    }
                    else
                    {
                        getMember();
                        toast.success('Member Deleted',
                        {
                            position:"top-center"
                        })
                    }
       })
    }

    const deleteGroupData=async(data)=>
    {
        await axios.post(`${BASE_URL}delete-groupincome`,data).then((response)=>
        {
            if(response)
            {
                    if(response.data.message==='Server Error')
                    {
                        toast.error("Server Error !", {
                            position: "top-center"
                        });    
                    }
                    else if(!response.data.message==='GroupData Deleted')
                    {
                        toast.error("Something went wrong! Try again later.", {
                            position: "top-center"
                        });  
                    }
                    else
                    {
                        getGroupIncome();
                        getGroupExpense();
                    }
            }
            else
            {
                toast.error("Something went wrong! Try again later.", {
                    position: "top-center"
                });  
            }
        

        })
    };
    const updateGroupData=async (data)=>
    {
        await axios.post(`${BASE_URL}update-groupincome`,data).then((response)=>
        {
            if(response)
            {
                    if(response.data.message==='Server Error')
                    {
                        toast.error("Server Error !", {
                            position: "top-center"
                        });    
                    }
                    else if(!response.data.message==='GroupIncome Updated')
                    {
                        toast.error("Something went wrong! Try again later.", {
                            position: "top-center"
                        });  
                    }
                    else
                    {
                        getGroupIncome();
                        getGroupExpense();
                    }
            }
            else
            {
                toast.error("Something went wrong! Try again later.", {
                    position: "top-center"
                });  
            }


        })
        .catch((err) =>{
            setError(err.response.data.message)
        })

    }
    const getGroupExpense=async()=>
    {
        userid=localStorage.getItem('userid');
        console.log(userid);
        await axios.get(`${BASE_URL}get-groupexpense/${userid}`).then((response)=>
        {
          
          
            setGroupExpense(response.data);
           
       
         
        })
        .catch((err) =>{
            console.log('error accured');
            setError(err.response.data.message)
        })
    }
    const getGroupIncome=async()=>
    {
        userid=localStorage.getItem('userid');
        console.log(userid);
        await axios.get(`${BASE_URL}get-groupincome/${userid}`).then((response)=>
        {
          setGroupIncome(response.data);
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
        
        
    }
    const addGroupIncome=async(data)=>
    {

        data.user_id=localStorage.getItem('userid');
        const response = await axios.post(`${BASE_URL}add-groupincome`,data).then((response)=>
        {
            if(response.data.message==='Server Error')
            {
            toast.error("Server Error !", {
                position: "bottom-center"
            });    
            }
            else
            {
                getGroupIncome();
                getGroupExpense();
            }

        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
    }

    const getMember=async()=>
    {
        userid=localStorage.getItem('userid');

        await axios.get(`${BASE_URL}get-groups/${userid}`).then((response)=>
        {
            if(response)
            {
            setMember(response.data);
            }
            else
            {
                toast.error("Server Error !", {
                    position: "top-center"
                }); 
            }
            
        })
        .catch((err) =>{
            console.log('error accured mem');
            setError(err.response.data.message)
        })
        
    }
    const addMember=async (email)=>
    {
        name=localStorage.getItem('name');
        email1=localStorage.getItem('email');
        const data1=
        {
           
            email,
            name,
            email1


        }
        userid=localStorage.getItem("userid")
        data1.user_id=userid;
        console.log("iy"+data1.user_id);
        
        await axios.post(`${BASE_URL}add-group`,data1).then((response)=>
        {
            if(response.data.message==='Group Added')
            {
              getMember();
            }
            console.log(response.data.message+"gb");
            if(response.data.message==='Group Added')
            { 
                toast.success("Member Successfully Added!", {
                    position: "top-center"
                });
            }
            else if(response.data.message==='Member Already Exist')
            {
                toast.info("Member Already Exist!", {
                    position: "top-center"
                });
            }
            else if(response.data.message==='All fields are required!')
            {
                toast.info("Please Enter email !", {
                    position: "top-center"
                });
            }
            else if(response.data.message==='Member Not Found')
            {
                toast.info("Member Email Not Found Invite Friends !", {
                    position: "top-center"
                });
            }
            else
            {
                toast.error("Server Error !", {
                    position: "top-center"
                });
            }
  
        
            
           
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
      
    //    console.log(Members+response.data.message+"gb");
       
        
        
    }

    const addUser=async(user)=>
    {
        console.log(user);
        localStorage.setItem('name',user.name);
        localStorage.setItem('email',user.email);
     
         await axios.post(`${BASE_URL}add-user`, user).then((response)=>
        {
            if(response){
                userid=response.data.message._id;
                localStorage.setItem('userid', userid);
                localStorage.setItem("name1",response.data.message.name1);
                localStorage.setItem("ImageUrl",response.data.message.url);
            }
            getMember();
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
          
             
    }

    const updateTotalData = () => 
    {
        const updatedTotalData = [...incomes, ...expenses];
        setData(updatedTotalData);
    };

    const deleteIncome=async(id)=>
    {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`).catch((err)=>{console.log(err);})
        getIncomes()
    }
    const getIncomes=async ()=>
    {  
        userid=localStorage.getItem('userid');
        try
        {
        const response = await axios.get(`${BASE_URL}get-incomes/${userid}`).catch((err)=>{console.log(err);})
        setIncomes(response.data)
        updateTotalData();  
        }
        catch(err)
        {
            console.log(err);
        }
    }

    const addIncome=async (income)=>
    {
        income.user_id=localStorage.getItem('userid');
        const response = await axios.post(`${BASE_URL}add-income`, income)
        .catch((err) =>{
            setError(err.response.data.message)
        })
         getIncomes()
    }
    const updateIncome=async (income)=>
    {   
            const {id,title, amount, category, description, date}  = income;
            const response=await axios.post(`${BASE_URL}update-income/${id}`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
             getIncomes()
    }

    const totalIncome=()=>
    {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
        
    }



    const addExpense=async (expense)=>
    {
        expense.user_id=localStorage.getItem('userid');
        const response = await axios.post(`${BASE_URL}add-expense`,expense)
        .catch((err) =>{
            setError(err.response.data.message)
        })
        getExpenses()

    }

    const updateExpense=async (expense)=>
    {
        const {id,title, amount, category, description, date}  = expense;
        const response=await axios.post(`${BASE_URL}update-expense/${id}`, expense)
        .catch((err) =>{
            setError(err.response.data.message)
        })
         getExpenses()
         
    }
    const getExpenses=async ()=>
    {
        userid=localStorage.getItem('userid');
        try
        {
        const response = await axios.get(`${BASE_URL}get-expenses/${userid}`).catch((err)=>{console.log(err);})
        setExpenses(response.data)
        updateTotalData();
        }
        catch(err)
        {

        }
    }
    const totalExpenses = () => {

        let totalExpenses = 0;
        expenses.forEach((expense) =>
        {
            totalExpenses = totalExpenses + expense.amount
        })
        return totalExpenses;
        
    }
    const deleteExpense=async(id)=>
    {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`).catch((err)=>{console.log(err);})
        getExpenses()

    }
    const setUserImage=async(url)=>
    {
        const data=
        {
            url,
            userid:localStorage.getItem("userid")
        }
        const response = await axios.post(`${BASE_URL}add-UserImage`,data).then((res)=>
        {

        })
        .catch((err) =>{
            // setError(err.response.data.message)
        })
    }
    const setUserProfileName=async(name)=>
    {
            const data={
                name,
                userid:localStorage.getItem("userid")
            }
            const response = await axios.post(`${BASE_URL}add-UserName`,data).then((res)=>
            {
    
            })
            .catch((err) =>{
            })
    }
    return(
        <GlobalContext.Provider value={{addIncome,incomes,deleteIncome,totalIncome,getIncomes,
                                        addExpense,expenses,deleteExpense,totalExpenses,getExpenses,totalData,updateIncome,updateExpense,
                                        addUser,userid,setUserImage,setUserProfileName,setUserImage,setUserName,
                                        addMember,Members,getMember,addGroupIncome,getGroupIncome,getGroupExpense,GroupIncome,GroupExpense,updateGroupData,deleteGroupData,deleteMember,
                                        addNote,getNote,deleteNote,updateNote,Note,
                                        AddTrip,getTrip,Trip,AddTripMember,addTripData,deleteTripData,updateTripData,getTripData,TripInfo,DeleteTripGroup
                                        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext=()=>
{
    return useContext(GlobalContext);
}