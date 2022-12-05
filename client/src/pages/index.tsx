import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const Main = () => {
   return (
      <div className='flex flex-col w-full h-full'>
         <Navbar />
         <div className='h-full overflow-auto'>
            <div className='container h-full mx-auto'>
               <div className='flex-1'>
                  <Outlet />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Main;
