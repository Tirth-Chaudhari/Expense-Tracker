import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Budget, friends, graph, groups, note, notes } from "../../utils/Icon";
// import GoogleNote from "./GoogleNotes/GoogleNote";
// import Analysis from "./Analysis";
// import Budget from "./Budget";
// import Groups from "./Groups";
import './bottom-nav.css'
const BottomNavigation = ({ active, setActive }) =>
{
  

 

  return (
    <>

    <nav className="fixed bottom-0 left-0 w-full bg-pink-100 shadow-top z-10 lg:rounded-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-14">
          <button
            className={`${
              active === 1
                ?null
                : "text-gray-500 hover:bg-gray-100"
            }flex justify-center align-center px-3 py-2 rounded-t-lg focus:outline-none `}
            onClick={() => setActive(1)}
          >
            {note}
            <div>Notes</div>
          </button>

          <button
            className={`${
              active === 2
                ? null
                : "text-gray-500 hover:bg-gray-100"
            }flex justify-center align-center px-3 py-2 rounded-t-lg focus:outline-none `}
            onClick={() => setActive(2)}
          >
            {graph}
            <div>Graph</div>
          </button>
          <button
            className={`${
              active === 3
                ?null
                : "text-gray-500 hover:bg-gray-100"
            }flex justify-center align-center px-3 py-2 rounded-t-lg focus:outline-none`}
            onClick={() => setActive(3)}
          >
            {groups}
            <div>Groups</div>
          </button>

          <button
            className={`${
              active === 4
                ? null
                : "text-gray-500 hover:bg-gray-100"
            }flex justify-center align-center px-3 py-2 rounded-t-lg focus:outline-none`}
            onClick={() => setActive(4)}
          >
            {friends}
            <div>Friends</div>
          </button>
        </div>
      </div>
    </nav>
     
    </>
  );
};

export default BottomNavigation;
