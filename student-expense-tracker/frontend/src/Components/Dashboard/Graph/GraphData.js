import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'; // Importing necessary components from recharts library
import { useGlobalContext } from '../../../context/globalcontext';
import moment from 'moment';

const GraphData = () => {
    const { incomes, expenses } = useGlobalContext();
    const [graphType, setGraphType] = useState('IncomeOverview'); // State to track selected graph type
    const [pieChartData, setPieChartData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [totalIncomeExpense, setTotalIncomeExpense] = useState(0);
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [width1,setWidth]=useState();
    const [height1,setHeight]=useState();
    const [radius1,setRadius]=useState();
    useEffect(() => {
        const calculateCategoryTotals = (data) => {
            const categoryTotals = {};
            data.forEach(item => {
                if (categoryTotals[item.category]) {
                    categoryTotals[item.category].push(item);
                } else {
                    categoryTotals[item.category] = [item];
                }
            });
            return categoryTotals;
        };

        const getChartData = () => {
            if (graphType === 'IncomeOverview') {
                return calculateCategoryTotals(incomes);
            } else if (graphType === 'ExpenseOverview') {
                return calculateCategoryTotals(expenses);
            }
            return {};
        };

        const categoryTotals = getChartData();
        const pieChartData = Object.keys(categoryTotals).map(category => ({
            name: category,
            value: categoryTotals[category].reduce((acc, cur) => acc + cur.amount, 0)
        }));
        setPieChartData(pieChartData);
        const total = pieChartData.reduce((acc, cur) => acc + cur.value, 0);
        setTotalIncomeExpense(total);
        const isMobileDevice = window.innerWidth <= 450 
        const isMobileDevice1 = window.innerWidth <= 550 && window.innerWidth >450
        const isMobileDevice2= window.innerWidth <= 1100 && window.innerWidth >550
        let width;
        let height;
        let radius;
        if(isMobileDevice)
        {
            width=400;
            height=500;
            radius=80;

        }
        else if(isMobileDevice1)
        {
            width=450;
            height=450;
            radius=80;
        }
        else if(isMobileDevice2)
        {
            width=600;
            height=600;
            radius=120;

        } 
        else
        {
            console.log("width");
            width=800;
            height=800;
            radius=150;
        }
        console.log(width);
        setWidth(width);
        setHeight(height);
        setRadius(radius);
        
    }, [graphType, incomes, expenses]);

    useEffect(() => {
        if (selectedCategory) {
            const categoryData = graphType === 'IncomeOverview' ? incomes : expenses;
            const filteredData = categoryData.filter(item => item.category === selectedCategory);
            setCategoryDetails(filteredData);
        } else {
            setCategoryDetails([]);
        }
    }, [selectedCategory, graphType, incomes, expenses]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF0000', '#4C4CFF', '#FF7F7F'];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
        <div className='overflow-y-auto mb-16'>
            <div className='md:flex justify-center flex-wrap'>
                <div>
                    <select value={graphType} onChange={(e) => setGraphType(e.target.value)} className="p-2 w-44 h-fit ml-8 border border-gray-300 rounded-md mb-4 ">
                        <option value="IncomeOverview">IncomeOverview</option>
                        <option value="ExpenseOverview">ExpenseOverview</option>
                    </select>
                </div>
                {pieChartData.length!=0 ? (<PieChart  width={width1}
                                                      height={height1}
                                                      >
                    <Pie
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={radius1}
                        fill="#8884d8"
                        label={({ name }) => name} // Set the label to the category name
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend
                        align="bottom"
                        horizontalAlign="middle"
                        layout="horizontal"
                        content={(props) => {
                            const { payload } = props;
                            return (
                                <ul>
                                    {payload.map((entry, index) => (
                                        <li key={`item-${index}`} style={{ color: entry.color }}>
                                            <span>{entry.value}</span>: {entry.payload.value}
                                        </li>
                                    ))}
                                </ul>
                            );
                        }}
                    />
                </PieChart>):
                <div className='text-xl m-2'>Add Category to View Details</div>}
            </div>
            <div className='w-full'>
                {pieChartData.length !=0 && <h3 className='flex justify-center'>Select a category to view details:</h3>}
        <div className="category-chart ">
         {pieChartData.map((entry, index) => {
        const percentage = ((entry.value / totalIncomeExpense) * 100).toFixed(2);
        const fillWidth = `${percentage}%`;
        return (
            <div key={index} className="category-bar flex justify-center items-center mb-4" onClick={() => handleCategoryClick(entry.name)}>
                <div className="category-name mr-4 text-lg">{entry.name}</div>
                <div className="category-bar-container w-full md:w-1/2 bg-gray-200 rounded">
                    <div className="category-bar-fill h-6 rounded" style={{ width: fillWidth, backgroundColor: COLORS[index % COLORS.length] }}></div>
                </div>
                <div className="percentage ml-2">{percentage}%</div>
            </div>
        );
    })}
    </div>


            </div>

            {selectedCategory && (
                <div>
                    <h3 className='flex justify-center' >Details for {selectedCategory}:</h3>
                    <div className='flex justify-center'>

                    <ul className=''>
                        {categoryDetails.map((item, index) => (
                            <li key={index} className={`flex justify-center shadow-lg mb-4 px-2 rounded-xl ${graphType==='IncomeOverview'?'bg-green-300':'bg-red-300'} w-fit mr-2 py-4`}>
                            Date: {moment(item.date).format('DD,MMM YYYY')},  Amount: {item.amount}
                            </li>
                        ))}
                    </ul>
            </div>

                </div>
            )}
        </div>
    </>
    );
};

export default GraphData;
