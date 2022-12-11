import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import postİmageButton from "../../assets/images/postimagebutton.svg";
import { getAllPost, newPost } from "../../axios";
import { useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { setAllpost } from "../../store/posts/post";
import Avatar from "../../components/Avatar";
import { NavLink } from "react-router-dom";

export default function PostForm() {
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
      } catch (error) {}
   };

   const fileHandle = (e: any) => {
      if (e.target.files[0]) {
         setFileName(URL.createObjectURL(e.target.files[0]));
      }
   };

   return (
      <form
         onSubmit={formHandle}
         className='flex flex-col w-full gap-3 p-3 rounded-sm bg-lightV1'>
         <div className='flex items-center gap-1'>
            <NavLink className='flex items-center gap-1.5' to={`/user/${user._id}`}>
               <Avatar
                  src={user.avatar}
                  variant='beam'
                  size={32}
                  name={user.name}></Avatar>
               <span className='font-medium'>{user.name}</span>
            </NavLink>
            <div className='flex items-center gap-3 ml-auto'>
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
               className='flex-1 h-32 px-2 py-1 font-medium rounded-sm resize-none max-h-72 bg-lightV3 placeholder-grayV1/70'></textarea>
            {filename.length > 0 && (
               <div className='relative p-2 rounded-sm bg-lightV3'>
                  <img
                     className='object-cover rounded-sm w-28 h-28'
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
