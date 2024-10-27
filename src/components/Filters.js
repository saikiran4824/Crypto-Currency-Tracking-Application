import { useState, useEffect } from 'react';
import Search from "./Search";

function Filters() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        className="w-full h-auto md:h-12 border-2 border-gray-100 rounded-lg
        flex flex-col md:flex-row items-center justify-center md:justify-between p-4 md:p-2 space-y-2 md:space-y-0"
      >
        <Search />
        
          <p className=" text-cyan text-lg">
            (click on the coin🪙 to see details and graphs, click on star⭐ to save)
          </p>
        </div>
      
    </>
  );
};

export default Filters;
