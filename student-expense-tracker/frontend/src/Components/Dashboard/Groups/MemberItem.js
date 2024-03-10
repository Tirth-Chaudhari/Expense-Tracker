
import React, { useState } from "react";
import { Delete, edit, food,rupee,close, expenses, transactions, trend } from "../../../utils/Icon";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { useGlobalContext } from "../../../context/globalcontext";
const MemberItem=({id,title,amount,description,borderColor,amountColor,logoColor,date,time,type})=>
{
    const {updateGroupData,deleteGroupData}=useGlobalContext();
    const [isDialogOpen,setDialogOpen]=useState(false);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedAmount, setEditedAmount] = useState(amount);
    // const [editedDate, setEditedDate] = useState(date);
    const [editedTitle, setEditedTitle] = useState(title);
    const deleteItem=()=>
    {
                const data=
                {
                    id:id
                }
                deleteGroupData(data);
                closeDialog()
    }
 
      const closeDialog = () => {
        setDialogOpen(false);
      };
    
      const handleEdit = () => 
      {
 
                const input=
                {
                id:id,
                title: editedTitle,
                amount: editedAmount,
                description: editedDescription, 
                }
            
                if(!editedAmount|| !editedTitle){
                    toast.info("please enter All data!", {
                        position: "top-center"
                    });
                }
            else{   

                        
                            
                                updateGroupData(input);
                                closeDialog();
                }
      };

    const openDialog=()=>
    {
        setDialogOpen(true);
    }
    return (
        <>
        <ToastContainer/>
            <div className={`outer flex border-b-2 shadow-xl justify-center text-xl m-4 ${borderColor}`} onClick={openDialog}>
            <div className="flex m-2">
                <div className={`p-3 mr-4 shadow-md  ${logoColor}`}>{type==='income' ? trend:expenses}</div>
                <div>{title?title:null}</div>   
                </div>
                <div className={`rupee flex m-3 ${amountColor}`}>{rupee}{amount?amount:null}</div>
                    
            </div>

        {isDialogOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 md:bg-opacity-0">
          <div className={` ${logoColor} p-6 rounded-md shadow-md w-96`}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold">Edit Record</p>
               <p className="text-gray-600 ">{date} {time}</p>
            </div>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
            />
     
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleEdit}
              >
                {edit}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={deleteItem}
              >
                {Delete}
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={closeDialog}
              >
                {close}
              </button>
            </div>
          </div>
        </div>
      )}
              


        </>
       
        
        )
}


export default MemberItem;