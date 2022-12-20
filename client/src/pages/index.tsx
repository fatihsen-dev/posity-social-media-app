import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostUpdate from "../components/PostUpdate";
import PostShare from "../components/PostShare";

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
         <PostUpdate />
         <PostShare />
      </div>
   );
};

export default Main;
