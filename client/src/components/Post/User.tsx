import { NavLink } from "react-router-dom";
import { formatDate } from "../../helpers/dateFormat";
import Avatar from "../Avatar";

interface UserType {
   user: {
      name: string;
      avatar: string;
      _id: string;
   };
   owner: string;
   date: string;
}

export default function User({ user, owner, date }: UserType) {
   return (
      <NavLink
         to={`user/${user._id}`}
         className='flex items-center gap-2 mr-auto select-none'>
         <Avatar variant='beam' size={36} name={user.name} src={user.avatar} />
         <div className='flex flex-col justify-center'>
            <span className='font-medium leading-5'>{user.name}</span>
            <span className='text-xs text-grayV2'>{formatDate(date)}</span>
         </div>
      </NavLink>
   );
}
