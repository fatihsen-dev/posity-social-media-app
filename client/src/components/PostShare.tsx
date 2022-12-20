import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function PostShare() {
   const { postShare } = useSelector((state: RootState) => state.postsData);

   return (
      <div
         style={postShare.status ? { pointerEvents: "auto", opacity: 1 } : {}}
         className='opacity-0 transition-all duration-200 ease-in-out pointer-events-none absolute z-20 inset-0 bg-mainDarkV1/20 grid place-items-center'>
         <div className='bg-lightV1 rounded-sm p-5 flex flex-col gap-3 2xl:w-[700px] 2xl:h-auto md:w-[700px] md:h-auto w-full h-full'></div>
      </div>
   );
}
