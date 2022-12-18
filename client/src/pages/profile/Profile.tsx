import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneUser } from "../../axios";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../home/PostForm";
import Post from "../../components/Post/Post";
import Avatar from "../../components/Avatar";
import { setProfileData } from "../../store/posts/post";

export default function Profile() {
   const disapatch = useDispatch();
   const { userid } = useParams();
   const { user, allUser } = useSelector((state: RootState) => state.userData);
   const { profileData } = useSelector((state: RootState) => state.postsData);
   useEffect(() => {
      (async () => {
         const rofileDataResponse = await getOneUser(userid);
         disapatch(setProfileData(rofileDataResponse.data));
      })();
   }, [userid]);

   return (
      <>
         {profileData ? (
            <div className='flex gap-5 flex-col px-5 pt-5 2xl:flex-row lg:flex-row 2xl:gap-0 xl:gap-0 2xl:px-0 sm:px-0'>
               <div className='2xl:w-96 xl:w-80 lg:w-72 w-full bg-lightV1 flex flex-col'>
                  <div className='relative flex flex-col items-center justify-center'>
                     {profileData.banner ? (
                        <img
                           className='object-cover w-full rounded-sm h-36'
                           src={profileData.banner}
                           alt='Resim bulunamadı'
                        />
                     ) : (
                        <img
                           className='object-cover w-full rounded-sm h-36'
                           src='../assets/images/default.jpg'
                           alt='Resim bulunamadı'
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
                              alt='Resim bulunamadı'
                           />
                        ) : (
                           <Avatar
                              src={profileData.avatar}
                              name={profileData.name}
                              variant='beam'
                              size={80}
                           />
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
                        {allUser.map((user: any, index: number) => {
                           if (index < 5) {
                              return (
                                 <NavLink
                                    key={index}
                                    to={`/user/${user._id}`}
                                    className='flex items-center gap-1.5 bg-lightV3 p-1 rounded'>
                                    <Avatar
                                       src={user.avatar}
                                       name={user.name}
                                       variant='beam'
                                       size={28}
                                    />
                                    <span className='text-[17px] min-w-[208px] w-52 whitespace-nowrap text-ellipsis overflow-hidden'>
                                       {user.name}
                                    </span>
                                 </NavLink>
                              );
                           }
                        })}
                     </ul>
                  )}
               </div>
               <div className='flex-1 h-full pb-5'>
                  {profileData.posts.count > 0 ? (
                     <ul className='2xl:w-[800px] xl:w-[700px] lg:w-[600px] w-full mx-auto flex flex-col gap-4 rounded-sm h-full'>
                        {profileData.posts.post.map((post: any, index: number) => (
                           <Post
                              key={index}
                              allUser={allUser}
                              post={{ ...post, owner: profileData._id }}
                              user={user}
                              index={index}
                           />
                        ))}
                     </ul>
                  ) : (
                     <>
                        <ul className='2xl:w-[800px] xl:w-[700px] lg:w-[600px] w-full mx-auto flex justify-center items-center flex-col gap-4 bg-lightV1 rounded-sm h-full'>
                           {userid === user._id ? (
                              <PostForm />
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
