import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Avatar from "../../components/Avatar";
import { formatDateMin } from "../../helpers/dateFormat";
import User from "../../components/Post/User";
import Buttons from "../../components/Post/Buttons";
import PostForm from "../../components/Post/PostForm";

export default function PostList() {
   const { posts } = useSelector((state: RootState) => state.postsData);
   const { user, allUser } = useSelector((state: RootState) => state.userData);
   return (
      <ul className='2xl:w-[700px] xl:w-[700px] lg:w-[700px] md:w-[700px] sm:w-auto w-auto gap-4 flex flex-col pb-10'>
         {posts &&
            allUser &&
            posts.map((post: any, index: number) => (
               <li className='flex flex-col gap-2 rounded-sm bg-lightV1' key={index}>
                  <input
                     className='hidden peer'
                     type='checkbox'
                     id={`checkbox${index}`}
                  />
                  <div className='flex flex-col gap-2 p-3'>
                     <User
                        user={allUser.find((user: any) => user._id === post.owner)}
                        owner={post.owner}
                        date={post.createdAt}
                     />
                     <div className='flex flex-col gap-1'>
                        <span>{post.text}</span>
                        {post.image && (
                           <img
                              className='w-full rounded-sm'
                              src={process.env.REACT_APP_API_URL + post.image}
                              alt='Resim bulunamadı !'
                           />
                        )}
                     </div>
                     <Buttons
                        likedUser={post.likes.users.indexOf(user._id)}
                        likeCount={post.likes.count}
                        commentCount={post.comments.count}
                        userId={user._id}
                        postId={post._id}
                        index={index}
                     />
                  </div>
                  <div className='flex-col hidden pb-3 peer-checked:flex'>
                     <PostForm postId={post._id} userId={user._id} />
                     {post.comments.comment?.comments && (
                        <ul className='flex flex-col gap-5 p-3 pb-0'>
                           {post.comments.comment.comments.map(
                              (comment: any, index: any) => (
                                 <li
                                    className='flex gap-2 p-2 rounded-sm bg-lightV3/70'
                                    key={index}>
                                    {allUser.find(
                                       (user: any) => user._id === comment.user
                                    ).avatar ? (
                                       <img
                                          className='object-cover rounded-full w-7 h-7'
                                          src={
                                             allUser.find(
                                                (user: any) => user._id === comment.user
                                             ).avatar
                                          }
                                          alt='img not found'
                                       />
                                    ) : (
                                       <Avatar
                                          variant='beam'
                                          size={28}
                                          name={
                                             allUser.find(
                                                (user: any) => user._id === comment.user
                                             ).name
                                          }
                                          src={
                                             allUser.find(
                                                (user: any) => user._id === comment.user
                                             ).avatar
                                          }
                                       />
                                    )}
                                    <div className='w-full text-sm text-mainDarkV1'>
                                       <div className='flex justify-between'>
                                          <span className='text-base font-medium'>
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
                                       <span className='flex-1 py-1 rounded-sm text-mainDarkV1/80'>
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
