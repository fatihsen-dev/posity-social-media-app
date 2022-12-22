import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Avatar from "./Avatar";
import { setAllpost, setShareData } from "../store/posts/post";
import { formatDate } from "../helpers/dateFormat";
import { sharePost } from "../axios";
import { toast } from "react-hot-toast";

export default function PostShare() {
   const { postShare } = useSelector((state: RootState) => state.postsData);
   const { user } = useSelector((state: RootState) => state.userData);
   const dispatch = useDispatch();

   const cencelHandle = (e: any) => {
      e.preventDefault();
      dispatch(
         setShareData({
            status: false,
            user: { ...postShare.user },
            post: { ...postShare.post },
         })
      );
   };

   const shareHandle = async (e: any) => {
      e.preventDefault();

      try {
         const shareResponse = await sharePost({
            text: e.target.textarea.value,
            owner: user._id,
            postid: postShare.post.id,
         });
         dispatch(setAllpost(shareResponse.data));
         dispatch(
            setShareData({
               status: false,
               user: { ...postShare.user },
               post: { ...postShare.post },
            })
         );
      } catch (error: any) {
         toast.error(error.response.data.message);
      }
   };

   return (
      <div
         style={postShare.status ? { pointerEvents: "auto", opacity: 1 } : {}}
         className='opacity-0 transition-all duration-200 ease-in-out pointer-events-none absolute z-20 inset-0 bg-mainDarkV1/20 grid place-items-center'>
         <form
            onSubmit={shareHandle}
            className='bg-lightV1 rounded-sm p-5 flex flex-col 2xl:w-[700px] 2xl:h-auto md:w-[700px] md:h-auto w-full h-full gap-3'>
            <div className='flex items-center gap-1.5'>
               <Avatar
                  variant='beam'
                  size={35}
                  name={user.name}
                  src={user.avatar}></Avatar>
               <span className='text-lg font-medium'>{user.name}</span>
            </div>
            <textarea
               onInput={(e: any) => {
                  e.target.style.height = "52px";
                  e.target.style.height = e.target.scrollHeight + "px";
               }}
               name='textarea'
               placeholder='Write something...'
               className='placeholder-grayV2 max-h-40 resize-none border rounded-sm py-1 px-1.5 border-grayV2/50'></textarea>
            <div className='border border-grayV2/50 bg-lightV2/80 p-2 rounded-sm flex flex-col gap-2'>
               <div className='flex items-center gap-1'>
                  <Avatar
                     variant='beam'
                     size={35}
                     name={postShare.user.name}
                     src={postShare.user.avatar}></Avatar>
                  <div className='flex flex-col leading-5 translate-y-0.5'>
                     <span className='font-medium'>{postShare.user.name}</span>
                     <span className='text-grayV2 text-xs'>
                        {formatDate(postShare.post.date)}
                     </span>
                  </div>
               </div>
               <span>{postShare.post.text}</span>
               {postShare.post.image && (
                  <img
                     className='rounded-sm max-h-[300px] object-cover'
                     src={process.env.REACT_APP_API_URL + postShare.post.image}
                     alt='Not found'></img>
               )}
            </div>
            <div className='flex items-center gap-2'>
               <button
                  onClick={cencelHandle}
                  className='ml-auto bg-red text-lightV1 px-5 rounded-sm py-1'>
                  Cancel
               </button>
               <button className='bg-navyBlue text-lightV1 px-5 rounded-sm py-1'>
                  Share
               </button>
            </div>
         </form>
      </div>
   );
}
