import { useEffect, useState } from 'react';
import { cancel, note, rupee } from "../../../utils/Icon";
import "../bottom-nav.css";
import { useGlobalContext } from '../../../context/globalcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   
import MemberItem from './MemberItem';
import ServerErrorGlobal from '../../ServerErrorGlobal';
import moment from 'moment';
import { IoReturnDownBackSharp } from "react-icons/io5";

const Member = ({ x_id,setActive }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [title,setTitle]=useState("");
    const {addGroupIncome}=useGlobalContext();
    const {GroupIncome}=useGlobalContext();
    const {GroupExpense}=useGlobalContext();
    const [current,setCurrent]=useState('income');
    const [groupincome,setGroupIncome]=useState(0);
    const [groupexpense,setGroupExpense]=useState(0);
   

    let income=0;
    let expense=0;
    useEffect(()=>
    {
        income=0;
        expense=0;   
        GroupIncome.map((member,index)=>
        {
            if(member.x_id===x_id)
            {
                income+=parseInt(member.amount);
            }
        })
        GroupExpense.map((member,index)=>
        {
            if(member.x_id===x_id)
            {
                expense+=parseInt(member.amount);
            }
        })
        setGroupIncome(income);
        setGroupExpense(expense);
    },[GroupIncome,GroupExpense])
    

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleTitleChange=(e)=>
    {
        setTitle(e.target.value);
    }
    const handleSelectionChange=(e)=>
    {
       setCurrent(e.target.value)

    }

    const AddIncome=()=>
    {
        if(!amount ||!title ||!description)
        {
            toast.info("Please Enter All details !", {
                position: "bottom-center"
              });
              
        }
        else{
        const data={
            amount,
            title,
            description,
            x_id
        }
        addGroupIncome(data);
        handleCloseDialog();
        setAmount(0);
        setDescription('');
        setTitle('');
         }
    }

    const change=()=>
    {
        setActive(4);
    }
    return (
        <>
           <div className='ml-2' onClick={() => { 
                change();
            }}><h2><IoReturnDownBackSharp/></h2></div>
        <ToastContainer/>
        <div className=''>
        <select className="p-2 w-40  m-8 mb-2 border border-gray-300 rounded-md "
             onChange={handleSelectionChange}
            >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>
        </div>
     

        <div className='flex justify-center m-2'>
                {current==='income'? 
                (
                <>
                    <h3 className='text-green-500'>You lent   {rupee}{groupincome}</h3>        
                </>
                 
                ):
                (
                   <>
                        <h3 className='text-red-500'>You borrowed   {rupee}{groupexpense}</h3>
                   </>
                )}
        </div>

        <div className='member overflow-auto'>
            <button
                onClick={handleOpenDialog}
                className="bottom-20 right-1 fixed flex justify-center  w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/6 mx-auto bg-persian-green text-white text-xl rounded-full py-3 shadow-lg  hover:bg-opacity-90 focus:outline-none"
            >
                <div className="mr-4">{note}</div> Add Expense
            </button>
            <div>
            {current==='expense' ? (
             <>
                {Array.isArray(GroupExpense) ? (
                    <div className='flex flex-col m-4  items-center'>
                    {GroupExpense.map((expense, index) => {
                        if (x_id === expense.x_id)
                        {
                                return (
                                    <MemberItem 
                                        key={index} 
                                        id={expense._id}
                                        title={expense.title} 
                                        amount={expense.amount} 
                                        description={expense.description} 
                                        borderColor="border-red-300"
                                        amountColor="text-red-500"
                                        logoColor="bg-red-300"
                                        date={moment(expense.createdAt).format("MMM DD, dddd")}
                                        time={moment(expense.createdAt).format('hh:mm A')}
                                        type='expense'
                                    />
                                    );
                            }
                            return null; // Return null if the condition is false
                        })}
                    </div>
                     ):(
                    <div className=''>
                             <ServerErrorGlobal/>
                    </div>
                )}</>) : null}
                
                {current==='income' ? (
                    <div className='flex flex-col m-4  items-center'>
                {Array.isArray(GroupIncome) && current==='income' ?(
                    
                    GroupIncome.map((income, index) => {
                     if (x_id === income.x_id)
                      {
                            return (
                                <MemberItem 
                                    key={index} 
                                    id={income._id}
                                    title={income.title} 
                                    amount={income.amount} 
                                    description={income.description} 
                                    borderColor="border-green-300"
                                    amountColor="text-green-500"
                                    logoColor="bg-green-300"
                                    date={moment(income.createdAt).format("MMM DD, dddd")}
                                    time={moment(income.createdAt).format('hh:mm A')}
                                    type='income'
                                />
                                );
                        }
                        return null; // Return null if the condition is false
                    })):
                    (
                    <div className=''>
                             <ServerErrorGlobal/>
                    </div>
                )}</div>):null}
                
           
            </div>
            {/* Dialog Box */}
            {isDialogOpen && (
                <div class="dialogbox flex fixed z-10 shadow-lg inset-y-0 rounded-xl overflow-y-auto">
         <div class="bg-white px-4 pt-2 pb-4 sm:p-6 sm:pb-4 w-full sm:max-w-lg m-auto">
            <div class="sm:flex sm:items-start">
            <div class="mt-1 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div class="cross">
                    <div onClick={handleCloseDialog}>{cancel}</div>
                </div>
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Add Expense</h3>
                <div class="mt-2">
                    <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input type="number" id="amount" value={amount} onChange={handleAmountChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" placeholder="Amount" />
                    <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input type="text" id="title" value={title} onChange={handleTitleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" placeholder="Title" />
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <input type="text" id="description" value={description} onChange={handleDescriptionChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" placeholder="Description" />
                    <button onClick={AddIncome} class="bg-persian-green hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto">Add</button>
                </div>
            </div>
        </div>
    </div>
</div>


              
            )}
</div>

        </>
    );
};

export default Member;
