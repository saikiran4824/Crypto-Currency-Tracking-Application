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

  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        setIsOpen(true);
      }, 2000); 
    }
  }, [isMobile]);

 
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        >
          <div
            className="bg-white rounded-lg shadow-xl p-4 w-full"
          >
            <h2
              className="text-xl font-bold mb-4 text-cyan"
            >
              Please note:
            </h2>
            <p
              className="text-sm text-gray-100"
            >
              Note: This application is optimized for Desktop. Please switch to Desktop mode for an optimal experience. Mobile version underway. This notification will automatically dismiss when you switch to Desktop mode. Thank you! </p>
           
          </div>
        </div>
      )}
    </>
  );
}

export default ModalComponent;
