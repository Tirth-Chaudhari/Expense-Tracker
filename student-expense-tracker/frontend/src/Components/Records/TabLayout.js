
import React from 'react';
import { search } from '../../utils/Icon';

const TabLayout = (props) => {
  const handleTabChange = (tab) => {
    props.setActive(tab);
  };

  return (
    <div className="flex justify-around w-full   mt-4">
      <button
        onClick={() => handleTabChange('daily')}
        className={`py-2 px-4 ${props.activeTab === 'daily' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-700'} rounded`}
      >
        Daily
      </button>
      <button
        onClick={() => handleTabChange('monthly')}
        className={`py-2 px-4 ${props.activeTab === 'monthly' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-700'} rounded`}
      >
        Monthly
      </button>
      <button
        onClick={() => handleTabChange('yearly')}
        className={`py-2 px-4 ${props.activeTab === 'yearly' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-700'} rounded`}
      >
        Yearly
      </button>
      <button
        onClick={() => handleTabChange('search')}
        className={`py-2 px-4 ${props.activeTab === 'search' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-700'} rounded`}
      >
        {search} Search
      </button>

    
    </div>
  );
};

export default TabLayout;