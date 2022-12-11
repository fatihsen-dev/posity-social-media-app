import { formatDateMin } from "../../helpers/dateFormat";
import Avatar from "../Avatar";
import { IComments } from "../../interface";

export default function Comments({ name, avatar, createdAt, text }: IComments) {
   return (
      <li className='flex gap-2 p-2 rounded-sm bg-lightV3/70'>
         <Avatar variant='beam' size={28} name={name} src={avatar} />
         <div className='w-full text-sm text-mainDarkV1'>
            <div className='flex justify-between'>
               <span className='text-base font-medium'>{name}</span>
               <span className='font-semibold text-mainDarkV1/50'>
                  {formatDateMin(createdAt)}
               </span>
            </div>
            <span className='flex-1 py-1 rounded-sm text-mainDarkV1/80'>{text}</span>
         </div>
      </li>
   );
}
