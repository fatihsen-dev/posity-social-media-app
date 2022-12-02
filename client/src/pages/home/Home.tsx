import Post from "./Post";
import PostList from "./PostList";
export default function Home() {
   return (
      <div className='flex flex-col items-center pt-5 h-full gap-4 mx-5'>
         <div className='2xl:w-[700px] xl:w-[700px] lg:w-[700px] md:w-[700px] sm:w-full w-full'>
            <Post />
         </div>
         <PostList />
      </div>
   );
}
