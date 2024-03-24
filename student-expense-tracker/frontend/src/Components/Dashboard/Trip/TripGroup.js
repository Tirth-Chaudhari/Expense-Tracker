import React, { Component, useEffect,useRef,useState } from 'react';
import { IoReturnDownBackSharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Delete, comment, edit, email, friends, note, rupee, trash, user } from "../../../utils/Icon";
import { useGlobalContext } from "../../../context/globalcontext";
import { Card, Checkbox, Typography, timeline } from "@material-tailwind/react";
import moment from "moment";
import {useReactToPrint} from "react-to-print";
const TripsGroup=({TripId,setActive})=>
{
                   
                       
                        const [call,setCall]=useState(false);
                        const [isDialogOpen,setDialogOpen]=useState(false);
                        const [updateAmount,setAmount]=useState([]);
                        const [ispaid,setpaid]=useState([]);
                        const [dialogColor,setColor]=useState('');
                        const [isDisabled,setDisabled]=useState('');
                        const [_id,setid]=useState('');
                        const {deleteTripData,updateTripData,getTripData,TripInfo,DeleteTripGroup}=useGlobalContext();
                        const [allsettlements,setsettlements]=useState();
                        const [mode,setMode]=useState("Equally");
                        const [checkedCount, setCheckedCount] = useState(TripId.TripMember.length);
                        const [total,setTotal]=useState(0);
                        const [equallyTitle,setTitle]=useState('');
                        const [selectedMembers, setSelectedMembers] = useState(Array.from({ length: TripId.TripMember.length }, () => true));
                        const [isDialogOpenDelete,setDialogOpenDelete]=useState(false);
                       

                        const onCloseDelete=()=>
                        {
                           setDialogOpenDelete(!isDialogOpenDelete);
                        }
                        const onDeleteGroup=()=>
                        {
                              DeleteTripGroup(TripId._id);
                              setActive(3);
                        }
                        const handleDeleteGroup=()=>
                        {
                            if(localStorage.getItem("userid")===TripId.CreateBy.user_id)
                            {
                               setDialogOpenDelete(!isDialogOpenDelete);
                            }
                            else{
                              toast.info("Only Group Admin can Delete This Group", {
                                 position: "top-center"
                               });
                            }
                        }
                     const handleCheckboxChange = (index, isChecked) => {
                        const newCheckedCount = isChecked ? checkedCount + 1 : checkedCount - 1;
                        setCheckedCount(newCheckedCount);
                        setSelectedMembers(prevSelectedMembers => {
                           const newSelectedMembers = [...prevSelectedMembers];
                           newSelectedMembers[index] = isChecked;
                           return newSelectedMembers;
                       });
                      

                        
                     };

                        
                  const componentPDF=useRef();
                  const generatePDF=useReactToPrint({
                     content:()=>componentPDF.current,
                     documentTitle:TripId.TripName,


                  })

                 
            const generateSettlementsTable=(tripData, currentUser) =>{
               const settlements = {};
                       
                           tripData.forEach(transaction => {
                               const { title,paidBy, Amount } = transaction;
                       
                               if (paidBy.user_id === currentUser.user_id) {
                                   Amount.forEach(({ name,email,user_id, amount }) => {
                                       if (user_id !== currentUser.user_id) {
                                           settlements[user_id] = settlements[user_id] || { income: 0, expenses: 0,name:name,email:email,incomeArray:[{title:'Records'}],expenseArray:[{title:'Records'}] };
                                           settlements[user_id].expenses += amount;
                                           settlements[user_id].expenseArray.push({title:title,amount:amount});
                                       }
                                   });
                               } else {
                                   const currentUserAmount = Amount.find(entry => entry.user_id === currentUser.user_id);
                                   if (currentUserAmount) {
                                       settlements[paidBy.user_id] = settlements[paidBy.user_id] || { income: 0, expenses: 0,name:paidBy.name,email:paidBy.email,incomeArray:[{title:'Records'}],expenseArray:[{title:'Records'}] };
                                       settlements[paidBy.user_id].income += currentUserAmount.amount;
                                       settlements[paidBy.user_id].incomeArray.push({title:title,amount:currentUserAmount.amount});

                                   }
                               }
                           });
                           setsettlements(settlements);
                           console.log("User\t\tIncome\t\tExpenses");
                           console.log("--------------------------------------");
                           Object.entries(settlements).forEach(([userId, { income, expenses,name,email }]) => {
                               console.log(`${userId}\t\t${income}\t\t${expenses}\t\t${name}\t\t${email}`);
                           });

                       }
                        



                        const updateRecord=()=>
                        {
                           const data=
                           {
                               id:TripId._id,
                              _id,
                              ispaid,
                              updateAmount
                           }
                           updateTripData(data)
                           closeDialog();
                        }

                        const deleteRecord=()=>
                        {
                               const id=TripId._id
                               const data={
                                 id,
                                 _id
                               }
                              deleteTripData(data);
                              closeDialog();
                        }

                        const handleDialog=(paidBy,Amount,_id)=>
                        {
                            setAmount(Amount)
                            setColor(paidBy.user_id===localStorage.getItem("userid")? 'bg-green-300':'bg-red-300');
                            setpaid(paidBy);
                            setDisabled(paidBy.user_id===localStorage.getItem("userid")? false:true);
                            setid(_id);
                            setDialogOpen(!isDialogOpen);
                        }

                        const closeDialog=()=>
                        {
                              setDialogOpen(!isDialogOpen)
                        }

                        const {addTripData}=useGlobalContext();
                        const [expenseDetails,  setExpenseDetails] = useState({
                                _id:TripId._id,
                                title: '',
                                totalAmount: 0,
                                individualAmounts: [],
                                paidBy:{}
                        });
                        const [expenseDetails1,  setExpenseDetails1] = useState({
                           _id:TripId._id,
                           title: '',
                           totalAmount: 0,
                           individualAmounts: [],
                           paidBy:{}
                   });

                        const handleExpenseChange = (event, index, userId, name, email) => {
                                const { name: inputName, value } = event.target;
                                let totalIncome = 0;
                                const updatedIndividualAmounts = [...expenseDetails.individualAmounts];
                                if (inputName.startsWith('amount')) {
                                updatedIndividualAmounts[index] = {
                                user_id: userId,
                                name,
                                email,
                                amount: parseFloat(value)
                        };

                        // Calculate the total income
                                for (let i = 0; i < updatedIndividualAmounts.length; i++) {
                                        totalIncome += parseFloat(updatedIndividualAmounts[i]?.amount || 0);
                                }
                                const paidTotal={
                                user_id:localStorage.getItem("userid"),name:localStorage.getItem("name"),email:localStorage.getItem("email"),
                                total:totalIncome
                                }
                                setExpenseDetails(prevState => ({
                                ...prevState,
                                totalAmount: totalIncome,
                                individualAmounts: updatedIndividualAmounts,
                                paidBy:paidTotal
                                }));
                        }
                        else
                        {
                                setExpenseDetails(prevState => ({
                                        ...prevState,
                                        [inputName]: value
                                }));
                        }
                        // Update the expenseDetails state variable
                        };
                        const handleSaveExpense = () => 
                        {
                           if(mode==="Equally")
                           {
                              if(equallyTitle.trim()==='' || total<=0)
                              {
                                 toast.info('Enter title and Amount',
                                 {
                                       position:"top-center"
                                 })
                              }
                              else
                              {
                                 const selectedMembersData = TripId.TripMember.filter((member, index) => selectedMembers[index]);
                                 const divideAmount=(total/checkedCount).toFixed(2);
                                 // Create an array containing the required data for selected members
                                 const selectedMembersArray = selectedMembersData.map(member => {
                                     return {
                                         user_id: member.user_id,
                                         name: member.name,
                                         email: member.email,
                                         amount:divideAmount // Assuming you have amount property in TripId.TripMember
                                     };
                                 });
                               expenseDetails1.individualAmounts=selectedMembersArray;
                               expenseDetails1.title=equallyTitle; 
                               const paidTotal={
                                 user_id:localStorage.getItem("userid"),name:localStorage.getItem("name"),email:localStorage.getItem("email"),
                                 total:total
                                 }
                               expenseDetails1.paidBy=paidTotal
                               addTripData(expenseDetails1);
                               toast.success('Successfully Added Group Data', {
                                 position: "top-center"
                               });
                               setTitle('')
                               setTotal(0);
                              }
                           }
                           else
                           {
                                if(expenseDetails.title.trim()!='' && expenseDetails.totalAmount!==0)
                                {
                                    const filteredIndividualAmounts = expenseDetails.individualAmounts.filter(amount => 
                                       amount && typeof amount === 'object' && Object.keys(amount).length !== 0
                                 );
                                 if (filteredIndividualAmounts.length > 0) {
                                    expenseDetails.individualAmounts=filteredIndividualAmounts;
                        
                                    setExpenseDetails({
                                        _id: TripId._id,
                                        title: '',
                                        totalAmount: 0,
                                        individualAmounts: [],
                                        paidBy: {}
                                    });

                        
                                    // Add other logic for saving data to the database
                                    addTripData(expenseDetails);
                        
                                    toast.success('Successfully Added Group Data', {
                                        position: "top-center"
                                    });
                        }
                     }
                        else
                            {
                                if(expenseDetails.title.trim()==='' && expenseDetails.totalAmount===0)
                                {
                                     toast.info('Enter title and Amount',
                                    {
                                          position:"top-center"
                                    })
                                 }
                               else if(expenseDetails.title.trim()==='')
                              {
                                toast.info('Enter title',
                                {
                                    position:"top-center"
                                })
                                }
                                else
                                {
                                    toast.info('Enter Amount',
                                {
                                position:"top-center"
                                })  
                              }
                           }
                           }
                        };

                        const [current,setCurrent]=useState('GroupData');
                        const [email1,setEmail]=useState('');
                        const {AddTripMember,getTrip}=useGlobalContext();
                        const TABLE_HEAD = ["Name", "Email", "Individual Amount"];
                        const handleSelectionChange=(e)=>
                        {
                            setCurrent(e.target.value)
                           
                            if (e.target.value=== "Bill Splitter") {
                              generateSettlementsTable(TripId.TripData, { user_id: localStorage.getItem("userid") });
                            }
                            if(e.target.value=='Add Expense')
                            {
                                 setMode("Equally")
                            }
                        }
                        const change=()=>
                        {
                         setActive(3);
                        }
                        const addMember=()=>
                        {
                        const data=
                        {
                            _id:TripId._id,
                            email:email1
                        }
                            AddTripMember(data);
                            setEmail('');
                        }




return(<>
<div className="overflow-auto mb-12 mt-4">
   <ToastContainer/>
   <div className='ml-2' onClick={() =>
      { 
      change();
      }}>
      <h2>
         <IoReturnDownBackSharp/>
      </h2>
   </div>
   <div>
      <select className="p-2 w-40  m-8 mb-2 border border-gray-300 rounded-md "
         onChange={handleSelectionChange}
         >
         <option value="GroupData">Group Expense</option>
         <option value="GroupMembers">Group Settings</option>
         <option value="Add Expense">Add Expense</option>
         <option value="Bill Splitter">Bill Splitter</option>
      </select>
   </div>
   {current === 'GroupData' ? (
   <div className='w-full flex flex-col  items-center mt-8'>
      {TripId?.TripData?.slice().reverse().map(({ title, paidBy, Amount, createdAt,_id }) => {
        
        const formattedDate = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
        let color = paidBy.user_id===localStorage.getItem("userid")? "bg-green-100":"bg-red-100";
        let paid=paidBy.user_id===localStorage.getItem("userid");

        if (Amount && (Amount.some(item => item && item.user_id === localStorage.getItem("userid"))) || paid) {
                return (
                        <div className={`flex flex-col md:flex-row border rounded-lg shadow-xl p-4 mb-4 lg:w-1/2 w-full justify-center ${color} m-2`} onClick={()=>{ 
                            
                            handleDialog(paidBy,Amount,_id)}} >
                        <div className="md:w-1/2">
                            <div className="mb-2">
                                <span className="font-semibold">Title:</span> {title.slice(0,25)}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Total:</span> {paidBy.total}
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="mb-2">
                                <span className="font-semibold">Paid By:</span> {paidBy.name.slice(0,28)}
                            </div>  
                            <div className="mb-2">
                                <span className="font-semibold">Date:</span> {formattedDate}
                            </div>
                        </div>
                    </div>
            );
            }
             else {
                  return null; // User is not present in the Amount array
            }
            })}
        {isDialogOpen && (
             
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 md:bg-opacity-0">
          <div className={`${dialogColor} p-6 rounded-md shadow-md w-96 overflow-auto h-1/2`}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold">Edit Record</p>
               <p className="text-gray-600 "></p>
            </div>
            <div className="flex flex-col">
               <div className="flex flex-col items-center">
                  Total
                  <input
                     disabled={true}
                     type="number"
                     name="totalAmount"
                     value={ispaid.total}
                     onChange={handleExpenseChange}
                     className="block w-full mt-1 py-2 px-3 border border-blue-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                     />
                  </div>
            {updateAmount && updateAmount
                .filter(item => item !== null )
                    .map(({ name, amount },index) => {
                               const handleRemove = () => {
                              const updatedAmount = [...updateAmount];
                                 updatedAmount.splice(index, 1);
                                 setAmount(updatedAmount);
                                 let total = 0;
                                 for (let i = 0; i < updatedAmount.length; i++) {
                                    total += parseFloat(updatedAmount[i].amount || 0);
                                 }

                                 ispaid.total=total;
                              
                              };
                              const handleAmountChange = (event) => {
                                 const updatedAmount = [...updateAmount];
                                 updatedAmount[index].amount = event.target.value;
                                 setAmount(updatedAmount);
                                 let total = 0;
                                 for (let i = 0; i < updatedAmount.length; i++) {
                                    total += parseFloat(updatedAmount[i].amount || 0);
                                 }

                                 ispaid.total=total;
                              };

                            return(
                                <div className="flex mt-4 ">
                                    <button
                                             className="bg-blue-500 text-white px-1 py-1 rounded-md hover:bg-red-500 m-2"
                                             onClick={handleRemove}
                                             disabled={isDisabled}
                                          >
                                          Remove
                                    </button>
                                    <div style={{ width: "150px" }}>{name.slice(0,28)}...</div>
                                       <div>  
                                             <input
                                                type="text"
                                                inputMode="numeric"
                                                value={amount}
                                                disabled={isDisabled}
                                                onChange={handleAmountChange}
                                                className="block w-full py-2 px-3 border border-blue-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                          />
                                        </div>
                                </div>
                            );
            })}
            </div>
           <div className="flex justify-end mt-4 space-x-2">
            {!isDisabled && (
               <>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={updateRecord}
                disabled={isDisabled}
              >
                save
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={deleteRecord}
                disabled={isDisabled}
              >
              
                {Delete}
              </button>
            </>)
            }
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={closeDialog}
              >
                x
              </button>
            </div>
          </div>
        </div>
      )}
              
 </div>
) : null}
{current==='GroupMembers' ?
(

<div className=''>
   <div>
      <div class='max-w-md w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-4'>
         <div class='flex items-center border-b border-gray-200 py-2 px-4'>
            <input class='w-full bg-gray-100 focus:outline-none focus:bg-white border-transparent focus:border-gray-300 rounded-lg py-2 px-4' value={email1}type='text' placeholder='Add member by email id' onChange={(e)=>{setEmail(e.target.value)}} />
            <button class='flex ml-4  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
               onClick={addMember}>
               <div className='mr-1'>{user}</div>
               <div>{email}</div>
            </button>
         </div>
      </div>
   </div>
   <div className="mb-4">
      <div className='border-b border-gray-500 p-4'>
         <span className='text-lg font-bold'>Members</span>
      </div>
      { TripId.TripMember.map((member, index) => (
      <div className='flex items-center mt-8 lg:mt-8 hover:bg-gray-100 cursor-pointer border-gray-300 border-b ml-2' key={index}>
         <div className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4'>{friends}</div>
         <div className='flex-grow'>
            <div className='text-lg font-semibold'>{member.name}</div>
            <div className='text-gray-500'>{member.email}</div>
         </div>
      </div>
      ))}
   </div>
   <div>
            <p className='text-lg justify-center flex mt-8'>Danger Zone</p>
           <div className='mb-8 flex justify-center text-red-400' onClick={handleDeleteGroup}> <button className='mr-2'>{trash}</button> Delete group </div>






           {isDialogOpenDelete  && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full max-w-md mx-auto my-6">
            <div className="relative flex flex-col w-full rounded-lg shadow-lg outline-none focus:outline-none bg-red-300">
              <div className="flex items-start justify-between p-3 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-xl font-semibold">
                     Are you ABSOLUTELY sure you want to delete this group? This will remove this group for All users involved,not just yourself.
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onCloseDelete}
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/* Body */}
              <div className="relative p-4 flex justify-around">
                
                <button
                  className="text-white bg-blue-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded-2xl hover:bg-opacity-10"
                  type="button"
                  onClick={onDeleteGroup}
                >
                    Yes
                </button>
                <button
                  className="text-white bg-blue-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded-2xl hover:bg-opacity-10"
                  type="button"
                  onClick={onCloseDelete}
                >
                  No
                </button>
                {/* </p> */}
              </div>
              {/* Footer */}
              <div className="flex items-center justify-end p-2 border-t border-solid rounded-b border-blueGray-200">
                <button
                  className="text-white bg-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded-2xl"
                  type="button"
                  onClick={onCloseDelete}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
       )}













   </div>
</div>
):null
}


