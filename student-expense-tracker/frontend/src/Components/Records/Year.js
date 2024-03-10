import moment from "moment";
import React,{useEffect,useState} from "react";


const Year=({YearData})=>
{

    const [monthlySummary, setMonthlySummary] = useState([]);
    let Balance=0;
    useEffect(() => {
        // Filter data for the year 2024
        // Function to calculate total income and total expenses for a given month
        const calculateTotals = data =>
         {
            const totals = { income: 0, expenses: 0 };
            
            data.forEach(entry => {
                if (entry.type === "income") {
                    totals.income += parseFloat(entry.amount);
                } else if (entry.type === "expense") {
                    totals.expenses += parseFloat(entry.amount);
                }
            });
          
            return totals;
        };

        // Group data by month
        const groupedData = {};
        YearData.forEach(entry => 
          {
            const date1=moment(entry.date)
            const month = date1.month();
            if (!groupedData[month]) {
                groupedData[month] = [];
            }
            groupedData[month].push(entry);
        });
        const show={
            '0':'Jan',
            '1':'Feb',
            '2':'Mar',
            '3':'Apr',
            '4':'May',
            '5':'Jun',
            '6':'Jul',
            '7':'Aug',
            '8':'Sep',
            '9':'Oct',
            '10':'Nov',
            '11':'Dec'
        }
        // Generate summary for each month
        const summary = Object.entries(groupedData).map(([month, monthData]) => {
            const totals = calculateTotals(monthData);   
            Balance+=(totals.income-totals.expenses);
            
            return (
                <div key={month} className="flex justify-around lg:m-8 shadow-xl bg-green-200 border-b-2 border-gray-400 text-xl">
                    <p>{show[month]}</p>
                    <p>{totals.income}</p>
                    <p>{totals.expenses}</p>
                    <p>{totals.income-totals.expenses}</p>       
                </div>
                
            );
        });

        setMonthlySummary(summary);
    }, [YearData]);

    return(
        <div className="mb-12">
            <div className="flex md:justify-around lg:m-8 justify-evenly">
                        <p className="text-blue-500">Month</p>
                        <p className="text-blue-500"> Income (Credit)</p>
                        <p className="text-blue-500">Expense (Debit)</p>
                        <p className="text-blue-500">Balance</p>
            </div>
            {monthlySummary.length!=0 && monthlySummary.map((summary, index) => (
                <React.Fragment key={index}>
                    {summary}
                </React.Fragment>
            ))}
        </div>
    )

   

}
export default Year;