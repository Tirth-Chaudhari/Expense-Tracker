import React, { useEffect, useState } from "react";
import { bank, freelancing, search, youtube } from "../../utils/Icon";
import { Delete, calender,users,tv, food,comment, save,close, edit, rupee,clothing, money,expenses, stocks, bitcoin, card, medical, takeaway } from "../../utils/Icon";
import moment from 'moment';
import RecordItem from "./RecordItem";
import './date.css'
import Data from "./Data";
import { useGlobalContext } from "../../context/globalcontext";

const Search=()=>
{


    const {totalData,incomes,expenses}=useGlobalContext();
    totalData.sort((a, b) => {
        const momentA = moment(a.date);
        const momentB = moment(b.date);
    
        if (momentA.month() !== momentB.month()) {
          return momentB.month() - momentA.month();
        } else if (momentA.date() !== momentB.date()) {
          return momentB.date() - momentA.date();
        } else {
          return momentB.hour() * 3600 + momentB.minute() * 60 + momentB.second() -
            (momentA.hour() * 3600 + momentA.minute() * 60 + momentA.second());
        }
      });

    const [query,setQuery]=useState('')
    const [filteredData,setFilterData]=useState([])
    const handleChange=(event)=>
    {
        setQuery(event.target.value)
    }
   
    
  useEffect(()=>
  {

    const filteredData1 = totalData.filter((entry) => 
    {

          const lowerCaseQuery = query.toLowerCase();
          if(entry.category.toLowerCase().includes(lowerCaseQuery))
          {
            return entry;
          }
          else
          {
            return false;
          }

    });
    setFilterData(filteredData1);
    console.log('added new one');

  },[query],[incomes],[expenses],[totalData],[])




    
const categoryIcons = {
    clothing: clothing,
    money: money,
    expenses: expenses,
    stocks: stocks,
   freelancing:freelancing,
   users:users,
   bitcoin:bitcoin,
   card:card,
   youtube:youtube,
   bank:bank,
   food:food,
   medical:medical,
   tv:tv,
   takeaway:takeaway,
  
    // A corresponding icons as needed
  };
    
    

    return (
        <div className="w-full flex  flex-col justify-center items-center">       
                <div class="search bg-white border border-gray-300 rounded-full text-gray-700 shadow-md m-4 w-full h-12 flex justify-start items-center">
                        {search}
                        <input type="text" class="ml-4 border-none w-full h-full rounded-full focus:outline-none mr-8" onChange={handleChange} placeholder="Search Record..." />
                 </div>  
            
               
                    
                        {filteredData.map((entry,index) =>
                                {
                                    let borderColor=null
                                    let logoColor=null
                                    let amountColor=null
                                    if(entry.type=='expense')
                                    { borderColor='border-red-300'
                                        logoColor='bg-red-300'
                                        amountColor="text-red-500"
                                    }
                                    else
                                    {
                                        borderColor='border-green-300'
                                        logoColor='bg-green-300'
                                        amountColor="text-green-500"
                                    }
                                    {/* {entry.type==='income'? borderColor='border-green-200':null}
                                    {entry.type==='income'? logoColor='border-green-200':null} */}
                                    const logo=categoryIcons[entry.category]
                                    return(
                                      <RecordItem
                                            key={entry._id}
                                            id={entry._id}
                                            title={entry.title}
                                            category={entry.category}
                                            Amount={entry.amount}
                                            date={entry.date}
                                            description={entry.description}
                                            logo={entry.logo}
                                            time={moment(entry.createdAt).format('hh:mm A')}
                                            type={entry.type}
                                            borderColor={borderColor}
                                            amountColor={amountColor}
                                            logoColor={logoColor}
                                            search="search"
                                        /> 
                              
                                      

                                                      
                                        
                                     )
                              
                               })
                        }
                    
               
      </div>


        
                
    )
}

export default Search;