{current==="Add Expense" ?
(<>
<div className="m-4 border-gray-400 max-w-screen-lg mx-auto">
   <div className="flex justify-center">
      <div className="w-full lg:w-1/4">
         <div className="mb-12">
            <Typography variant="large" color="blue-gray" className="font-semibold mb-2">
               <label htmlFor="title" className="block text-sm font-medium text-blue-gray-700">
               Title
               </label>
               <input
                  type="text"
                  name="title"
                  value={mode=="Unequally"? expenseDetails.title:equallyTitle}
                  onChange={mode=="Unequally"? handleExpenseChange :(e)=>setTitle(e.target.value)}
                  className="block text-xl w-full mt-1 py-2 px-3 border border-blue-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  />
            </Typography>
            <div className="flex space-x-4 mt-4">
               <div>
                  <label htmlFor="whoPaid" className="block text-sm font-medium text-blue-gray-700">
                  Who Paid?
                  </label>
                  <input
                     disabled={true}
                     value={localStorage.getItem("name")}
                     type="text"
                     id="whoPaid"
                     className="block w-full mt-1 py-2 px-3 border border-blue-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                     />
               </div>
               <div>
                  <label htmlFor="amountPaid" className="block text-sm font-medium text-blue-gray-700" onChange={(e)=>setTotal(e.target.value)}>
                      How Much?
                  </label>
                  <input
                     disabled={mode=="Unequally"}
                     type="number"   
                     name="totalAmount"
                     value={mode=="Unequally"?expenseDetails.totalAmount:total}
                     onChange={mode=="Unequally"? handleExpenseChange:(e)=>setTotal(e.target.value)}
                     className="block w-full mt-1 py-2 px-3 border border-blue-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                     />
               </div>
            </div>
         </div>
      </div>
   </div>
    <div>
      <select className="p-2 w-40  m-8 mb-2 border border-gray-300 rounded-md "
            onChange={(e)=>{setMode(e.target.value)}}
         >
         <option value="Equally">Equally</option>
         <option value="Unequally">Unequally</option>
      </select>
      </div>

   <div className="">
      {mode === 'Equally' && (
         <p className='flex justify-center text-lg'>
               {((total / checkedCount)).toFixed(2)}/person ({checkedCount} person)
         </p>
      )}
      <table className="w-full lg:w-auto text-left border-collapse mx-auto lg:mx-0">
         <thead>
            <tr>
               {TABLE_HEAD.map((head, index) => (
               <th key={index} className="border-b border-blue-gray-100 bg-transparent p-4">
                  <Typography variant="" color="blue-gray" className="font-normal leading-none opacity-70 text-2xl">
                     {head}
                  </Typography>
               </th>
               ))}
            </tr>
         </thead>
       {mode=="Unequally" &&
         <tbody>
            {TripId.TripMember.map((member, index) => {
            const isLast = index === TripId.TripMember.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
            <tr key={index}>
               <td className={classes}>
                  <Typography variant="large" color="blue-gray" className="font-normal text-xl">
                     {member.name}
                  </Typography>
               </td>
               <td className={classes}>
                  <Typography variant="large" color="blue-gray" className="font-normal text-xl">
                     {member.email}
                  </Typography>
               </td>
               <td className={classes}>
                  <div className="">
                     <input
                     key={index}
                     type="number"
                     name={`amount${index}`} 
                     value={expenseDetails.individualAmounts[index]?.amount || ''} // Use value from state variable
                     onChange={event => handleExpenseChange(event, index, member.user_id, member.name, member.user_id)} // Pass index to identify the corresponding member
                     className="block w-full py-2 px-3 border border-blue-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                     />
                  </div>
               </td>
            </tr>
            );
            })}
         </tbody>
      }
      {
         mode=="Equally" &&
         <tbody>
            {TripId.TripMember.map((member, index) => {
            const isLast = index === TripId.TripMember.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
            <tr key={index}>
               <td className={classes}>
                  <Typography variant="large" color="blue-gray" className="font-normal text-xl">
                     {member.name}
                  </Typography>
               </td>
               <td className={classes}>
                  <Typography variant="large" color="blue-gray" className="font-normal text-xl">
                     {member.email}
                  </Typography>
               </td>
               <td className={classes}>
                <input
                     type="checkbox"
                     className="inline-block w-6 h-6 ml-4 bg-white border border-gray-300 rounded-md cursor-pointer"
                     id={`checkbox-${index}`} 
                     checked={selectedMembers[index]}
                     onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                    
                />
            </td>
            </tr>
            );
            })}
         </tbody>
      }
      </table>
   </div>
   <button
      onClick={handleSaveExpense}
      className="sm:w-1/3 w-full flex justify-center bg-persian-green text-white text-xl rounded-full py-3 shadow-lg  hover:bg-opacity-90 focus:outline-none"
      >
      <div className="mr-4">{note}</div>
      Add Expense
   </button>
