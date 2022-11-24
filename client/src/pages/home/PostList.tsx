import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { getAllPost } from "../../axios";
import { setAllpost } from "../../store/posts/post";

export default function PostList() {
   const { posts } = useSelector((state: RootState) => state.postsData);
   const { allUser } = useSelector((state: RootState) => state.userData);
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         const postResponse = await getAllPost();
         dispatch(setAllpost(postResponse.data));
      })();
   }, []);

   return (
      <ul className='w-[700px] gap-4 flex flex-col pb-10'>
         {posts &&
            posts.map((post: any, index: number) => (
               <li className='p-3 bg-lightV1 rounded-sm flex flex-col gap-2' key={index}>
                  {allUser && (
                     <div className='flex items-center gap-1'>
                        <img
                           className='w-9 h-9 object-cover rounded-full'
                           src={
                              allUser.find((user: any) => user._id === post.owner).avatar
                           }
                           alt=''
                        />
                        <div>
                           <span className='text-lg font-medium'>
                              {allUser.find((user: any) => user._id === post.owner).name}
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
               </li>
            ))}
      </ul>
   );
}
