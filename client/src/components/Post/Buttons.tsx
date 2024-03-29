import { useEffect, useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { likePost } from "../../axios";
import { setAllpost, setShareData } from "../../store/posts/post";

interface IButtons {
   likeCount: number;
   commentCount: number;
   shareCount: number;
   postId: string;
   userId: string;
   likedUser: any;
   index: number;
   post: any;
   user: any;
}

export default function Buttons({
   likeCount,
   likedUser,
   commentCount,
   shareCount,
   userId,
   postId,
   index,
   post,
   user,
}: IButtons) {
   const dispatch = useDispatch();
   const [count, setCount] = useState<any>();
   const [like, setLike] = useState(false);

   useEffect(() => {
      setCount(likeCount);
      setLike(likedUser === -1 ? false : true);
   }, [likeCount, likedUser]);

   const likehandle = async (postid: String) => {
      setLike(!like);
      like === true
         ? setCount((prev: any) => prev - 1)
         : setCount((prev: any) => prev + 1);
      try {
         const updatedPost = await likePost({ user: userId, post: postid });
         dispatch(setAllpost(updatedPost.data));
      } catch (error) {}
   };

   const shareHandle = () => {
      dispatch(
         setShareData({
            status: true,
            user: {
               id: user._id,
               name: user.name,
               avatar: user.avatar,
            },
            post: {
               text: post.text,
               image: post.image,
               id: post._id,
               date: post.createdAt,
            },
         })
      );
   };

   return (
      <div className='flex items-center justify-around pt-2 text-sm border-t 2xl:text-base sm:text-base border-t-lightV4 text-mainDarkV1'>
         <button
            onClick={() => likehandle(postId)}
            className='flex items-center gap-2 rounded-sm bg-lightV3 group'>
            <span className='hidden pl-2 2xl:inline-block sm:inline-block tabular-nums'>
               {count}
            </span>
            <div className='flex items-center gap-1 px-2 rounded-sm bg-lightV4'>
               {like ? (
                  <BsHeartFill className='text-[#993333] transition-all group-hover:scale-110' />
               ) : (
                  <BsHeart className='transition-all group-hover:scale-110' />
               )}
               <span>Like</span>
            </div>
         </button>
         <button className='flex items-center gap-2 rounded-sm bg-lightV3 group'>
            <span className='hidden pl-2 2xl:inline-block sm:inline-block'>
               {commentCount}
            </span>
            <label
               htmlFor={`checkbox${index}`}
               className='flex items-center gap-1 px-2 rounded-sm cursor-pointer bg-lightV4'>
               <BiCommentDetail className='text-xl transition-all group-hover:scale-110' />
               <span>Comment</span>
            </label>
         </button>
         <button
            onClick={shareHandle}
            className='flex items-center gap-2 rounded-sm bg-lightV3 group'>
            <span className='hidden pl-2 2xl:inline-block sm:inline-block'>
               {shareCount}
            </span>
            <div className='flex items-center gap-1 px-2 rounded-sm bg-lightV4'>
               <AiOutlineShareAlt className='text-xl transition-all group-hover:scale-110' />
               <span>Share</span>
            </div>
         </button>
      </div>
   );
}
