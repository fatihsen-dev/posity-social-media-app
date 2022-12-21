import Buttons from "./Buttons";
import Comments from "./Comments";
import PostForm from "./PostForm";
import User from "./User";
import { IPost } from "../../interface";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateData } from "../../store/posts/post";
import { FindPost, FindUser } from "../../helpers/find";
import Avatar from "../Avatar";
import { NavLink } from "react-router-dom";
import { formatDate } from "../../helpers/dateFormat";

export default function Post({ allUser, post, index, user }: IPost) {
   const { posts } = useSelector((state: RootState) => state.postsData);
   const dispatch = useDispatch();
   const editHandle = async () => {
      dispatch(
         setUpdateData({
            status: true,
            user: {
               id: user._id,
               name: user.name,
               avatar: user.avatar,
               token: user.token,
            },
            post: {
               id: post._id,
               text: post.text,
               image: post.image || null,
               date: post.createdAt,
            },
         })
      );
   };

   return (
      <li className='flex flex-col gap-2 rounded-sm bg-lightV1'>
         <input className='hidden peer' type='checkbox' id={`checkbox${index}`} />
         <div className='flex flex-col gap-2 p-3'>
            <User
               postOwner={allUser.find(
                  (user: { _id: string }) => user._id === post.owner
               )}
               date={post.createdAt}
               postid={post._id}
               editHandle={editHandle}
            />
            <div className='flex flex-col gap-1'>
               <span className='text-ellipsis overflow-hidden'>{post.text}</span>
               {post.image && (
                  <img
                     className='w-full rounded-sm'
                     src={process.env.REACT_APP_API_URL + post.image}
                     alt='Resim bulunamadı !'
                  />
               )}
               {post.shared && (
                  <NavLink
                     to={"/post/" + post.shared._id}
                     className='border flex flex-col gap-1 border-lightV4 p-2 rounded-sm bg-lightV3'>
                     <div className='flex items-center gap-1.5'>
                        <Avatar
                           variant='beam'
                           name={
                              allUser.find(
                                 (user: { _id: string }) => user._id === post.shared.owner
                              ).name
                           }
                           size={30}
                           src={
                              allUser.find(
                                 (user: { _id: string }) => user._id === post.shared.owner
                              ).avatar
                           }
                        />
                        <div className='flex flex-col leading-4 translate-y-0.5'>
                           <span className='font-medium'>
                              {
                                 allUser.find(
                                    (user: { _id: string }) =>
                                       user._id === post.shared.owner
                                 ).name
                              }
                           </span>
                           <span className='text-xs text-grayV2'>
                              {formatDate(post.shared.createdAt)}
                           </span>
                        </div>
                     </div>
                     <div className='flex flex-col gap-1'>
                        <span>{post.shared.text}</span>
                        {post.shared.image && (
                           <img
                              className='rounded-sm'
                              src={process.env.REACT_APP_API_URL + post.shared.image}
                              alt='Not found'
                           />
                        )}
                     </div>
                  </NavLink>
               )}
            </div>
            <Buttons
               post={post}
               user={allUser.find((user: { _id: string }) => user._id === post.owner)}
               likedUser={post.likes.users.indexOf(user._id)}
               likeCount={post.likes.count}
               commentCount={post.comments.count}
               shareCount={post?.share?.count}
               userId={user._id}
               postId={post._id}
               index={index}
            />
         </div>
         <div className='flex-col hidden pb-3 peer-checked:flex'>
            <PostForm postId={post._id} userId={user._id} />
            {FindPost(posts, post._id)?.comments.comment?.comments && (
               <ul className='flex flex-col gap-5 p-3 pb-0'>
                  {FindPost(posts, post._id)?.comments.comment?.comments.map(
                     (comment: any, index: number) => (
                        <Comments
                           key={index}
                           createdAt={comment.createdAt}
                           text={comment.text}
                           name={
                              allUser.find((user: any) => user._id === comment.user).name
                           }
                           avatar={
                              allUser.find((user: any) => user._id === comment.user)
                                 .avatar
                           }
                        />
                     )
                  )}
               </ul>
            )}
         </div>
      </li>
   );
}
