import React,{useState,useEffect} from "react";
import { Delete, calender,users,tv, food,comment, save,close, edit, rupee,clothing, money,expenses, stocks, bitcoin, card, medical, takeaway, youtube, freelancing, bank, salary, investments, bill, health, education, groceries, travelling, other } from "../../utils/Icon";
import "./date.css"
import moment from "moment";
import { useGlobalContext } from "../../context/globalcontext";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
const RecordItem=({id,title,category,Amount,date,description,time,type,borderColor,amountColor,logoColor,search})=>
{
    const {deleteIncome,deleteExpense,addIncome,addExpense,updateIncome,updateExpense}=useGlobalContext();
    

 

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedAmount, setEditedAmount] = useState(Amount);
    const [editedDate, setEditedDate] = useState(date);
    const [editedCategory, setEditedCategory] = useState(category);
    const [editedTitle, setEditedTitle] = useState(title);
    
    useEffect(() => {
      setDialogOpen(false);
  }, [id]);

const categoryIcons = {
  clothing: clothing,
  money: money,
  expenses: expenses,
  stocks: stocks,
 freelancing:freelancing,
 users:users,
 bitcoin:bitcoin,
 card:card,
 bank:bank,
 food:food,
 medical:medical,
 tv:tv,
 takeaway:takeaway,
 youtube:youtube,
 food:food,
 salary:salary,
 investments:investments,
 bill:bill,
 health:health,
 education:education,
 groceries:groceries,
 travelling:travelling,
 other:other



  // A corresponding icons as needed
};
const logo=categoryIcons[category]


    const deleteItem=()=>
    {
            if(type=='income')
            {
                    deleteIncome(id);     
            }
            else if(type=='expense')
            {
                deleteExpense(id);
            }
            closeDialog();
    }
    const openDialog = () => {
        setDialogOpen(true);
      };
    
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
          date: editedDate,
          category: editedCategory,
          description: editedDescription, 
        }
      
        if(!editedAmount|| !editedCategory || !editedDate || !editedTitle){
          toastr.error("Fill All Detais");
        }
      else{   

                  
                    
                        if(type=='income')
                        {
                                updateIncome(input)
                        }
                        else if(type=='expense')
                        {
                            updateExpense(input);
                        }
                        closeDialog();
        }
      };
    
      
      const containerStyle = {
        borderColor: borderColor || "border-gray-400", // Set default color if borderColor is not provided
      };
    return (
        <>
        <div className={`outer flex m-4 shadow-xl border-b-2 text-xl ${containerStyle.borderColor}`} onClick={openDialog}>
           <div className="flex m-2 w-full">
            <div className={`${logoColor} p-3 mr-4 shadow-md`}>{logo}</div>
            <div>{category}</div>
            </div>
            <div className={`rupee flex m-3 ${amountColor}`}>{rupee}{Amount}</div>
        </div>
        
        {isDialogOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 md:bg-opacity-0">
          <div className={` ${logoColor} p-6 rounded-md shadow-md w-96`}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold">Edit Record</p>
               <p className="text-gray-600 ">{time}</p>
              {search==='search' ?<p className="ml-2">{moment(date).format('DD/MM/YY')}</p>:null}

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
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
            <select
              name="category"
              id="category"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
            >
              <option value="select option">Select Option</option>
              <option value="salary">Salary</option>
              <option value="freelancing">Freelancing</option>
              <option value="investments">Investments</option>
              <option value="stocks">Stocks</option>
              <option value="bitcoin">Bitcoin</option>
              <option value="bank">Bank</option>
              <option value="youtube">Youtube</option>
              <option value="other">Other</option>
            </select>
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


export default RecordItem;