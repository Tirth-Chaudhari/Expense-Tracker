import { useSearchParams } from "react-router-dom";
import { email, groups, user } from "../../../utils/Icon";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/globalcontext";
import ServerErrorGlobal from '../../ServerErrorGlobal';
import './Trip.css'
const Trips=({setActive,setTripId})=>
{
    const {AddTrip,getTrip,Trip}=useGlobalContext();
    const [TripName,setTripName]=useState('');
    // console.log(Trip);
    const tripEntries = Object.entries(Trip);
    // for (const entry of Object.entries(Trip)) {
    //         for (let object of entry[1]) {
    //                 console.log(object.TripName);
    //                 console.log(object.CreateBy.name);
    //                 object.TripMember.forEach(data => {
    //                     for (let value in data) {
    //                         console.log(`${data[value]}`)
    //                     }
    //                 });
    //         }
    //     }      

    useEffect(()=>
    {
        getTrip();

    },[])
    const addTrip1=()=>
    {
            AddTrip(TripName);
            setTripName('');
            
    }
    const changeGroup=(trip)=>
    {
        setTripId(trip);
    }
    const change=()=>
    {
        setActive(6);
    }
return(
    <>
    <div className="overflow-auto TripBottom">
    <div className="overflow-auto ">
        <div class='max-w-md w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden'>
        <div class='flex items-center border-b border-gray-200 py-2 px-4'>
            <input class='w-full bg-gray-100 focus:outline-none focus:bg-white border-transparent focus:border-gray-300 rounded-lg py-2 px-4' value={TripName} type='text' placeholder='Group Name' onChange={(e)=>{ setTripName(e.target.value) }} />
            <button class='flex ml-4  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
            onClick={addTrip1}><div className='mr-1'>{groups}</div><div>{email}</div></button>
        </div>
        </div>
    </div>
             <div className='flex flex-col w-full mt-4'>
                <div className='border-b border-gray-500 p-4'>
                    <span className='text-lg font-bold'>Groups</span>
                </div>
    
   { Object.entries(Trip).map(([key, trips]) => (
        trips.map((trip, index) => (
            <div className='flex items-center mt-8 lg:mt-8 hover:bg-gray-100 cursor-pointer border-gray-300 border-b ml-2' key={index} onClick={() => {                   
                changeGroup(trip);
                change();
            }}>
                <div className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4'>{groups}</div>
                <div className='flex-grow'>
                    <div className='text-lg font-semibold'>{trip.TripName}</div>
                    {/* <div className='text-gray-500'>{member.email}</div> */}
                </div>
            </div>
        ))
    ))}


    </div>
</div>
   
    </>
)

   
}

export default Trips;