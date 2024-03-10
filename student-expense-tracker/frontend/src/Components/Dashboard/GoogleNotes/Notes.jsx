import React, { useState } from 'react';
import { Delete } from '../../../utils/Icon';
import { save } from '../../../utils/Icon';
import { edit } from '../../../utils/Icon';
import { useGlobalContext } from '../../../context/globalcontext';

const Notes=({id,content})=>
{
    
    console.log('called');
    const getRandomColor = () => {
        // Generate a random hex color code
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) 
        {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
        const randomColor = getRandomColor();
        const [editable,setEditable]=useState(false);
        const [content1,setContent]=useState(content);
        const {updateNote,deleteNote}=useGlobalContext();
        const [update,setupdate]=useState(false);
        const onDeleteItem=()=>
        {
               deleteNote(id);
        }
        const onUpdateItem=()=>
        {
              setupdate(!update)
              if(update)
              {
                  const data=
                {
                  content1,
                  id
                }
               
              updateNote(data);
              }
              else{
                if(content!=content1)
                {
                  setContent(content);
                }
              }
              
              setEditable(!editable);

        }
       
        
        const onTextChange=(e)=>
        {
            // content=e.target.value;
          
          setContent(e.target.value);
        }
        
    return(
      <>
           
            {/* <div className='note mt-5 bg-gray-300'  >
                {editable?  <textarea row="" onChange={onTextChange} column="" value={content1} id='area'  maxLength="100"  name='content'
                          placeholder='Write a note...' /> :<p>{content}</p>}
              <div className='crud'>
              <button onClick={onUpdateItem}>{editable ? save:edit}</button>  
                <button onClick={onDeleteItem}>
                    {Delete}
                </button>      
              </div>
            </div> */}
            <div className="note w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-gray-300 p-4 rounded shadow-xl">
  {editable ? (
    <textarea
      rows=""
      onChange={onTextChange}
      cols=""
      value={content1}
      id="area"
      maxLength="100"
      name="content"
      placeholder="Write a note..."
      className="w-full bg-gray-100 border border-gray-300 rounded p-2"
    />
  ) : (
    <p className="whitespace-pre-line">{content}</p>
  )}
  <div className="crud mt-2">
    <button onClick={onUpdateItem} className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {editable ? save : edit}
    </button>
    <button onClick={onDeleteItem} className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
      {Delete}
    </button>
  </div>
</div>

            
      </>
          );
}

export default Notes;