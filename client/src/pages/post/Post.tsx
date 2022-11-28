import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";

export default function Post() {
   const { posts } = useSelector((state: RootState) => state.postsData);
   const { postid } = useParams();

   useEffect(() => {
      console.log(postid);
   }, []);

   return (
      <div>
         <pre className='w-full overflow-auto'>{JSON.stringify(posts, null, 2)}</pre>
      </div>
   );
}
