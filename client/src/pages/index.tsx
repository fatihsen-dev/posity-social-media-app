import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostUpdateComponent from "../components/PostUpdate";

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
         <PostUpdateComponent />
      </div>
   );
};

export default Main;

