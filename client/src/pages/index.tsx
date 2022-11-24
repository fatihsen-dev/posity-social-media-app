import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const Main = () => {
   return (
      <div className='flex flex-col h-full w-full'>
         <Navbar />
         <div className='overflow-auto h-full'>
            <div className='container mx-auto h-full'>
               <div className='flex-1'>
                  <Outlet />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Main;
