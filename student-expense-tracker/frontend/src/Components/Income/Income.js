
import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import Form from "../Form/form";
import { useGlobalContext } from "../../context/globalcontext";
import IncomeItem from "../IncomeItem/IncomeItem";
import { rupee } from "../../utils/Icon";

const Income=()=>
{
    const {addIncome,incomes,deleteIncome,totalIncome,getIncomes}=useGlobalContext();

    const title=incomes.title;
    const date=incomes.date;
    const category=incomes.category;
    const description=incomes.description;
    const amount=incomes.amount;
    const type='income';

   
    useEffect(()=>
    {
        getIncomes()
        const counters = document.querySelectorAll('.value');
        const speed = 200;

        counters.forEach( counter => {
            let data=0;
        const animate = () => {
            const value = +counter.getAttribute('val');
           
            
            const time = value / speed;
            if(data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
                }
                else{
                counter.innerText = value;
                }
             data = +counter.innerText;
            
   }
   
   animate();
});
    },[])
    return(
        <IncomeStyle>
            <InnerLayout>

                    <h1>Incomes</h1>
                    <h2 className="total-income">Total Income:<span>{rupee}</span><span className="value" val={totalIncome()}>{totalIncome()}</span></h2>
                    <div className="income-content">
                        <div className="form-container">
                                <Form/>
                        </div>
                        
                    </div>

            </InnerLayout>

        </IncomeStyle>
    )
        
}

const IncomeStyle=styled.nav`

    width:100%;
    height:100%;
    color: rgba(50, 50, 90, 1);
    display:flex;
    overflow:auto;
    .form-container
    {
        width:100%;  
    }
    .income-content
    {
        display:flex;
        gap:3rem;
        ${'' /* flex:1; */}
            
    }
    .incomes
    {
        width:80%; 
        height:10%
    }
    .total-income
    {
        display: flex;
        justify-content: center;
        align-items: center;
        ${'' /* background: #FCF6F9; */}
        background: rgba(250, 250 , 250, 0.75 );
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 0.5rem;
        margin: .5rem 0;
        font-size: 1.6rem;
        gap: .5rem;
        span{
            font-size: 2.3rem;
            font-weight: 800;
            color:  rgba(50, 205, 50,0.7);
        }
    }
    @media screen and (max-width: 600px) {
       .income-content
       {
            display:flex;
            flex-direction:column;
       }
       .incomes
       {
        width:100%;
       }
    }
    
    
`;   

export default Income;