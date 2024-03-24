import './App.css';
import Navigation from './Navigation/Nav';
import { useState,useMemo, useEffect } from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expense/Expenses';
import styled from 'styled-components';
import { MainLayout } from './styles/Layout';
import { useGlobalContext } from './context/globalcontext';
import bg from './img/bg.png';
import Orb from './Components/Orb/Orb';
import { Routes,Route } from 'react-router-dom';
import Record from './Components/Records/Record';
import TabLayout from './Components/Records/TabLayout';
import { act } from 'react-dom/test-utils';

const App=()=>
{
  const [active,setActive]=useState(1);
  const [activeTab, setActiveTab] = useState('daily');
    const {getIncomes,getExpenses,getMember}=useGlobalContext();
    const [isSidebarOpen,setIsSidebarOpen]=useState(false)
    const isSidebarOpenFunc=()=>
    {
        setIsSidebarOpen(!isSidebarOpen);
        
    }   
     const handleToggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
      isSidebarOpenFunc();
    };
    useEffect(()=>
    {
        getIncomes();
        getExpenses();
    },[])
    const global=useGlobalContext();
    const orbMemo = useMemo(() => {
      return <Orb />
    },[])

   
    const displayData=()=>
    {
        switch(active)
          {
              case 1:
                  return <Dashboard/>
              case 2:
                return <Record activeTab={activeTab}/>
              case 3:
                return <Income/>
              case 4:
                return <Expenses/>
                  
          }

    }

    console.log(activeTab+"iN MAIN");
    return(
      <>
        <AppStyled>
          {/* {orbMemo} */}
           <MainLayout bg={bg} >
          
            <Navigation active={active} setActive={setActive} isSidebarOpenFunc={isSidebarOpenFunc} isSidebarOpen={isSidebarOpen} handleToggleSidebar={handleToggleSidebar}/>
                 
            <main onClick={handleToggleSidebar}>  
                <div className='logo1 mb-6 flex flex-col items-center z-10 sticky top-0  justify-center rounded-2xl h-32 shadow-md'>
                    <div><h3 className='font-bold'>My Money</h3></div>
                    {active==2 ? <TabLayout setActive={setActiveTab}
                      activeTab={activeTab}
                    />:null}
                </div>
                {displayData()}
            </main> 
            </MainLayout> 
        </AppStyled>
      </>
    )
} 

const AppStyled = styled.div`
  height:100vh;
  position: relative;
  .logo1
  {
      
     background:rgb(240, 230, 235);
     border:rgb(240, 230, 235);
                  
}
  main{
    display:flex;
    flex-direction:column;
    flex:1;
    background:rgba(250, 250, 250, 0.75);
    ${'' /* overflow-y:auto; */}
    ${'' /* background: ${props => (props.isSidebarOpen ?  'rgba(250, 250, 250, 0.75)':'background: rgba(0, 0, 0, 1)')}; */}

    border: 3px solid #FFFFFF;
    border-top:rgb(240, 230, 235);
    backdrop-filter: blur(4.5px);
    border-radius: 2rem;
    &::-webkit-scrollbar{
      width: 0;
      
    }
    @media screen and (max-width: 1100px)
     {
      border-radius: 0; /* Set border radius to 0 on mobile devices */
      width:100%;
     }

     
  }
   
`;
export default App;
