import Post from "./Post";
import PostList from "./PostList";

export default function Home() {
   return (
      <div className='flex flex-col items-center pt-5 h-full gap-4'>
         <Post />
         <PostList />
      </div>
   );
}
