import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { sendComment } from "../../axios";
import { setAllpost } from "../../store/posts/post";
import toast from "react-hot-toast";
import Avatar from "../../components/Avatar";
import { formatDateMin } from "../../helpers/dateFormat";
import User from "../../components/Post/User";
import Buttons from "../../components/Post/Buttons";

export default function PostList() {
   const { posts } = useSelector((state: RootState) => state.postsData);
   const { user, allUser } = useSelector((state: RootState) => state.userData);
   const dispatch = useDispatch();

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
         toast.error("Comment send error");
      }
   };

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
                        userid={allUser.find((user: any) => user._id === post.owner)}
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
                     <form
                        onSubmit={(e) => commentHandle(e, post._id, user._id)}
                        className='flex flex-col items-start gap-3 px-3 xl:flex-row sm:flex-row'>
                        <textarea
                           onInput={(e: any) => {
                              e.target.style.height = "52px";
                              e.target.style.height = e.target.scrollHeight + "px";
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
