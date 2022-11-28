import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { getAllPost, likePost, sendComment } from "../../axios";
import { setAllpost } from "../../store/posts/post";
import { BiCommentDetail } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { TbShare } from "react-icons/tb";
import toast from "react-hot-toast";
import Avatar from "boring-avatars";

export default function PostList() {
   const { posts } = useSelector((state: RootState) => state.postsData);
   const { user, allUser } = useSelector((state: RootState) => state.userData);
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         const postResponse = await getAllPost();
         dispatch(setAllpost(postResponse.data));
      })();
   }, []);

   const formatDate = (date: any) => {
      const d = new Date(date);
      const c = new Date();
      if (d.getFullYear() < c.getFullYear()) {
         return `${c.getFullYear() - d.getFullYear()} yıl önce`;
      } else if (d.getMonth() < c.getMonth()) {
         return `${c.getMonth() - d.getMonth()} ay önce`;
      } else if (d.getDate() < c.getDate()) {
         return `${c.getDate() - d.getDate()} gün önce`;
      } else if (d.getHours() < c.getHours()) {
         return `${c.getHours() - d.getHours()} saat önce`;
      } else if (d.getMinutes() < c.getMinutes()) {
         return `${c.getMinutes() - d.getMinutes()} dakika önce`;
      } else {
         return "Yeni";
      }
   };

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
      <ul className='w-[700px] gap-4 flex flex-col pb-10'>
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
                        <div className='flex items-center gap-2 select-none'>
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
                              <Avatar
                                 variant='beam'
                                 size={36}
                                 name={
                                    allUser.find((user: any) => user._id === post.owner)
                                       .name
                                 }></Avatar>
                           )}

                           <div className='flex flex-col justify-center'>
                              <span className='font-medium leading-4'>
                                 {
                                    allUser.find((user: any) => user._id === post.owner)
                                       .name
                                 }
                              </span>
                              <span className='text-sm text-grayV2'>
                                 {formatDate(post.createdAt)}
                              </span>
                           </div>
                        </div>
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
                     <div className='flex justify-between items-center text-mainDarkV1'>
                        <button
                           onClick={() => likehandle(post._id)}
                           className='flex items-center rounded-sm bg-lightV3 text-lg gap-2 pl-2 group'>
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
                        <button className='flex items-center rounded-sm bg-lightV3 text-lg gap-2 pl-2 group'>
                           <span>{post.comments.count}</span>
                           <label
                              htmlFor={`checkbox${index}`}
                              className='cursor-pointer flex items-center rounded-sm bg-lightV4 px-2 gap-1'>
                              <BiCommentDetail className='text-xl transition-all group-hover:scale-110' />
                              <span>Comment</span>
                           </label>
                        </button>
                        <button className='flex items-center rounded-sm bg-lightV3 text-lg gap-2 pl-2 group'>
                           <span>0</span>
                           <div className='flex items-center rounded-sm bg-lightV4 px-2 gap-1'>
                              <TbShare className='text-xl transition-all group-hover:scale-110' />
                              <span>Share</span>
                           </div>
                        </button>
                     </div>
                  </div>
                  <div className='hidden peer-checked:flex flex-col'>
                     {post.comments.comment?.comments && (
                        <ul className='flex flex-col gap-5 py-3 p-3'>
                           {post.comments.comment.comments.map(
                              (comment: any, index: any) => (
                                 <li className='flex gap-2' key={index}>
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
                                                (user: any) => user._id === post.owner
                                             ).name
                                          }
                                       />
                                    ) : (
                                       <Avatar
                                          variant='beam'
                                          size={28}
                                          name={user.name}></Avatar>
                                    )}
                                    <span className='bg-lightV3 rounded-sm px-2 py-1 flex-1 text-sm'>
                                       {comment.text}
                                    </span>
                                 </li>
                              )
                           )}
                        </ul>
                     )}
                     <form
                        onSubmit={(e) => commentHandle(e, post._id, user._id)}
                        className='flex p-3 gap-2 items-start'>
                        <textarea
                           placeholder='Send comment...'
                           className='resize-none bg-lightV3 rounded-sm h-16 p-1.5 text-sm flex-1'
                           name='text'></textarea>
                        <button
                           className='ml-auto px-7 py-1 bg-mainDarkV2 text-lightV1 rounded-sm'
                           type='submit'>
                           Send
                        </button>
                     </form>
                  </div>
               </li>
            ))}
      </ul>
   );
}
