import React, { useState } from 'react';
import './Serve.css'
const App = () => {
  const [isDialogOpen, setDialogOpen] = useState(true);

  const onClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
    

      {/* Network Error Dialog Box */}
      {isDialogOpen && (
        <div className="ServerError fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full max-w-lg mx-auto my-6">
            <div className="relative flex flex-col w-full rounded-lg shadow-lg outline-none focus:outline-none bg-red-300">
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-3xl font-semibold">
                  Network Error
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  There was a network error. Please try again later.
                </p>
              </div>
              {/* Footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                <button
                  className="text-white bg-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded-2xl"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
