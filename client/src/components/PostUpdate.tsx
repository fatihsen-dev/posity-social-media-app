import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Avatar from "./Avatar";
import { formatDate } from "../helpers/dateFormat";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { setUpdatePost } from "../store/posts/post";

export default function PostUpdate() {
   const { postUpdate } = useSelector((state: RootState) => state.postsData);
   const dispatch = useDispatch();

   const { user, post } = postUpdate;
   const [text, setText] = useState("");

   const cencelHandle = () => {
      dispatch(setUpdatePost({ ...postUpdate, status: false }));
   };

   useEffect(() => {
      setText(post.text);
   }, [post.text]);

   return (
      <div
         style={postUpdate.status ? { pointerEvents: "auto", opacity: 1 } : {}}
         className='opacity-0 transition-all duration-200 ease-in-out pointer-events-none absolute z-20 inset-0 bg-mainDarkV1/20 grid place-items-center'>
         <div className='bg-lightV1 rounded-sm p-5 flex flex-col gap-3 w-2/5'>
            <div className='flex items-center gap-1.5'>
               <Avatar src={user.avatar} size={32} variant='beam' name={user.name} />
               <div className='flex flex-col leading-4'>
                  <span className='font-medium'>{user.name}</span>
                  <span className='text-xs text-grayV2'>{formatDate(post.date)}</span>
               </div>
               <button
                  onClick={cencelHandle}
                  className='ml-auto bg-red text-lightV1 rounded-sm p-1 text-xl'>
                  <IoMdClose />
               </button>
            </div>
            <form className='flex flex-col gap-3'>
               <textarea
                  className='resize-none p-1 border border-lightV4 rounded-sm h-28'
                  onChange={(e) => setText(e.target.value)}
                  value={text}
               />
               {post.image && (
                  <img
                     className='rounded-sm'
                     src={process.env.REACT_APP_API_URL + post.image}
                     alt='Resim bulunamadı'
                  />
               )}
               <div className='flex'>
                  <button className='ml-auto px-10 py-1.5 rounded-sm bg-navyBlue hover:bg-navyBlue/90 transition-colors text-lightV1'>
                     Edit
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
