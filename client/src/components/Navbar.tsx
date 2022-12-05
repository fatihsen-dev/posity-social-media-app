import { TbMessageCircle } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { userLogout } from "../store/auth/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Avatar from "boring-avatars";

export default function Navbar() {
   const [searchValue, setSearchValue] = useState("");
   const [users, setUsers] = useState([]);
   const { user, allUser } = useSelector((state: RootState) => state.userData);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const logoutHandle = () => {
      dispatch(userLogout());
      navigate("/login");
      localStorage.removeItem("loginToken");
   };
   const searchHandle = (e: any) => {
      setSearchValue(e.target.value);
      const result = allUser.filter((user: any, index: any) => {
         return (
            index < 6 && user.name.toLowerCase().includes(e.target.value.toLowerCase())
         );
      });
      setUsers(result);
   };
   const focusClear = (e: any) => {
      const body = document.body;
      body.setAttribute("tabindex", "0");
      body.focus();
      body.removeAttribute("tabindex");
      setSearchValue("");
      setUsers(allUser);
   };

   return (
      <div className='bg-mainDarkV1'>
         <div className='container flex items-center justify-between w-full p-2 px-5 2xl:px-0 sm:px-0 h-14 bg-mainDarkV1 text-lightV1'>
            <NavLink to='/' className='text-[26px] font-semibold leading-8 flex-[.2]'>
               Posity
            </NavLink>
            <div tabIndex={0} className='flex-[.4] relative h-auto group'>
               <input
                  value={searchValue}
                  onChange={searchHandle}
                  className='w-full bg-mainDarkV2 rounded-sm text-lightV4 px-2 py-1.5 font-normal placeholder-lightV1/80'
                  type='text'
                  placeholder='Search user...'
               />
               <ul className='absolute left-0 flex-col hidden w-full rounded-b-sm group-focus-within:flex top-8 bg-mainDarkV1'>
                  {users &&
                     users.map((user: any, key) => (
                        <NavLink
                           onClick={focusClear}
                           to={`user/${user._id}`}
                           className='flex items-center gap-3 p-2 transition-colors cursor-pointer hover:bg-mainDarkV2'
                           key={key}>
                           {user.avatar ? (
                              <img
                                 className='object-cover w-6 h-6 rounded-full'
                                 src={user.avatar}
                                 alt={user.name}
                              />
                           ) : (
                              <div className='overflow-hidden rounded-full'>
                                 <Avatar
                                    variant='beam'
                                    size={36}
                                    name={user.name}></Avatar>
                              </div>
                           )}
                           <span className='flex-1'>{user.name}</span>
                        </NavLink>
                     ))}
               </ul>
            </div>
            <div className='flex items-center gap-3 z-10 flex-[.2] justify-end'>
               {/* <NavLink
                  to='message'
                  className='grid transition-colors rounded-full w-9 h-9 bg-mainDarkV2 hover:bg-mainDarkV2/80 place-items-center'>
                  <TbMessageCircle className='text-xl' />
               </NavLink>
               <NavLink
                  to='groups'
                  className='grid transition-colors rounded-full w-9 h-9 bg-mainDarkV2 hover:bg-mainDarkV2/80 place-items-center'>
                  <FaUserFriends className='text-xl' />
               </NavLink> */}
               <Menu as='div' className='relative'>
                  <div>
                     <Menu.Button className='flex text-sm bg-gray-800 rounded-full'>
                        {user.avatar ? (
                           <img
                              className='object-cover rounded-full w-9 h-9'
                              src={user.avatar}
                              alt={user.name}
                           />
                        ) : (
                           <div className='overflow-hidden rounded-full'>
                              <Avatar variant='beam' size={34} name={user.name}></Avatar>
                           </div>
                        )}
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
                     <Menu.Items className='absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white border rounded-md shadow-lg border-lightV1/80 bg-mainDarkV1'>
                        <Menu.Item>
                           {({ active }) => (
                              <NavLink
                                 to={`user/${user._id}`}
                                 className='block px-4 py-2 text-sm font-medium text-gray-700'>
                                 Your Profile
                              </NavLink>
                           )}
                        </Menu.Item>
                        <Menu.Item>
                           {({ active }) => (
                              <button
                                 onClick={logoutHandle}
                                 className='block w-full px-4 py-2 text-sm font-medium text-gray-700 text-start'>
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