</div>
</>
):null}


            {current==='Bill Splitter' ?
            (
               
      <div className=" m-4" ref={componentPDF}>
            <table className="table-auto min-w-full divide-y divide-black-200">
            <thead className="bg-black ">
               <tr>
                  <th scope="col" className="px-6 py-3 text-left  font-medium text-white uppercase tracking-wider text-sm">
                  User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left font-medium text-white uppercase tracking-wider text-sm">
                  Income (your lent)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left  font-medium text-white uppercase tracking-wider text-sm">
                  Expenses (your borrowed)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left  font-medium text-white uppercase tracking-wider text-sm">
                  Total 
                  </th>
                  
               
               </tr>
            </thead>
         <tbody className="bg-gray-300 " >
               {allsettlements && Object.entries(allsettlements).map(([userId, {incomeArray,expenseArray,name, income, expenses }]) => (
                  
                  <tr className='border-b border-white'  >
                  <td className="px-4 py-2 whitespace-nowrap text-xl">{name.slice(0,28)}</td>
                     <td className="px-4 py-2 whitespace-nowrap text-xl">{expenses.toFixed(2)}
                                 {
                                    expenseArray.length!=1 && 
                                    <select className="ml-4 md:w-1/2 appearance-none bg-white border border-gray-300 text-gray-700 px-1 rounded leading-tight focus:outline-none focus:shadow-outline">
                                                      {expenseArray.map((item, index) => (
                                                         <option key={index}>{item.title.slice(0,10)}: {item.amount}</option>
                                                      ))}
                                     </select>
                                 }
                     </td>
                     <td className="relative px-6 py-4 whitespace-nowrap text-xl">{income.toFixed(2)}      
                                 {
                                    incomeArray.length!=1 && 
                                    <select className="ml-4 md:w-1/2 appearance-none bg-white border border-gray-300 text-gray-700  px-1 rounded leading-tight focus:outline-none focus:shadow-outline">
                                                      {incomeArray.map((item, index) => (
                                                         <option key={index}>{item.title.slice(0,10)}: {item.amount}</option>
                                                      ))}
                                     </select>
                                 }
                     </td>
                     <td className="px-4 py-2 whitespace-nowrap text-xl">{(expenses-income).toFixed(2)}</td>

                  
                  </tr> 
               ))}
         </tbody>
         </table>
         <div className=''>
            <button
               onClick={generatePDF}
               className="px-4 right-1 mt-2 flex justify-center bg-red-300 text-white text-xl rounded-full py-2 shadow-xl  hover:bg-opacity-90 focus:outline-none"
               >
              Export PDF
      </button>
      </div>
      </div>
                    
            ):null}


</div>
</>
)

}
export default TripsGroup;