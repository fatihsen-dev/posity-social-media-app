import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import postİmageButton from "../../assets/images/postimagebutton.svg";
import { getAllPost, newPost } from "../../axios";
import { useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { setAllpost } from "../../store/posts/post";
import Avatar from "boring-avatars";
import { NavLink } from "react-router-dom";

export default function Post() {
   const { user } = useSelector((state: RootState) => state.userData);
   const [filename, setFileName] = useState("");
   const dispatch = useDispatch();
   const inputRef = useRef<any>();
   const textareaRef = useRef<any>();

   const formHandle = async (e: any) => {
      e.preventDefault();
      const formData = new FormData();

      try {
         formData.append("image", e.target.image.files[0]);
         formData.append("text", e.target.text.value);
         formData.append("owner", user._id);
         await newPost(formData);
         setFileName("");
         inputRef.current.value = "";
         textareaRef.current.value = "";
         const postResponse = await getAllPost();
         dispatch(setAllpost(postResponse.data));
      } catch (error) {
         console.log(error);
      }
   };

   const fileHandle = (e: any) => {
      if (e.target.files[0]) {
         setFileName(URL.createObjectURL(e.target.files[0]));
      }
   };

   return (
      <form
         onSubmit={formHandle}
         className='bg-lightV1 p-3 flex flex-col gap-3 rounded-sm w-full'>
         <div className='flex gap-1 items-center'>
            <NavLink className='flex items-center gap-1' to={`/user/${user._id}`}>
               {user.avatar ? (
                  <img
                     src={user.avatar}
                     alt={user.name}
                     className='w-9 h-9 rounded-full'
                  />
               ) : (
                  <div className='overflow-hidden rounded-full'>
                     <Avatar variant='beam' size={36} name={user.name}></Avatar>
                  </div>
               )}
               <span className='text-lg font-medium'>{user.name}</span>
            </NavLink>
            <div className='flex ml-auto items-center gap-3'>
               <input
                  onChange={fileHandle}
                  ref={inputRef}
                  className='hidden'
                  accept='image/*'
                  id='imageInput'
                  type='file'
                  name='image'
               />
               <label htmlFor='imageInput' className='cursor-pointer'>
                  <img className='w-7 h-7' src={postİmageButton} alt={postİmageButton} />
               </label>
               <button
                  type='submit'
                  className='bg-navyBlue text-lightV1 px-3 py-0.5 rounded'>
                  Share
               </button>
            </div>
         </div>
         <div className='flex gap-2'>
            <textarea
               onInput={(e: any) => {
                  e.target.style.height = "128px";
                  e.target.style.height = e.target.scrollHeight + "px";
               }}
               ref={textareaRef}
               name='text'
               placeholder='Write something...'
               className='resize-none max-h-72 flex-1 rounded-sm bg-lightV3 px-2 py-1 placeholder-grayV1/70 font-medium h-32'></textarea>
            {filename.length > 0 && (
               <div className='relative bg-lightV3 p-2 rounded-sm'>
                  <img
                     className='w-28 h-28 rounded-sm object-cover'
                     src={filename}
                     alt={filename}
                  />
                  <AiFillDelete
                     onClick={() => {
                        setFileName("");
                        inputRef.current.value = "";
                     }}
                     className='text-2xl cursor-pointer absolute top-3 right-3 bg-lightV3/40 rounded-sm text-[#993030]'
                  />
               </div>
            )}
         </div>
      </form>
   );
}
