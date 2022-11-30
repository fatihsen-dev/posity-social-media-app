import Avatar from "boring-avatars";
import { Provider, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getOnePost, likePost, sendComment } from "../../axios";
import { formatDate } from "../../helpers/dateFormat";
import { RootState } from "../../store";
import { setAllpost } from "../../store/posts/post";

// <pre className='w-full overflow-auto'>{JSON.stringify(post, null, 2)}</pre>
export default function Post() {
   const [post, setPost] = useState<Object | any>(null);
   const { user } = useSelector((state: RootState) => state.userData);
   const { postid } = useParams();
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         try {
            const postResponse = await getOnePost(postid);
            setPost(postResponse.data);
            console.log(postResponse.data);
         } catch (error) {
            console.log(error);
         }
      })();
   }, []);

   const likehandle = async (postid: String) => {
      try {
         const updatedPost = await likePost({ user: user._id, post: postid });
         const postResponse = await getOnePost(postid);
         setPost(postResponse.data);
         dispatch(setAllpost(updatedPost.data));
      } catch (error) {
         console.log(error);
      }
   };
   const commentHandle = async (e: any, post: string, user: string) => {
      e.preventDefault();
      try {
         const commentResponse = await sendComment({
            text: e.target.text.value,
            post,
            user,
         });
         dispatch(setAllpost(commentResponse.data));
         const postResponse = await getOnePost(postid);
         setPost(postResponse.data);
         e.target.text.value = "";
      } catch (error) {
         console.log(error);
         toast.error("Comment send error");
      }
   };

   return (
      <>
         {post && (
            <div className='w-full flex gap-6 py-5 px-10'>
               <div className='bg-lightV1 flex-1 rounded-sm p-3 flex flex-col gap-2.5'>
                  <span>{post.text}</span>
                  <img
                     className='w-full rounded-sm'
                     src={process.env.REACT_APP_API_URL + post.image}
                     alt={post.owner.name}
                  />
                  <div className='border-t-lightV4 border-t pt-2 flex justify-around items-center text-mainDarkV1'>
                     <button
                        onClick={() => likehandle(post._id)}
                        className='flex items-center rounded-sm bg-lightV3 gap-2 pl-2 group'>
                        <span>{post.likes.count}</span>
                        <div className='flex items-center rounded-sm bg-lightV4 px-2 gap-1'>
                           {post.likes.users.indexOf(user._id) !== -1 ? (
                              <BsHeartFill className='text-[#993333] transition-all group-hover:scale-110' />
                           ) : (
                              <BsHeart className='transition-all group-hover:scale-110' />
                           )}
                           <span>Like</span>
                        </div>
                     </button>
                     <button className='flex items-center rounded-sm bg-lightV3 gap-2 pl-2 group'>
                        <span>{post.comments.count}</span>
                        <div className='cursor-pointer flex items-center rounded-sm bg-lightV4 px-2 gap-1'>
                           <BiCommentDetail className='text-xl transition-all group-hover:scale-110' />
                           <span>Comment</span>
                        </div>
                     </button>
                     <button className='flex items-center rounded-sm bg-lightV3 gap-2 pl-2 group'>
                        <span>0</span>
                        <div className='flex items-center rounded-sm bg-lightV4 px-2 gap-1'>
                           <AiOutlineShareAlt className='text-xl transition-all group-hover:scale-110' />
                           <span>Share</span>
                        </div>
                     </button>
                  </div>
               </div>
               <div className='bg-lightV1 flex-[0.5] p-3'>
                  <NavLink
                     to={`/user/${post.owner._id}`}
                     className='flex gap-1.5 items-center'>
                     {post.owner.avatar ? (
                        <img
                           className='w-10 h-10 object-cover rounded-full'
                           src={post.owner.avatar}
                           alt={post.owner.name}
                        />
                     ) : (
                        <div className='overflow-hidden rounded-full'>
                           <Avatar
                              variant='beam'
                              size={40}
                              name={post.owner.name}></Avatar>
                        </div>
                     )}
                     <div className='flex flex-col'>
                        <p className='leading-4'>{post.owner.name}</p>
                        <span className='text-sm text-mainDarkV1/50'>
                           {formatDate(post.createdAt)}
                        </span>
                     </div>
                  </NavLink>
               </div>
               <form
                  onSubmit={(e) => commentHandle(e, post._id, user._id)}
                  className='flex px-3 gap-6 items-start'>
                  <textarea
                     onInput={(e: any) => {
                        e.target.style.height = "52px";
                        e.target.style.height = e.target.scrollHeight + "px";
                     }}
                     placeholder='Send comment...'
                     className='placeholder-mainDarkV2/60 max-h-28 resize-none min-h-0-[100px] bg-lightV3 rounded-sm p-1.5 text-sm flex-1'
                     name='text'></textarea>
                  <button
                     className='ml-auto px-7 py-1 bg-mainDarkV2 text-lightV1 rounded-sm'
                     type='submit'>
                     Send
                  </button>
               </form>
            </div>
         )}
      </>
   );
}