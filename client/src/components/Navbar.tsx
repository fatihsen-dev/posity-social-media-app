import { TbMessageCircle } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { userLogout } from "../store/auth/user";
import { useDispatch } from "react-redux";

export default function Navbar() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const logoutHandle = () => {
      dispatch(userLogout());
      navigate("/login");
      localStorage.removeItem("loginToken");
   };

   return (
      <div className='bg-mainDarkV1'>
         <div className='container h-14 flex w-full items-center justify-between p-2 bg-mainDarkV1 text-lightV1'>
            <NavLink to='/' className='text-[26px] font-semibold leading-8'>
               Posity
            </NavLink>
            <input
               className='flex-[.4] bg-mainDarkV2 rounded-sm text-lightV4 px-2 py-1.5 font-normal placeholder-lightV1/80'
               type='text'
               placeholder='Search user...'
            />
            <div className='flex items-center gap-3'>
               <NavLink
                  to='message'
                  className='w-9 h-9 bg-mainDarkV2 rounded-full grid place-items-center'>
                  <TbMessageCircle className='text-xl' />
               </NavLink>
               <NavLink
                  to='groups'
                  className='w-9 h-9 bg-mainDarkV2 rounded-full grid place-items-center'>
                  <FaUserFriends className='text-xl' />
               </NavLink>
               <Menu as='div' className='relative'>
                  <div>
                     <Menu.Button className='flex rounded-full bg-gray-800 text-sm'>
                        <img
                           className='h-9 w-9 rounded-full'
                           src='https://avatars.githubusercontent.com/u/20463385?v=4'
                           alt=''
                        />
                     </Menu.Button>
                  </div>
                  <Transition
                     as={Fragment}
                     enter='transition ease-out duration-100'
                     enterFrom='transform opacity-0 scale-95'
                     enterTo='transform opacity-100 scale-100'
                     leave='transition ease-in duration-75'
                     leaveFrom='transform opacity-100 scale-100'
                     leaveTo='transform opacity-0 scale-95'>
                     <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg border border-lightV1/80 bg-mainDarkV1'>
                        <Menu.Item>
                           {({ active }) => (
                              <NavLink
                                 to='user/fatih'
                                 className='block font-medium px-4 py-2 text-sm text-gray-700'>
                                 Your Profile
                              </NavLink>
                           )}
                        </Menu.Item>
                        <Menu.Item>
                           {({ active }) => (
                              <button
                                 onClick={logoutHandle}
                                 className='w-full block text-start font-medium px-4 py-2 text-sm text-gray-700'>
                                 Sign out
                              </button>
                           )}
                        </Menu.Item>
                     </Menu.Items>
                  </Transition>
               </Menu>
            </div>
         </div>
      </div>
   );
}
