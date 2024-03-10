// import React from "react";

// import styled from "styled-components";
// import { bitcoin, book, calender, card, circle, clothing, comment, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, youtube } from "../../utils/Icon";
// import moment from "moment";

// const IncomeItem=({title,amount,date,category,description,deleteItem,type})=>
// {
    
//     const date1=moment(date).format('DD/MM/YYYY');
//     // const check=()=>
//     // {
//     //     if(!(props.length===0))
//     //     {
//             // return(
//             //         <Container>
//             //         <div className="logo"> 
//             //             <p>{categoryIcon()}</p>
//             //         </div>
                   
//             //         <div className="content">
//             //                 <h3>{props.incomes.title}</h3>
//             //                 <div className="inner-content">
//             //                     <p>${props.incomes.amount}</p>
//             //                     <p>{calender}{date}</p>
//             //                     <p>{comment}{props.incomes.description}</p>
                                
//             //            </div>
//             //         </div>
//             //     <div className="btn">
//             //         <button>{trash}</button>
//             //         </div>
                    
//             // </Container>
//             // )
//     //     }
//     //     else
//     //     {
//     //         console.log(props+"at props");
//     //     }
//     // }
//     const categoryIcon = () =>{
//         switch(category) 
//         {
//             case 'salary':
//                 return money;
//             case 'freelancing':
//                 return freelance
//             case 'investments':
//                 return stocks;
//             case 'stocks':
//                 return users;
//             case 'bitcoin':
//                 return bitcoin;
//             case 'bank':
//                 return card;
//             case 'youtube':
//                 return youtube;
//             case 'other':
//                 return piggy;
//             default:
//                 return ''
//         }
//     }
//     const expenseIcon = () => {
//         switch (category) {
//             case 'education':
//                 return book;
//             case 'groceries':
//                 return food;
//             case 'health':
//                 return medical;
//             case 'subscriptions':
//                 return tv;
//             case 'takeaways':
//                 return takeaway;
//             case 'clothing':
//                 return clothing;
//             case 'travelling':
//                 return freelance;
//             case 'other':
//                 return circle;
//             default:
//                 return ''
//         }
//     }
//     return(<>
//              <Container>
//                     <div className="logo"> 
//                         <p>{type=='income' ? categoryIcon():expenseIcon()}</p>
//                     </div>
                   
//                     <div className="content">
//                             <h3>{title}</h3>
//                             <div className="inner-content">
//                                 <p>${amount}</p>
//                                 {/* {props.incomes.amount} */}
//                                 <p>{calender}{date1}</p>
//                                 <p>{comment}{description}</p>
                                
//                        </div>
//                     </div>
//                 <div className="btn">
//                     <button
//                         onClick={deleteItem}>{trash}</button>
//                     </div>
                    
//             </Container> 
         
             
//         </>)
// }


// const Container=styled.nav`
//     display:flex;
//     border: 2px solid #FFFFFF;
//     justify-content:space-around;
//     border-radius:20px;
//     background: rgba(250, 250 , 250, 0.75 );
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     ${'' /* background: #FCF6F9; */}
//     gap:2rem;
//     width:100%;
//     .logo
//     {
//         ${'' /* justify-content:center;
//         algin-item:center; */}
//         border: 2px solid #FFFFFF;
//         background: #F5F5F5;
//         border-radius:1.25rem;
//         width:4.375rem;
//         height:4.375rem;
//         margin-top:0.625rem;
        
//         i
//         {
//             margin:0% 15%;
//             font-size:2.6rem; 
//         }
//     }
//     .content
//     {
        
//         h3
//         {
//             margin:3%;
            
//         }
//         ${'' /* padding:1rem 0rem; */}
//         .inner-content
//         {
//             ${'' /* margin:1rem 0rem; */}
//             ${'' /* padding:1rem 0rem; */}
//             gap:1rem;   
//             display:flex;
            
//         }
//     }
//     .btn
//     {
//         justify-content:flex;
//         align-item:bottom;
//         margin-top:auto;
//         ${'' /* margin-right:5px; */}
//         margin-bottom:.3125rem;

//     button
//     {
     
//         border-radius:50%;
//         height:2rem;
//         width:2rem;
//         background: #001f3f;
        
//         i
//         {
//             margin-top:6px;
//             color:#fff;
//         }
        

//     }
//     }
   
   

// `;
// export default IncomeItem;