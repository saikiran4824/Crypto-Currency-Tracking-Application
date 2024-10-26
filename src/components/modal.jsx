// ModalComponent.js
import { useState, useEffect } from 'react';

function ModalComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isMobile && (
        <button
          className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleOpen}
        >
          Open Modal
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50"
        >
          <div
            className="bg-white rounded-lg shadow-xl p-4 w-full"
          >
            <h2 className="text-xl font-bold mb-4">
              Please note:
            </h2>
            <p className="text-sm text-gray-500">
              This application is optimized for mobile devices. For a better viewing experience, please switch to mobile mode or access this application on a mobile device.
            </p>
            <button
              className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalComponent;