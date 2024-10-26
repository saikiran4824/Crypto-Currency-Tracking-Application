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
  className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-90"
>
  <div
    className="bg-gray-200 rounded-lg shadow-xl p-4 w-11/12 mx-auto md:w-1/2 lg:w-1/3"
  >
    <h1
      className="text-lg font-bold mb-4 text-cyan"
    >
      Please note:
    </h1>
    <h1
      className="text-lg font-bold mt-4 text-cyan"
    >
      Working on Mobile Optimization
    </h1>
    <p
      className="text-sm text-cyan"
    >
      This application is optimized for Desktop. Please switch to Desktop mode for an optimal experience. This notification will automatically dismiss when you switch to Desktop mode. Thank you!
    </p>
    
  </div>
</div>
      )}
    </>
  );
}

export default ModalComponent;