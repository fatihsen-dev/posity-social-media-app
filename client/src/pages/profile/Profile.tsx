import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileUser, likePost, sendComment } from "../../axios";
import Avatar from "boring-avatars";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Post from "../home/Post";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineShareAlt } from "react-icons/ai";
import { setAllpost } from "../../store/posts/post";
import { formatDate, formatDateMin } from "../../helpers/dateFormat";
import toast from "react-hot-toast";

export default function Profile() {
   const [profileData, setProfileData] = useState<any>(null);
   const { username } = useParams();
   const dispatch = useDispatch();
   const { user, allUser } = useSelector((state: RootState) => state.userData);
   const { posts } = useSelector((state: RootState) => state.postsData);

   useEffect(() => {
      (async () => {
         const rofileDataResponse = await getProfileUser(username);
         setProfileData(rofileDataResponse.data);
      })();
   }, [username]);

   const likehandle = async (postid: String) => {
      try {
         const updatedPost = await likePost({ user: user._id, post: postid });
         const rofileDataResponse = await getProfileUser(username);
         setProfileData(rofileDataResponse.data);
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
      <>
         {profileData ? (
            <div className='flex flex-col gap-5 px-5 pt-5 2xl:flex-row lg:flex-row 2xl:gap-0 lg:gap-0 2xl:px-0 sm:px-0'>
               <div className='flex-[0.4] bg-lightV1 flex flex-col'>
                  <div className='relative flex flex-col items-center justify-center'>
                     {profileData.banner ? (
                        <img
                           className='object-cover w-full rounded-sm h-36'
                           src={profileData.banner}
                           alt={profileData.name}
                        />
                     ) : (
                        <img
                           className='object-cover w-full rounded-sm h-36'
                           src='../assets/images/default.jpg'
                           alt={profileData.name}
                        />
                     )}
                     <div className='flex items-center justify-center w-full text-xl font-medium h-28 bg-lightV1'>
                        {profileData.name}
                     </div>
                     <div className='absolute translate-y-4'>
                        {profileData.avatar ? (
                           <img
                              className='object-cover w-20 h-20 rounded-full'
                              src={profileData.avatar}
                              alt={profileData.name}
                           />
                        ) : (
                           <Avatar
                              square={false}
                              name={profileData.name}
                              variant='beam'
                              size={80}></Avatar>
                        )}
                     </div>
                  </div>
                  <div className='p-2 text-sm border-y border-lightV3'>
                     <div className='bg-lightV2 p-1.5'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
                     </div>
                  </div>
                  {allUser && (
                     <ul className='flex-col hidden gap-2 p-2 text-sm border-lightV3 2xl:flex lg:flex'>
                        {allUser.map((user: any, index: number) => (
                           <NavLink
                              to={`/user/${user._id}`}
                              className='flex items-center gap-1.5 bg-lightV3 p-1 rounded'
                              key={index}>
                              {user.avatar ? (
                                 <img
                                    className='object-cover rounded-full w-7 h-7'
                                    src={user.avatar}
                                    alt={user.name}
                                 />
                              ) : (
                                 <Avatar
                                    variant='beam'
                                    size={28}
                                    name={user.name}></Avatar>
                              )}
                              <span className='text-[17px]'>{user.name}</span>
                           </NavLink>
                        ))}
                     </ul>
                  )}
               </div>
               <div className='flex-1 h-full pb-5'>
                  {profileData.posts.post.length > 0 ? (
                     <ul className='2xl:w-[80%] lg:w-[80%] w-full mx-auto flex flex-col gap-4 rounded-sm h-full'>
                        {profileData.posts.post.map((post: any, index: number) => (
                           <li
                              className='flex flex-col p-3 rounded-sm bg-lightV1'
                              key={index}>
                              <input
                                 className='hidden peer'
                                 type='checkbox'
                                 id={`commentBtn${index}`}
                              />
                              <div className='flex flex-col gap-3'>
                                 <div className='flex flex-col items-center gap-2'>
                                    <span className='w-full'>{post.text}</span>
                                    <span className='ml-auto text-sm text-grayV2'>
                                       {formatDate(post.createdAt)}
                                    </span>
                                 </div>
                                 {post.image && (
                                    <img
                                       className='rounded-sm'
                                       src={process.env.REACT_APP_API_URL + post.image}
                                       alt={post.text}
                                    />
                                 )}
                              </div>
                              <div className='flex items-center justify-around pt-2 mt-2 text-sm border-t 2xl:text-base sm:text-base border-t-lightV4'>
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
                                    <label
                                       htmlFor={`commentBtn${index}`}
                                       className='flex items-center gap-1 px-2 rounded-sm cursor-pointer bg-lightV4'>
                                       <BiCommentDetail className='text-xl transition-all group-hover:scale-110' />
                                       <span>Comment</span>
                                    </label>
                                 </button>
                                 <button className='flex items-center gap-2 rounded-sm bg-lightV3 group'>
                                    <span className='hidden pl-2 2xl:inline-block sm:inline-block'>
                                       0
                                    </span>
                                    <div className='flex items-center gap-1 px-2 rounded-sm bg-lightV4'>
                                       <AiOutlineShareAlt className='text-xl transition-all group-hover:scale-110' />
                                       <span>Share</span>
                                    </div>
                                 </button>
                              </div>
                              <div className='flex-col hidden gap-3 pt-3 peer-checked:flex'>
                                 <form
                                    onSubmit={(e) => commentHandle(e, post._id, user._id)}
                                    className='flex flex-col items-start gap-3 xl:flex-row sm:flex-row'>
                                    <textarea
                                       onInput={(e: any) => {
                                          e.target.style.height = "52px";
                                          e.target.style.height =
                                             e.target.scrollHeight + "px";
                                       }}
                                       placeholder='Send comment...'
                                       className='placeholder-mainDarkV2/60 2xl:w-auto sm:w-auto w-full max-h-28 resize-none min-h-0-[100px] bg-lightV3 rounded-sm p-1.5 text-sm flex-1'
                                       name='text'></textarea>
                                    <button
                                       className='w-full py-1 ml-auto rounded-sm px-7 2xl:w-auto sm:w-auto bg-mainDarkV2 text-lightV1'
                                       type='submit'>
                                       Send
                                    </button>
                                 </form>
                                 {post.comments.count > 0 && (
                                    <ul className='flex flex-col gap-2'>
                                       {posts
                                          .filter((p: any) => p._id === post._id)[0]
                                          .comments.comment.comments.map(
                                             (post: any, index: any) => (
                                                <li
                                                   className='p-1.5 px-2 gap-1.5 w-full flex bg-lightV3'
                                                   key={index}>
                                                   {allUser.find(
                                                      (user: any) =>
                                                         user._id === post.user
                                                   ).avatar ? (
                                                      <img
                                                         className='object-cover rounded-full w-7 h-7'
                                                         src={
                                                            allUser.find(
                                                               (user: any) =>
                                                                  user._id === post.user
                                                            ).avatar
                                                         }
                                                         alt={
                                                            allUser.find(
                                                               (user: any) =>
                                                                  user._id === post.user
                                                            ).avatar
                                                         }
                                                      />
                                                   ) : (
                                                      <Avatar
                                                         variant='beam'
                                                         size={28}
                                                         name={
                                                            allUser.find(
                                                               (user: any) =>
                                                                  user._id === post.user
                                                            ).name
                                                         }></Avatar>
                                                   )}
                                                   <div className='w-full'>
                                                      <div className='flex items-center justify-between'>
                                                         <span className='font-medium'>
                                                            {
                                                               allUser.find(
                                                                  (user: any) =>
                                                                     user._id ===
                                                                     post.user
                                                               ).name
                                                            }
                                                         </span>
                                                         <span className='text-sm text-grayV1'>
                                                            {formatDateMin(
                                                               post.createdAt
                                                            )}
                                                         </span>
                                                      </div>
                                                      <span className='text-sm'>
                                                         {post.text}
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
                  ) : (
                     <>
                        <ul className='2xl:w-[80%] lg:w-[80%] w-full mx-auto flex justify-center items-center flex-col gap-4 bg-lightV1 rounded-sm h-full'>
                           {username === user._id ? (
                              <Post />
                           ) : (
                              <div className='p-10'>
                                 Kullanıcının herhangi bir gönderisi yok.
                              </div>
                           )}
                        </ul>
                     </>
                  )}
               </div>
            </div>
         ) : (
            <></>
         )}
      </>
   );
}
