
import './date.css';
import React, { useState,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import styled from 'styled-components';
import Data from './Data';
import { format } from 'date-fns';
import { useGlobalContext } from '../../context/globalcontext';
import RecordItem from './RecordItem';
import { money, rupee } from '../../utils/Icon';
import Year from './Year';
import Search from './Search';
import { DefaultLegendContent } from 'recharts';

const Record = ({activeTab}) => 
{
  const {incomes,expenses,getIncomes,getExpenses,totalData}=useGlobalContext();
  


   incomes.sort((a, b) => {
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
  
  expenses.sort((a, b) => {
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
  useEffect(()=>
  {
      getIncomes();
      getExpenses();
  },[])
  let [totalIncome, setTotalIncome] = useState(0);
  let [totalExpense, setTotalExpense] = useState(0);
  let [totalMonthIncome,setMonthIncome]=useState(0);
  let [totalMonthExpense,setMonthExpense]=useState(0);
  let [totalDayMonthIncome,setDayMonthIncome]=useState(0);
  let [totalDayMonthExpense,setDayMonthExpense]=useState(0);
  const [selectedDate, setSelectedDate] = useState(moment().toDate());
  const handleDateChange = (date) =>  {
    setSelectedDate(date);
    setCurrentDate(moment(date).format("MMM DD, dddd"))
    setTotalExpense(0);
    setTotalIncome(0);
    setDayMonthExpense(0);
    setDayMonthIncome(0);

  };

  const [currentDate, setCurrentDate] = useState(""); 


  const [selectedMonth, setSelectedMonth] = useState(moment().format("YYYY-MM"));
  const handleMonthChange = (month) => {

    setSelectedMonth(month);
    setMonthIncome(0);
    setMonthExpense(0);

  };
  const [selectedYear, setSelectedYear] = useState(moment().year())
  const [YearData, setYearData] = useState([]);
  
  useEffect(()=>
  {
    const YearData1 = totalData.filter((entry) => 
    {
      const date1=moment(entry.date).format("YYYY");
      return date1==selectedYear;
      
   });
   setYearData(YearData1);
  },[selectedYear,totalData],[])

  const handleYearChange=(year)=>
  {

      setSelectedYear(moment(year).format('YYYY'));
     
  }


  const [current, setCurrent] = useState("income");
  const handleSelectionChange = (e) => {
    setCurrent(e.target.value);
    setTotalExpense(0);
    setTotalIncome(0);
    setMonthIncome(0);
    setMonthExpense(0);
  };
  

  useEffect(() => {
    const updateDate = () => {
      const formattedDate = moment().format("MMM DD, dddd");
      setCurrentDate(formattedDate);
      
    };
    updateDate(); // Initial update
     const intervalId = setInterval(updateDate, 1000 * 60); // Update every minute
     


  }, []);



  const filteredIncomeData = incomes.filter((entry) => 
  {
      let d1 = moment(entry.date).format('YYYY-MM-DD')
      let d2 = moment(selectedDate).format('YYYY-MM-DD')
      const areDatesEqual = moment(d1).isSame(d2 ,'day');

      if(areDatesEqual)
      {
        totalIncome+=parseFloat(entry.amount);
        return true;
      }
           
  })
   const filteredExpenseData = expenses.filter((entry) =>
   {
        let d1 = moment(entry.date).format('YYYY-MM-DD')
        let d2 = moment(selectedDate).format('YYYY-MM-DD')
        const areDatesEqual = moment(d1).isSame(d2 ,'day');
        if(areDatesEqual)
        {
          totalExpense+=parseFloat(entry.amount);
          return true;
        }
   
   })
  
  const MonthlyIncomeData =incomes.filter((entry) =>
  {
    
    let d1 = moment(entry.date).format('YYYY-MM-DD')
    let d2 = moment(selectedMonth).format('YYYY-MM-DD')
    const areDatesEqual = moment(d1).isSame(d2 ,'month');
    if(areDatesEqual)
    {
      totalMonthIncome+=parseFloat(entry.amount);
      return true;
    }
      
  });
  const MonthlyExpenseData=expenses.filter((entry) => 
  {
    let d1 = moment(entry.date).format('YYYY-MM-DD')
    let d2 = moment(selectedMonth).format('YYYY-MM-DD')
    const areDatesEqual = moment(d1).isSame(d2 ,'month');
      if(areDatesEqual)
      {
        totalMonthExpense+=parseFloat(entry.amount);
        return true;
      }
   
  });


  
  let lastDisplayedDate=null;
  let totalDayMonthIncome1=0;
  let totalDayMonthExpense1=0;

   
 


  return (
        <>    
  <Container>

     <Date className='flex justify-center text-center'>

          { activeTab==='daily' ? 
                <DatePicker 
                className='w-full p-2 border border-gray-300 rounded-md mb-4'
                id='date' 
                placeholderText='Enter Date'
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              /> :null}
   

        {activeTab==='monthly'? 
              <DatePicker id='date'
                className='w-full p-2 border border-gray-300 rounded-md mb-4'
                  selected={moment(selectedMonth, "YYYY-MM").toDate()}
                  placeholderText='Enter Month'
                  onChange={handleMonthChange}
                  dateFormat="yyyy-MM"
                  showMonthYearPicker
                />:null}

          {activeTab==='yearly'? 
              <DatePicker id='date'
                className='w-full p-2 border border-gray-300 rounded-md mb-4'
                  selected={moment(selectedYear,'yyyy-mm').toDate()}
                  placeholderText='Enter Year'
                  onChange={handleYearChange}
                  dateFormat="yyyy"
                  showYearPicker
                />:null}
              </Date> 
        
        

           {activeTab==='daily' || activeTab==='monthly' ?
           <select className="p-2 w-40 ml-8 border border-gray-300 rounded-md mb-4 "
            onChange={handleSelectionChange}
            value={current}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            </select>:null
           }
      
        {current==='income' && (activeTab==='monthly' || activeTab==='daily') ?
                <Incomes> 
                      
                      {activeTab=='daily'? 
                          <h1 className='text-2xl font-bold mb-4'>Income  {rupee}{totalIncome.toFixed(2)}</h1>:
                          <h1 className='text-2xl font-bold mb-4'>Income  {rupee}{totalMonthIncome.toFixed(2)}</h1>
  
                      }
                      {activeTab==='daily'?
                           
                              
                              <Date className='flex justify-center text-center '>
                                <p className='text-lg font-bold text-gray-800 border-b-2 border-red-500'>{currentDate}</p>
                              </Date>: null              
                      }


                      {activeTab==='daily' ?
                              
                            filteredIncomeData.map((entry,index) =>
                            {
                                  console.log(entry._id+"heeeee");
                                  return(
                                    <RecordItem
                                          id={entry._id}
                                          title={entry.title}
                                          category={entry.category}
                                          Amount={entry.amount}
                                          date={entry.date}
                                          description={entry.description}
                                          logo={entry.logo}
                                          time={moment(entry.createdAt).format('hh:mm A')}
                                          type={entry.type}
                                          borderColor="border-green-300"
                                          amountColor="text-green-500"
                                          logoColor="bg-green-300"
                                      /> 
                                  )
                                  
                                    
                            })
                    :
                      MonthlyIncomeData.map((entry, index) => 
                        {
                          const currentDate = moment(entry.date).format('MMM DD, dddd');
                          totalDayMonthIncome+=parseFloat(entry.amount); 
                          if (currentDate !== lastDisplayedDate) 
                          {

                              lastDisplayedDate = currentDate;
                              if(index!==0)
                              {
                                  totalDayMonthIncome1=totalDayMonthIncome-parseFloat(entry.amount);
                                  totalDayMonthIncome=parseFloat(entry.amount);
                              }
                            return (
                              <React.Fragment key={index}>
                                {index===0 ?  null:<h2 className='text-lg mb-6 w-full'>Income  {rupee}{totalDayMonthIncome1.toFixed(2)}</h2>
                                }
                                <Date className='flex justify-center text-center'>
                                  <p className='text-lg font-bold text-gray-800 border-b-2 border-red-500'>{currentDate}</p>
                                </Date>
                                
                                <RecordItem
                                  id={entry._id}
                                  title={entry.title}
                                  category={entry.category}
                                  Amount={entry.amount}
                                  date={entry.date}
                                  description={entry.description}
                                  logo={entry.logo}
                                  time={moment(entry.createdAt).format('hh:mm A')}
                                  type={entry.type}
                                  borderColor='border-green-300'
                                  amountColor='text-green-500'
                                  logoColor='bg-green-300'
                                />
                              </React.Fragment>

                            );
                            }
                            else
                            {
                              return(
                                <>
                                <RecordItem
                                    id={entry._id}
                                    title={entry.title}
                                    category={entry.category}
                                    Amount={entry.amount}
                                    date={entry.date}
                                    description={entry.description}
                                    logo={entry.logo}
                                    time={moment(entry.createdAt).format('hh:mm A')}
                                    type={entry.type}
                                    borderColor={current === 'income' ? 'border-green-300' : 'border-red-300'}
                                    amountColor={current === 'income' ? 'text-green-500' : 'text-red-500'}
                                    logoColor={current === 'income' ? 'bg-green-300' : 'bg-red-300'}
                                  />

                                  </>

                              );
                              
                            }
                     } )
                  }

                  {activeTab==='monthly' && MonthlyIncomeData.length>0 ? <h2 className='text-lg mb-6 w-full'>Income  {rupee}{totalDayMonthIncome.toFixed(2)}</h2>:null}
              </Incomes>:null}
                    


         {current==='expense' && (activeTab==='monthly' || activeTab==='daily')?
              <Expense>

                      {activeTab=='daily'? 
                          <h1 className='text-2xl font-bold mb-4'>Expense  {rupee}{totalExpense.toFixed(2)}</h1>:
                          <h1 className='text-2xl font-bold mb-4'>Expense  {rupee}{totalMonthExpense.toFixed(2)}</h1>
  
                      }
                      {activeTab==='daily'?
                              <Date className='flex justify-center text-center'>
                                <p className='text-lg font-bold text-gray-800 border-b-2 border-green-500'>{currentDate}</p>
                              </Date>:null
                       }


                      {activeTab==='daily' ?
                              
                            filteredExpenseData.map((entry,index) =>
                            {

                                  return(
                                    <RecordItem
                                    id={entry._id}
                                    title={entry.title}
                                    category={entry.category}
                                    Amount={entry.amount}
                                    date={entry.date}
                                    description={entry.description}
                                    time={moment(entry.createdAt).format('hh:mm A')}
                                    type={entry.type}
                                    borderColor="border-red-300"
                                    amountColor="text-red-500"
                                    logoColor="bg-red-300"
                                    /> 
                                  )
                                  
                                    
                            })
                    :
                      MonthlyExpenseData.map((entry, index) => 
                      {
                          const currentDate = moment(entry.date).format('MMM DD, dddd');
                          totalDayMonthExpense+=parseFloat(entry.amount);  
                          if (currentDate !== lastDisplayedDate) {

                              lastDisplayedDate = currentDate;
                              if(index!==0)
                              {
                                  totalDayMonthExpense1=totalDayMonthExpense-parseFloat(entry.amount);
                                  totalDayMonthExpense=parseFloat(entry.amount);
                              }
                            return (
                              <React.Fragment key={index}>
                                {index===0 ?  null:<h2 className='text-lg mb-6 w-full'>Expense  {rupee}{totalDayMonthExpense1.toFixed(2)}</h2>
                                }
                                <Date className='flex justify-center text-center'>
                                  <p className='text-lg font-bold text-gray-800 border-b-2 border-green-500'>{currentDate}</p>
                                </Date>
                                <RecordItem
                                  id={entry._id}
                                    title={entry.title}
                                    category={entry.category}
                                    Amount={entry.amount}
                                    date={entry.date}
                                    description={entry.description}
                                    time={moment(entry.createdAt).format('hh:mm A')}
                                    type={entry.type}
                                    borderColor="border-red-300"
                                    amountColor="text-red-500"
                                    logoColor="bg-red-300"
                                /> 
                              </React.Fragment>
                            );
                            }
                            else
                            {
                              return(
                              <RecordItem
                                   id={entry._id}
                                    title={entry.title}
                                    category={entry.category}
                                    Amount={entry.amount}
                                    date={entry.date}
                                    description={entry.description}
                                    logo={entry.logo}
                                    time={moment(entry.createdAt).format('hh:mm A')}
                                    type={entry.type}
                                    borderColor={current === 'income' ? 'border-green-300' : 'border-red-300'}
                                    amountColor={current === 'income' ? 'text-green-500' : 'text-red-500'}
                                    logoColor={current === 'income' ? 'bg-green-300' : 'bg-red-300'}
                                  />
                              );
                            }
                     } )
                  }
                {activeTab==='monthly' && MonthlyExpenseData.length>0 ? <h2 className='text-lg mb-6'>Expense  {rupee}{totalDayMonthExpense.toFixed(2)}</h2>:null}

      </Expense>:null}

      {activeTab==='yearly'?
                      
        <Year YearData={YearData}/>:null                
                  
      }
      {activeTab==='search'?
          <Search/>:null
      }


    </Container>
    </>
    
  );
};

export default Record;



const Container=styled.nav`

    height:100%;
    overflow:auto;
      h2
        {
          display:flex;
          justify-content:flex-end;
          width:60%;
          i
          {
            margin-top:.28rem;
            margin-left:.2rem;
          }

        }
     
  
  @media screen and (max-width: 1000px)
     {
          h2
        {
         
          width:90%;

        }
     }
`;


const Date=styled.nav`
        margin:1rem;
        #date
        {

                font-size:1.4rem;
                border-radius:0.4rem;
                margin:1rem;
        
                
        }

`;



const Incomes=styled.nav`
    
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    margin-bottom:2rem;
  
   
`;

const Expense=styled.nav`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:screen;
`;
