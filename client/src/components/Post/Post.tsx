import Buttons from "./Buttons";
import Comments from "./Comments";
import PostForm from "./PostForm";
import User from "./User";
import { IPost } from "../../interface";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export default function Post({ allUser, post, index, user }: IPost) {
   const { posts } = useSelector((state: RootState) => state.postsData);

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
            {posts.find((pst: any) => pst._id === post._id).comments.comment
               ?.comments && (
               <ul className='flex flex-col gap-5 p-3 pb-0'>
                  {posts
                     .find((pst: any) => pst._id === post._id)
                     .comments.comment.comments.map((comment: any, index: number) => (
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
                     ))}
               </ul>
            )}
         </div>
      </li>
   );
}
