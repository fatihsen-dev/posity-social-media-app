import Avatar from "../../components/Avatar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getOnePost, likePost, sendComment } from "../../axios";
import { formatDate, formatDateMin } from "../../helpers/dateFormat";
import { FindUser } from "../../helpers/find";
import { RootState } from "../../store";
import { setAllpost } from "../../store/posts/post";

export default function Post() {
   const [post, setPost] = useState<Object | any>(null);
   const { user, allUser } = useSelector((state: RootState) => state.userData);
   const { postid } = useParams();
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         try {
            const postResponse = await getOnePost(postid);
            setPost(postResponse.data);
         } catch (error) {}
      })();
   }, []);

   const likehandle = async (postid: String) => {
      try {
         const updatedPost = await likePost({ user: user._id, post: postid });
         const postResponse = await getOnePost(postid);
         setPost(postResponse.data);
         dispatch(setAllpost(updatedPost.data));
      } catch (error) {}
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
         toast.error("Comment send error");
      }
   };

   return (
      <>
         {post && (
            <div className='flex flex-col items-start w-full gap-6 px-5 py-5 2xl:flex-row xl:flex-row 2xl:px-0 md:px-0'>
               <div className='bg-lightV1 flex-1 rounded-sm p-3 flex flex-col gap-2.5 w-full'>
                  <span>{post.text}</span>
                  {post.image && (
                     <img
                        className='w-full rounded-sm'
                        src={process.env.REACT_APP_API_URL + post.image}
                        alt={post.owner.name}
                     />
                  )}

                  <div className='flex items-center justify-around pt-2 text-sm border-t 2xl:text-base sm:text-base border-t-lightV4 text-mainDarkV1'>
                     <button
                        onClick={() => likehandle(post._id)}
                        className='flex items-center gap-2 rounded-sm bg-lightV3 group'>
                        <span className='hidden pl-2 2xl:inline-block sm:inline-block'>
                           {post.likes.count}
                        </span>
                        <div className='flex items-center gap-1 px-2 rounded-sm bg-lightV4'>
                           {post.likes.users.indexOf(user._id) !== -1 ? (
                              <BsHeartFill className='text-[#993333] transition-all group-hover:scale-110' />
                           ) : (
                              <BsHeart className='transition-all group-hover:scale-110' />
                           )}
                           <span>Like</span>
                        </div>
                     </button>
                     <button className='flex items-center gap-2 rounded-sm bg-lightV3 group'>
                        <span className='hidden pl-2 2xl:inline-block sm:inline-block'>
                           {post.comments.count}
                        </span>
                        <div className='flex items-center gap-1 px-2 rounded-sm cursor-pointer bg-lightV4'>
                           <BiCommentDetail className='text-xl transition-all group-hover:scale-110' />
                           <span>Comment</span>
                        </div>
                     </button>
                     <button className='flex items-center gap-2 text-sm rounded-sm 2xl:text-base sm:text-base bg-lightV3 group'>
                        <span className='hidden pl-2 2xl:inline-block sm:inline-block'>
                           0
                        </span>
                        <div className='flex items-center gap-1 px-2 rounded-sm bg-lightV4'>
                           <AiOutlineShareAlt className='text-xl transition-all group-hover:scale-110' />
                           <span>Share</span>
                        </div>
                     </button>
                  </div>
               </div>
               <div className='bg-lightV1 rounded-sm flex flex-col justify-between flex-[0.5] p-3 gap-3 w-full'>
                  <div className=''>
                     <NavLink
                        to={`/user/${post.owner._id}`}
                        className='flex gap-1.5 items-center'>
                        <Avatar
                           name={post.owner.name}
                           src={post.owner.avatar}
                           size={40}
                           variant='beam'
                        />
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
                     className='flex flex-col items-start gap-3 2xl:flex-row sm:flex-row'>
                     <textarea
                        onInput={(e: any) => {
                           e.target.style.height = "52px";
                           e.target.style.height = e.target.scrollHeight + "px";
                        }}
                        placeholder='Send comment...'
                        className='placeholder-mainDarkV2/60 w-full max-h-28 resize-none min-h-0-[100px] bg-lightV3 rounded-sm p-1.5 text-sm flex-1'
                        name='text'></textarea>
                     <button
                        className='w-full py-1 ml-auto rounded-sm px-7 bg-mainDarkV2 2xl:w-auto sm:w-auto text-lightV1'
                        type='submit'>
                        Send
                     </button>
                  </form>
                  <ul className='flex flex-col flex-1 gap-2 rounded-sm'>
                     {post.comments.comment && (
                        <>
                           {post.comments.comment.comments.map(
                              (comment: any, index: number) => (
                                 <li className='flex gap-2 p-2 rounded-sm ' key={index}>
                                    <Avatar
                                       name={post.owner.name}
                                       src={FindUser(allUser, user._id)?.avatar}
                                       size={40}
                                       variant='bean'
                                    />
                                    <div className='w-full text-sm text-mainDarkV1'>
                                       <div className='flex justify-between'>
                                          <span className='text-base font-medium'>
                                             {FindUser(allUser, comment.user)?.name}
                                          </span>
                                          <span className='font-semibold text-mainDarkV1/50'>
                                             {formatDateMin(comment.createdAt)}
                                          </span>
                                       </div>
                                       <span className='flex-1 py-1 rounded-sm text-mainDarkV1/80'>
                                          {comment.text}
                                       </span>
                                    </div>
                                 </li>
                              )
                           )}
                        </>
                     )}
                  </ul>
               </div>
            </div>
         )}
      </>
   );
}
