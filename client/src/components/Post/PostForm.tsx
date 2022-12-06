import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { sendComment } from "../../axios";
import { setAllpost } from "../../store/posts/post";

interface IForm {
   postId: string;
   userId: string;
}

export default function PostForm({ postId, userId }: IForm) {
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
      <form
         onSubmit={(e) => commentHandle(e, postId, userId)}
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
   );
}
