import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Avatar from "./Avatar";
import { formatDate } from "../helpers/dateFormat";
import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { setAllpost, setProfileData, setUpdatePost } from "../store/posts/post";
import { getOneUser, updatePost } from "../axios";
import { useParams } from "react-router-dom";

export default function PostUpdate() {
   const { postUpdate } = useSelector((state: RootState) => state.postsData);
   const disapatch = useDispatch();
   const dispatch = useDispatch();
   const imgRef = useRef<any>();
   const { userid } = useParams();

   const { user, post } = postUpdate;
   const [text, setText] = useState("");
   const [imgSrc, setImgSrc] = useState<string | null>("");

   const cencelHandle = () => {
      dispatch(setUpdatePost({ ...postUpdate, status: false }));
   };

   const updateHandle = async (e: any) => {
      e.preventDefault();
      const formData = new FormData();
      if (imgRef.current.files[0]) {
         formData.append("image", imgRef.current.files[0]);
      } else {
         formData.append("image", `${imgSrc}`);
      }
      formData.append("text", text);
      formData.append("userid", user.id);
      formData.append("postid", post.id);
      formData.append("token", user.token);
      try {
         const posts = await updatePost(formData);
         dispatch(setAllpost(posts.data));
         dispatch(setUpdatePost({ ...postUpdate, status: false }));

         if (userid) {
            const rofileDataResponse = await getOneUser(userid);
            disapatch(setProfileData(rofileDataResponse.data));
         }
      } catch (error) {
         console.log(error);
      }
   };

   const removeImageHandle = (e: any) => {
      e.preventDefault();
      setImgSrc("");
   };

   const fileHandle = (e: any) => {
      if (e.target.files[0]) {
         setImgSrc(URL.createObjectURL(e.target.files[0]));
      }
   };

   useEffect(() => {
      setText(post.text);
      if (post.image) {
         setImgSrc(`${process.env.REACT_APP_API_URL}${post.image}`);
      } else {
         setImgSrc("");
      }
   }, [post]);

   return (
      <div
         style={postUpdate.status ? { pointerEvents: "auto", opacity: 1 } : {}}
         className='opacity-0 transition-all duration-200 ease-in-out pointer-events-none absolute z-20 inset-0 bg-mainDarkV1/20 grid place-items-center'>
         <div className='bg-lightV1 rounded-sm p-5 flex flex-col gap-3 2xl:w-[700px] 2xl:h-auto md:w-[700px] md:h-auto w-full h-full'>
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
               {imgSrc && (
                  <img
                     className='rounded-sm max-h-[300px] object-cover'
                     src={imgSrc}
                     alt='Resim bulunamadı'
                  />
               )}
               <div className='flex justify-between items-center'>
                  <div className='flex items-center justify-between h-full gap-2'>
                     <div>
                        <input
                           onChange={fileHandle}
                           ref={imgRef}
                           className='hidden'
                           accept='image/*'
                           id='updateImage'
                           type='file'
                           name='image'
                        />
                        <label
                           className='px-10 h-9 grid place-items-center border border-lightV4 rounded-sm'
                           htmlFor='updateImage'>
                           Select File
                        </label>
                     </div>
                     {imgSrc && (
                        <button
                           onClick={removeImageHandle}
                           className='bg-red text-lightV1 px-4 h-9 grid place-items-center rounded-sm'>
                           Remove Image
                        </button>
                     )}
                  </div>
                  <button
                     onClick={updateHandle}
                     className='ml-auto px-10 py-1.5 rounded-sm bg-navyBlue hover:bg-navyBlue/90 transition-colors text-lightV1'>
                     Edit
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
