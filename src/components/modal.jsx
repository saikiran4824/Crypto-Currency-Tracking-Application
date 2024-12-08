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
      }, 1000); 
    }
  }, [isMobile]);

 
  return (
    <>
      {isOpen && (
        <div
  className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 "
>
  <div
   className =  "bg-gray-200 rounded-lg p-4 w-11/12 mx-auto h-2/3 md:w-1/2 md:h-3/4 lg:w-1/3 lg:h-5/6 "
  >
    <h2
      className="text-lg font-bold mb-4 text-cyan"
    >
      Please note:
    </h2>
    
    <p
      className="text-sm text-gray-600"
    >
      Note: This application is optimized for Desktop. Please switch to Desktop mode for an optimal experience. This notification will automatically dismiss when you switch to Desktop mode. Thank you!
    </p>

    <div>
    <p
      className="text-sm font-bold mt-4 text-cyan"
    >
      Working on Mobile UI Optimization
    </p>
    </div>
   
  </div>
</div>
      )}
    </>
  );
}

export default ModalComponent;
