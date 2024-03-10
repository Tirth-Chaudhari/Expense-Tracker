
import React,{useEffect, useState} from 'react'
import CreateNote from './CreateNote';
import Notes from './Notes';
import "./note.css";
import styled from 'styled-components';
import { note, plus, search } from '../../../utils/Icon';
import { useGlobalContext } from '../../../context/globalcontext';


const GoogleNote = ()=>
{

  const[addItem,setAddItem]=useState([]);

  const {getNote,Note,addNote}=useGlobalContext();
  console.log(Note+'at that time');
  const [filterNote,setFilterNote]=useState([]);
  const [isSearching,setSearching]=useState(false);
  const addNote1=()=>
  {
        addNote();
  }
  useEffect(()=>
  { 
        getNote();
  },[])

  // const addNote=(note)=>
  // {
  //   setAddItem((prevItems)=>
  //   {
  //     const updatedItems = [...prevItems, note];
  //     return updatedItems;
  //   })
  
  // };
  let query='';
  const changNote=(event)=>
  {
      query=event.target.value;
    const filterN=  Note.filter((note) => 
      {
        const lowerCaseQuery = query.toLowerCase();
          
          if(lowerCaseQuery.trim()==='')
          {
            setSearching(false)
            return note;
          }else if(note.description.toLowerCase().includes(lowerCaseQuery))
          {       
            setSearching(true)
              return note;
          }
      });
      setFilterNote(filterN);
  }
  // const onDelete=(id)=>
  // {
  //     setAddItem((Item)=>
  //         Item.filter((current,index)=>
  //         {
  //             return index!==id;   
  //         })
        
  //     );
  // }
// console.log(query)


  return(

    
      <GNote> 
        <MyNote> 
         
          <div className='search'>
          {search}
           <input type='text' onChange={changNote} placeholder='Search Note...' />
          </div>
        </MyNote>
        <Content>
           <div className='member overflow-auto'>
            <button
                onClick={addNote1}
                className="bottom-20 right-1 fixed flex justify-center  w-1/12 h-1/12 px-4 py-2  bg-persian-green text-white text-lg rounded-full  shadow-lg  hover:bg-opacity-90 focus:outline-none"
            >
                <div className="">{plus}</div>
            </button>
            </div>
        {isSearching===false && Array.isArray(Note) &&  Note.map((note,index)=>
        {
          {/* console.log(note) */}
            return(
            
              <Notes
                // key={index}
                id={note._id} 
                content={note.description}

            />

            );
        })}
        {
          isSearching === true && Array.isArray(filterNote) &&  filterNote.map((note,index)=>
        {
            return(
            
              <Notes
                // key={index}
                id={note._id} 
                content={note.description}

            />

            );
        })}
        
      </Content>
    </GNote>
        

    );
}


const GNote=styled.nav`
  width:100%;
  height:100%;
  overflow-y:auto;

`;
const MyNote=styled.nav`
    display:flex;
    flex-direction:column;
    align-items:center;
    .search
    {
	
        background: white;
        border: 1px solid #ddd;
        border-radius: 100px;
        color: #505060;
        box-shadow: 0 3px 7px 0 rgba(0,0,0,.15);
        margin:1rem;
        width:45%;
        height:3rem;
        display:flex;
        justify-content:flex-start;
        align-items:center;
        @media screen and (max-width: 1100px)
        {
          width:90%;
        }

      i
      {
        margin-left:1rem;
        
      }
      input
      {
        margin-left:1rem;
        border:none;
        width:100%;
        height:100%;
        border-radius: 100px;
        &:focus {
          outline: none;
          /* Example: add a box shadow on focus */
        }
      }
      
    }
   
`;
const Content=styled.nav`
  display:flex;
  justify-content:space-around;
  flex-wrap:wrap;
  

`;


export default GoogleNote;
