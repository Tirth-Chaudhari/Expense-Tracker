import { clothing, money,expenses, stocks } from "../../utils/Icon";
import moment from 'moment';

const Data=
[
    {
        title:"Food",
        category:"expenses",
        Amount:"50",
        date:"23/01/24",
        description:"Get Ruppe",
        time: "02:30 PM",
        type:"income",
        logo:expenses
    },
    {
        title: 'Clothing',
        category: 'stocks',
        Amount: '30',
        date: '23/01/24',
        description: 'Shopping at the mall',
        time:"01:30 PM",
        type:"income",
        logo:stocks
    },
    {
        title: 'Clothing',
        category: 'money',
        Amount: '30',
        date: '23/01/24',
        description: 'Shopping at the mall',
        time: "12:30 PM",
        type:"income",
        logo:money
    },
    {
        title: 'Clothing',
        category: 'expenses',
        Amount: '30',
        date: '23/01/24',
        description: 'Shopping at the mall',
        time: "12:00 PM",
        type:"expense",
        logo:expenses
    },
    {
        title: 'Transportation',
        category: 'food',
        Amount: '20',
        date: '23/01/24',
        description: 'Bus fare to work',
        time: "10:45 AM",
        type:"income",
        logo:clothing
    },
    {
        title: 'Entertainment',
        category: 'money',
        Amount: '40',
        date: '20/01/24',
        description: 'Movie night with friends',
        time: "07:15 PM",
        type:"income",
        logo:money
    },
    {
        title:'Lunch',
        category:"clothing",
        Amount:"50",
        date:"23/01/24",
        description:"Get Ruppe",
        time: "08:15 PM",
        type:"expense",
        logo:clothing
    },
    {
        title: 'Dinner',
        category: 'clothing',
        Amount: '30',
        date: '22/01/24',
        description: 'Shopping at the mall',
        time: "10:30 AM",
        type:"income",
        logo:clothing   
    },
    {
        title: 'Entertainment',
        category: 'money',
        Amount: '40',
        date: '24/12/23',
        description: 'Movie night with friends',
        time: "07:15 PM",
        type:"income",
        logo:money
    },
    {
        title:'Lunch',
        category:"clothing",
        Amount:"50",
        date:"10/01/23",
        description:"Get Ruppe",
        time: "08:15 PM",
        type:"income",
        logo:clothing
    },
    {
        title: 'Dinner',
        category: 'clothing',
        Amount: '30',
        date: '10/01/24',
        description: 'Shopping at the mall',
        time: "10:30 AM",
        type:"income",
        logo:clothing
    },
    {
        title: 'Dinner',
        category: 'clothing',
        Amount: '30',
        date: '10/01/23',
        description: 'Shopping at the mall',
        time: "10:30 AM",
        type:"income",
        logo:clothing
    },
    {
        title: 'Dinner',
        category: 'clothing',
        Amount: '30',
        date: '10/01/23',   
        description: 'enjoying',
        time: "10:00 AM",
        type:"income",
        logo:clothing
    },
        {title: 'Dinner',
        category: 'clothing',
        Amount: '30',
        date: '10/01/24',   
        description: 'Shopping at the mall',
        time: "10:00 AM",
        type:"income",
        logo:clothing
    },
    {
    title: 'Dinner',
    category: 'clothing',
    Amount: '500',
    date: '10/01/23',   
    description: 'Shopping at the mall',
    time: "10:00 AM",
    type:"expense",
    logo:clothing
   }


    

];


const parseDateTime = (date, time) => {
    const dateTimeString = `${date} ${time}`;
    return moment(dateTimeString, 'DD/MM/YYYY hh:mm A');
  };
  
  // Get the current date and time using moment
  const currentDate1 = moment();
  
  // Sort the Data array based on proximity to the current date and time
  Data.sort((a, b) => {
    const dateATime = parseDateTime(a.date, a.time);
    const dateBTime = parseDateTime(b.date, b.time);
  
    // Calculate the time difference between the current date and the record's date and time
    const timeDifferenceA = Math.abs(currentDate1.diff(dateATime));
    const timeDifferenceB = Math.abs(currentDate1.diff(dateBTime));
  
    return timeDifferenceA - timeDifferenceB;
  });

export default Data;
















