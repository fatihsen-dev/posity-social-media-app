import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { likePost, sendComment } from "../../axios";
import { setAllpost } from "../../store/posts/post";
import { BiCommentDetail } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { AiOutlineShareAlt } from "react-icons/ai";
import toast from "react-hot-toast";
import Avatar from "boring-avatars";
import { NavLink } from "react-router-dom";
import { formatDate, formatDateMin } from "../../helpers/dateFormat";

export default function PostList() {
   const { posts } = useSelector((state: RootState) => state.postsData);
   const { user, allUser } = useSelector((state: RootState) => state.userData);
   const dispatch = useDispatch();

   const likehandle = async (postid: String) => {
      try {
         const updatedPost = await likePost({ user: user._id, post: postid });
         dispatch(setAllpost(updatedPost.data));
      } catch (error) {
         console.log(error);
      }
   };
   const commentHandle = async (e: any, post: string, user: string) => {
      e.preventDefault();
      try {
         const postResponse = await sendComment({
            text: e.target.text.value,
            post,
            user,
         });
         dispatch(setAllpost(postResponse.data));
         e.target.text.value = "";
      } catch (error) {
         console.log(error);
         toast.error("Comment send error");
      }
   };

   return (
      <ul className='2xl:w-[700px] xl:w-[700px] lg:w-[700px] md:w-[700px] sm:w-auto w-auto gap-4 flex flex-col pb-10'>
         {posts &&
            posts.map((post: any, index: number) => (
               <li className='bg-lightV1 rounded-sm flex flex-col gap-2' key={index}>
                  <input
                     className='peer hidden'
                     type='checkbox'
                     id={`checkbox${index}`}
                  />
                  <div className='flex flex-col gap-2 p-3'>
                     {allUser && (
                        <NavLink
                           to={`user/${
                              allUser.find((user: any) => user._id === post.owner)._id
                           }`}
                           className='mr-auto flex items-center gap-2 select-none'>
                           {allUser.find((user: any) => user._id === post.owner)
                              .avatar ? (
                              <img
                                 className='w-9 h-9 object-cover rounded-full'
                                 src={
                                    allUser.find((user: any) => user._id === post.owner)
                                       .avatar
                                 }
                                 alt={
                                    allUser.find((user: any) => user._id === post.owner)
                                       .name
                                 }
                              />
                           ) : (
                              <div className='overflow-hidden rounded-full'>
                                 <Avatar
                                    variant='beam'
                                    size={36}
                                    name={
                                       allUser.find(
                                          (user: any) => user._id === post.owner
                                       ).name
                                    }></Avatar>
                              </div>
                           )}

                           <div className='flex flex-col justify-center'>
                              <span className='font-medium leading-5'>
                                 {
                                    allUser.find((user: any) => user._id === post.owner)
                                       .name
                                 }
                              </span>
                              <span className='text-xs text-grayV2'>
                                 {formatDate(post.createdAt)}
                              </span>
                           </div>
                        </NavLink>
                     )}

                     <div className='flex flex-col gap-1'>
                        <span>{post.text}</span>
                        {post.image && (
                           <img
                              className='w-full rounded-sm'
                              src={process.env.REACT_APP_API_URL + post.image}
                              alt={process.env.REACT_APP_API_URL + post.image}
                           />
                        )}
                     </div>
                     <div className='2xl:text-base sm:text-base text-sm border-t-lightV4 border-t pt-2 flex justify-around items-center text-mainDarkV1'>
                        <button
                           onClick={() => likehandle(post._id)}
                           className='flex items-center rounded-sm bg-lightV3 gap-2 group'>
                           <span className='2xl:inline-block sm:inline-block hidden pl-2'>
                              {post.likes.count}
                           </span>
                           <div className='flex items-center rounded-sm bg-lightV4 px-2 gap-1'>
                              {post.likes.users.indexOf(user._id) !== -1 ? (
                                 <BsHeartFill className='text-[#993333] transition-all group-hover:scale-110' />
                              ) : (
                                 <BsHeart className='transition-all group-hover:scale-110' />
                              )}
                              <span>Like</span>
                           </div>
                        </button>
                        <button className='flex items-center rounded-sm bg-lightV3 gap-2 group'>
                           <span className='2xl:inline-block sm:inline-block hidden pl-2'>
                              {post.comments.count}
                           </span>
                           <label
                              htmlFor={`checkbox${index}`}
                              className='cursor-pointer flex items-center rounded-sm bg-lightV4 px-2 gap-1'>
                              <BiCommentDetail className='text-xl transition-all group-hover:scale-110' />
                              <span>Comment</span>
                           </label>
                        </button>
                        <button className='flex items-center rounded-sm bg-lightV3 gap-2 group'>
                           <span className='2xl:inline-block sm:inline-block hidden pl-2'>
                              0
                           </span>
                           <div className='flex items-center rounded-sm bg-lightV4 px-2 gap-1'>
                              <AiOutlineShareAlt className='text-xl transition-all group-hover:scale-110' />
                              <span>Share</span>
                           </div>
                        </button>
                     </div>
                  </div>
                  <div className='hidden peer-checked:flex flex-col pb-3'>
                     <form
                        onSubmit={(e) => commentHandle(e, post._id, user._id)}
                        className='flex px-3 xl:flex-row sm:flex-row flex-col gap-3 items-start'>
                        <textarea
                           onInput={(e: any) => {
                              e.target.style.height = "52px";
                              e.target.style.height = e.target.scrollHeight + "px";
                           }}
                           placeholder='Send comment...'
                           className='placeholder-mainDarkV2/60 2xl:w-auto sm:w-auto w-full max-h-28 resize-none min-h-0-[100px] bg-lightV3 rounded-sm p-1.5 text-sm flex-1'
                           name='text'></textarea>
                        <button
                           className='ml-auto px-7 py-1 2xl:w-auto sm:w-auto w-full bg-mainDarkV2 text-lightV1 rounded-sm'
                           type='submit'>
                           Send
                        </button>
                     </form>
                     {post.comments.comment?.comments && (
                        <ul className='flex flex-col gap-5 p-3 pb-0'>
                           {post.comments.comment.comments.map(
                              (comment: any, index: any) => (
                                 <li
                                    className='flex gap-2 p-2 bg-lightV3/70 rounded-sm'
                                    key={index}>
                                    {allUser.find((user: any) => user._id === post.owner)
                                       .avatar ? (
                                       <img
                                          className='w-9 h-9 object-cover rounded-full'
                                          src={
                                             allUser.find(
                                                (user: any) => user._id === comment.user
                                             ).avatar
                                          }
                                          alt={
                                             allUser.find(
                                                (user: any) => user._id === comment.user
                                             ).name
                                          }
                                       />
                                    ) : (
                                       <Avatar
                                          variant='beam'
                                          size={28}
                                          name={
                                             allUser.find(
                                                (user: any) => user._id === comment.user
                                             ).name
                                          }></Avatar>
                                    )}
                                    <div className='text-sm w-full text-mainDarkV1'>
                                       <div className='flex justify-between'>
                                          <span className='font-medium text-base'>
                                             {
                                                allUser.find(
                                                   (user: any) =>
                                                      user._id === comment.user
                                                ).name
                                             }
                                          </span>
                                          <span className='font-semibold text-mainDarkV1/50'>
                                             {formatDateMin(comment.createdAt)}
                                          </span>
                                       </div>
                                       <span className='rounded-sm py-1 flex-1 text-mainDarkV1/80'>
                                          {comment.text}
                                       </span>
                                    </div>
                                 </li>
                              )
                           )}
                        </ul>
                     )}
                  </div>
               </li>
            ))}
      </ul>
   );
}
