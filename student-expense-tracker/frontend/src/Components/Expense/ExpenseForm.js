import React, { useState } from "react";
import { plus } from "../../utils/Icon";
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from "../../context/globalcontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
const ExpenseForm=()=>
{
    const {addExpense}=useGlobalContext();
    const [inputState,setInput]=useState(
         {title:'',
         amount:'',
         date:'',
         category:'',
         description:'' ,
        }
      
    )
    // const [title,amount,date,category,description]=inputState;  
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        if(!inputState.title|| !inputState.amount || !inputState.date || !inputState.category){
            toast.info("Please Enter All Detail !", {
                position: "top-center"
              });
        }else{
        addExpense(inputState);
        setInput(
        {title:'',
        amount:'',
        date:'',
        category:'',
        description:'' ,
       });
       toast.success("SuccessFully Added Income", {
        position: "top-center"
      });
    }
    }

    const handleInput=(event)=>
    {
        const {name,value}=event.target;
        setInput((prevData)=>
        {
            return{...prevData,[name]:value}   
        });
    }
    return(
        <FormStyle>
        <ToastContainer/>
                    <div className="input-control mb-4">
                            <input
                                type="text"
                                value={inputState.title}
                                name="title"
                                placeholder="Salary Title"
                                className="shadow-md"
                                onChange={handleInput}
                                ></input>
               
                            <input
                                type="number"
                                value={inputState.amount}
                                name="amount"
                                className="shadow-md"
                                placeholder="Salary Amount"
                                onChange={(handleInput)}></input>
                   
                            <DatePicker id="date" 
                                placeholderText="Enter Date"
                                name="date"
                                className="shadow-md"
                                selected={inputState.date}
                                dateFormat="dd/MM/yyyy"
                                onChange={(date)=>
                                        {  
                                            setInput((prevData)=>
                                            {
                                                
                                                return{...prevData,date:date}   
                                            })  
                                        }
                                }
                                

                                />
                    </div>
                    <div className="selection">
                            <select name="category" id="category" value={inputState.category} required onChange={handleInput} className="shadow-md" >
                            <option value="select option" >Select Option</option>
                            <option value="education">Education</option>
                            <option value="groceries">Groceries</option>
                            <option value="health">Health</option>
                            <option value="bill">Bill</option>
                            <option value="food">Food</option>
                            <option value="clothing">Clothing</option>  
                            <option value="travelling">Travelling</option>  
                            <option value="other">Other</option>  
                            </select>
                    </div>
                    <div className="input-control" >
                        <textarea  name="description" className="shadow-md" value={inputState.description} placeholder="Add Description" id="description" rows="4" cols="30" onChange={handleInput}/>
                    </div>
                    <div className="mb-4">
                        <button
                            onClick={handleSubmit}
                            className="flex justify-center  px-6 py-2  bg-persian-green text-white text-lg rounded-full  shadow-lg  hover:bg-opacity-90 focus:outline-none"
                        >
                        <div className="">Add Expense</div>
                    </button>
                    </div>

        </FormStyle>
    )

}

const FormStyle=styled.nav`
    display:flex;
    flex-direction:column;
    gap:2.5rem;
    
    input,select,textarea
    {
           
            border-radius:8px;
            font-family:inherit;
            font-size:110%;
            outline:none;
            resize:none;
            border:none;
            border:9px solid #fff;
            box-shadow:0px 2px 30px rgba(0,0,0,0.06);
            color:rgba(34,34,96,0.9);
            ${'' /* background:transparent; */}
        }
    textarea
    {
        width:50%;
    }
    .input-control
    {
        width:100%;
        gap:2rem;
        display:flex;
        flex-direction:column;
        display:flex;
        flex-direction:column;
    }
    .selection
    {

        display:flex;
        justify-content:flex-end;
        ${'' /* margin-right:8.2rem; */}
        select{
            color:rgba(34,34,96,0.6);
            &:focus,&:active    
            {
                color:rgba(34,34,96,1);
            }
            
        }
        
    }
    
    .btn button
    {
        display:flex;
        align-item:center;  
        gap:.8rem;
        transition: all .2s ease-in-out;
        outline:none;
        border:none;
        border-radius:18px;  
        padding:.8rem 1.4rem;
        background: rgb(230, 55, 134); 
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color:white;
        font-size:85%;
            &:hover{

                background:green;
                cursor:pointer;
            }
            i
            {
                margin:.2rem;
            }
         
    }
        
    

`;

export default ExpenseForm;