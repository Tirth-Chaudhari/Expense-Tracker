// import React,{useState} from 'react';


// const CreateNote=(props)=>
// {
    
//         const addEvent=(event)=>
//         {
            
//             event.preventDefault();
//              const titleInput = document.getElementById("title");
//              const areaInput = document.getElementById("area");

//             const newNote = {
//                 title: titleInput.value,
//                 content: areaInput.value,
//             };

//             props.passNote(newNote);
//             const t=document.getElementById("title");
//             const a=document.getElementById("area");
//             t.value="";
//             a.value="";
//             t.focus();


//         };
//     return(
//       <>
//             <div className='main_note'>
//                 <form>
//                     <input type='text' id='title'  name='title' placeholder='Title'></input>
//                     <textarea row="" column="" id='area'  maxLength="100"  name='content'
//                      placeholder='Write a note...' ></textarea>
//                     <button onClick={addEvent}>
//                         ➕
//                     </button>

//                 </form>
               
//             </div>
            
//       </>
//           );
// }

// export default CreateNote;