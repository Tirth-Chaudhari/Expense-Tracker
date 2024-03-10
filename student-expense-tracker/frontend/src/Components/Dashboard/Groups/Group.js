
import { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../../../context/globalcontext';
import { email, logout, search, user } from '../../../utils/Icon';
import '../GoogleNotes/note.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   
import ServerErrorGlobal from '../../ServerErrorGlobal';
import { success } from 'toastr';

const Group=({setActive,setxid})=>
{
    const [email2,setEmail]=useState('');
    const {addMember,getMember,Members,deleteMember}=useGlobalContext();
    const {getGroupIncome,getGroupExpense}=useGlobalContext();
    const [isDialogOpen,setDialogOpen]=useState(false);
    const [deleteMemberName,setDeleteMemberName]=useState('');
    const [deleteId,setDeleteId]=useState(null);   
    let success='';

    useEffect(()=>
    {
        
       const func=async()=>
       {
        await getMember().then((result) => {

            success='success';

        }).catch((err) => {
            success=''
        });;
        await getGroupIncome().then((result) => {
                
            success='success';

        }).catch((err) => {
            success=''
        });;
        await getGroupExpense().then((result) => {
                
            success='success';

        }).catch((err) => {
            success=''
        });;
      
       }
       func();
        
       
       console.log('some time');
        
    },[])

   
   const onClose=()=>
   {
        setDeleteMemberName('');
        setDeleteId(null);
        setDialogOpen(false);
   }
   const onDelete=()=>
   {
        deleteMember(deleteId)
        onClose();
        setDeleteId(null);

   }
    
    const change=()=>
    {
        setActive(5);
    }
    const changeMember=(member)=>
    {
        setxid(member.x_id);
    }
    const addMember1=async ()=>
    {
        
        if(email2==='')
        {
            toast.info("Please Enter email !", {
                position: "top-center"
              });
        }
        else
        {
             addMember(email2)
             setEmail('');     
        }  
    } 

        return(
         <div className='w-full h-full overflow-auto flex-col mt-4 align-center mb-16'>
                <div>
                    <div class='max-w-md w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden'>
                    <div class='flex items-center border-b border-gray-200 py-2 px-4'>
                        <input class='w-full bg-gray-100 focus:outline-none focus:bg-white border-transparent focus:border-gray-300 rounded-lg py-2 px-4' value={email2}type='text' placeholder='Add member by email id' onChange={(e)=>{setEmail(e.target.value)}} />
                        <button class='flex ml-4  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
                        onClick={addMember1}><div className='mr-1'>{user}</div><div>{email}</div></button>
                    </div>
                    </div>
                </div>

            
                <div className='flex flex-col w-full mt-4'>
                <div className='border-b border-gray-500 p-4'>
                    <span className='text-lg font-bold'>Friends</span>
                </div>
                 
                                  
                    {Array.isArray(Members) && success==='' ?(
                        Members.map((member, index) => {
                        return (
                            <div className='flex items-center mt-8 lg:mt-8 hover:bg-gray-100 cursor-pointer border-gray-300 border-b ml-2' onClick={() => {                   
                                changeMember(member);
                                change();
                            }}
                            onContextMenu={(event) => {
                                    event.preventDefault(); 
                                    setDeleteMemberName(member.name);                 
                                    setDialogOpen(true);
                                    setDeleteId(member._id)
                                    
                                     }}
                            onLongPress={(event) => {
       
                                   setDialogOpen(true);
                                     }}
                                onTouchStart={(event) => {
                                        const startTime = new Date().getTime();
                                        const longPressTime = 500; 
                                    const timer = setTimeout(() => {
                                        if (new Date().getTime() - startTime >= longPressTime) {
                                            event.preventDefault(); 
                                            event.target.click(); 
                                        }
                                    }, longPressTime);


                                    event.target.dataset.longPressTimer = timer;
                                }}
                                onTouchEnd={(event) => {
                                    clearTimeout(event.target.dataset.longPressTimer);
                                }}>

                                <div className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4'>{user}</div>
                                <div className='flex-grow'>
                                    <div className='text-lg font-semibold'>{member.name}</div>
                                    <div className='text-gray-500'>{member.email}</div>
                                </div>
                            </div>
                        );
                    })
                    ) : (
                    <div className=''>
                             <ServerErrorGlobal/>
                    </div>
                )}
                        <div className='flex items-center mt-8 lg:mt-8  hover:bg-gray-100 cursor-pointer border-gray-300 border-b ml-2' onClick={()=>{ 
                            
                            change()}} >
                            <div className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4' >{user}</div>
                            <div className='flex-grow'>
                                <div className='text-lg font-semibold'>for mobile users</div>
                                <div className='text-gray-500'>Android5454@gmail</div>
                            </div>
                        </div>
                            
                
                <ToastContainer />

                {/* Add more user entries as needed */}
            </div>


            {isDialogOpen  && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full max-w-lg mx-auto my-6">
            <div className="relative flex flex-col w-full rounded-lg shadow-lg outline-none focus:outline-none bg-red-300">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-3xl font-semibold">
                  You Want Delete Member {deleteMemberName} ?
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/* Body */}
              <div className="relative p-6 flex justify-around">
                {/* <p className="my-4 text-blueGray-500 text-lg leading-relaxed"> */}
                <button
                  className="text-white bg-blue-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded-2xl hover:bg-opacity-10"
                  type="button"
                  onClick={onDelete}
                >
                    Yes
                </button>
                <button
                  className="text-white bg-blue-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded-2xl hover:bg-opacity-10"
                  type="button"
                  onClick={onClose}
                >
                  No
                </button>
                {/* </p> */}
              </div>
              {/* Footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                <button
                  className="text-white bg-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded-2xl"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
       )}

            
            
        </div>

        )

}

export default Group;