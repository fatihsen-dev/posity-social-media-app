import { NavLink } from "react-router-dom";
import { formatDate } from "../../helpers/dateFormat";
import Avatar from "../Avatar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { deletePost } from "../../axios";
import { setAllpost } from "../../store/posts/post";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

interface UserType {
   postOwner: {
      name: string;
      avatar: string;
      _id: string;
   };
   postid: string;
   date: string;
   editHandle: any;
}

export default function User({ postOwner, date, postid, editHandle }: UserType) {
   const { user } = useSelector((state: RootState) => state.userData);
   const token = localStorage.getItem("token");
   const dispatch = useDispatch();

   const deletePostHandle = async () => {
      try {
         const posts = await deletePost({ userid: user._id, postid, token });
         dispatch(setAllpost(posts.data));
      } catch (error) {
         console.log(error);
         toast.error("Gönderi silinemedi");
      }
   };

   return (
      <>
         {postOwner && (
            <div className='flex justify-between'>
               <NavLink
                  to={`/user/${postOwner._id}`}
                  className='flex items-center gap-2 mr-auto select-none'>
                  <Avatar
                     variant='beam'
                     size={32}
                     name={postOwner.name}
                     src={postOwner.avatar}
                  />
                  <div className='flex flex-col justify-center'>
                     <span className='font-medium leading-5'>{postOwner.name}</span>
                     <span className='text-xs text-grayV2'>{formatDate(date)}</span>
                  </div>
               </NavLink>
               {(postOwner._id === user._id || user.admin === true) && (
                  <Menu as='div' className='relative'>
                     <div>
                        <Menu.Button className='text-xl'>
                           <BsThreeDotsVertical />
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
                        <Menu.Items className='absolute right-0 z-10 w-48 p-2 mr-4 -mt-3 origin-top-right bg-white border rounded shadow-lg text-mainDarkV1 border-lightV4 bg-lightV1'>
                           <Menu.Item>
                              <button
                                 onClick={deletePostHandle}
                                 className='block px-4 py-1 w-full text-left rounded-sm hover:bg-lightV4 transition-colors text-[#990000] text-sm font-medium text-gray-700'>
                                 Delete
                              </button>
                           </Menu.Item>
                           <Menu.Item>
                              <button
                                 onClick={editHandle}
                                 className='block w-full hover:bg-lightV4 transition-colors px-4 py-1 rounded-sm text-sm font-medium text-gray-700 text-start'>
                                 Edit
                              </button>
                           </Menu.Item>
                        </Menu.Items>
                     </Transition>
                  </Menu>
               )}
            </div>
         )}
      </>
   );
}
