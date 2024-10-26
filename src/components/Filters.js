
import Search from "./Search";



const Filters = () => {
  

  //  removed filters to stop making too many api calls


  return (
    <div
  className="w-full h-auto md:h-12 border-2 border-gray-100 rounded-lg
      flex flex-col md:flex-row items-center justify-center md:justify-between p-4 md:p-2 space-y-2 md:space-y-0"
>
  <Search />  
</div>

  );
};

export default Filters;
