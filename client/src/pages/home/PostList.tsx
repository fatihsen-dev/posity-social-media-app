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

   return (
      <ul className='w-[700px] gap-4 flex flex-col pb-10'>
         {posts &&
            posts.map((post: any, index: number) => (
               <li className='p-3 bg-lightV1 rounded-sm flex flex-col gap-2' key={index}>
                  {allUser && (
                     <div className='flex items-center gap-2 select-none'>
                        <img
                           className='w-9 h-9 object-cover rounded-full'
                           src={
                              allUser.find((user: any) => user._id === post.owner).avatar
                           }
                           alt=''
                        />
                        <div className='flex flex-col justify-center'>
                           <span className='font-medium leading-4'>
                              {allUser.find((user: any) => user._id === post.owner).name}
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
               </li>
            ))}
      </ul>
   );
}
