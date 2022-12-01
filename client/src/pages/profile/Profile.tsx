import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileUser, likePost } from "../../axios";
import Avatar from "boring-avatars";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Post from "../home/Post";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineShareAlt } from "react-icons/ai";
import { setAllpost } from "../../store/posts/post";
import { formatDate, formatDateMin } from "../../helpers/dateFormat";

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

   console.log(profileData);

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

   return (
      <>
         {profileData ? (
            <div className='flex pt-5'>
               <div className='flex-[0.4] bg-lightV1 flex flex-col'>
                  <div className='flex flex-col relative justify-center items-center'>
                     {profileData.banner ? (
                        <img
                           className='h-36 object-cover w-full rounded-sm'
                           src={profileData.banner}
                           alt={profileData.name}
                        />
                     ) : (
                        <img
                           className='h-36 object-cover w-full rounded-sm'
                           src='../assets/images/default.jpg'
                           alt={profileData.name}
                        />
                     )}
                     <div className='h-28 w-full bg-lightV1 flex justify-center items-center text-xl font-medium'>
                        {profileData.name}
                     </div>
                     <div className='absolute translate-y-4'>
                        <Avatar
                           square={false}
                           name={profileData.name}
                           variant='beam'
                           size={80}></Avatar>
                     </div>
                  </div>
                  <div className='border-y border-lightV3 p-2 text-sm'>
                     <div className='bg-lightV2 p-1.5'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
                     </div>
                  </div>
                  {allUser && (
                     <ul className='border-y border-lightV3 p-2 text-sm flex flex-col gap-2'>
                        {allUser.map((user: any, index: number) => (
                           <NavLink
                              to={`/user/${user._id}`}
                              className='flex items-center gap-1.5 bg-lightV3 p-1 rounded'
                              key={index}>
                              {user.avatar ? (
                                 <img src={user.avatar} alt={user.name} />
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
               <div className='flex-1 h-full'>
                  {profileData.posts.post.length > 0 ? (
                     <ul className='w-[80%] mx-auto flex flex-col gap-4 rounded-sm h-full'>
                        {profileData.posts.post.map((post: any, index: number) => (
                           <li
                              className='flex bg-lightV1 rounded-sm flex-col p-3'
                              key={index}>
                              <input
                                 className='hidden peer'
                                 type='checkbox'
                                 id={`commentBtn${index}`}
                              />
                              <div className='flex flex-col gap-1'>
                                 <div className='flex justify-between items-center'>
                                    <span>{post.text}</span>
                                    <span className='text-sm text-grayV2'>
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
                              <div className='mt-2 border-t-lightV4 border-t pt-2 flex justify-around items-center text-mainDarkV1'>
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
                                    <label
                                       htmlFor={`commentBtn${index}`}
                                       className='cursor-pointer flex items-center rounded-sm bg-lightV4 px-2 gap-1'>
                                       <BiCommentDetail className='text-xl transition-all group-hover:scale-110' />
                                       <span>Comment</span>
                                    </label>
                                 </button>
                                 <button className='flex items-center rounded-sm bg-lightV3 gap-2 pl-2 group'>
                                    <span>0</span>
                                    <div className='flex items-center rounded-sm bg-lightV4 px-2 gap-1'>
                                       <AiOutlineShareAlt className='text-xl transition-all group-hover:scale-110' />
                                       <span>Share</span>
                                    </div>
                                 </button>
                              </div>
                              {post.comments.count > 0 && (
                                 <ul className='peer-checked:flex hidden pt-4'>
                                    {posts
                                       .filter(
                                          (post: any) =>
                                             post._id === "6387765551c0d0e3da82f3d1"
                                       )[0]
                                       .comments.comment.comments.map(
                                          (post: any, index: any) => (
                                             <li
                                                className='p-1.5 px-2 gap-1.5 w-full flex bg-lightV3'
                                                key={index}>
                                                {allUser.find(
                                                   (user: any) => user._id === post.user
                                                ).avatar ? (
                                                   <img
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
                                                                  user._id === post.user
                                                            ).name
                                                         }
                                                      </span>
                                                      <span className='text-grayV1 text-sm'>
                                                         {formatDateMin(post.createdAt)}
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
                           </li>
                        ))}
                     </ul>
                  ) : (
                     <>
                        <ul className='w-[80%] mx-auto flex flex-col gap-4 bg-lightV1 rounded-sm h-full'>
                           {username === user._id ? (
                              <Post />
                           ) : (
                              <>Kullanıcının herhangi bir gönderisi yok.</>
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
