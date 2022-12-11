import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Post from "../../components/Post/Post";

export default function PostList() {
   const { posts } = useSelector((state: RootState) => state.postsData);
   const { user, allUser } = useSelector((state: RootState) => state.userData);
   return (
      <ul className='2xl:w-[700px] xl:w-[700px] lg:w-[700px] md:w-[700px] sm:w-auto w-auto gap-4 flex flex-col pb-10'>
         {posts &&
            allUser &&
            posts.map((post: any, index: number) => (
               <Post
                  key={index}
                  allUser={allUser}
                  post={post}
                  index={index}
                  user={user}
               />
            ))}
      </ul>
   );
}
