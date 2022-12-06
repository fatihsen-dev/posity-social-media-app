import { NavLink } from "react-router-dom";
import { formatDate } from "../../helpers/dateFormat";
import Avatar from "../Avatar";

interface UserType {
   userid: {
      name: string;
      avatar: string;
   };
   owner: string;
   date: string;
}

export default function User({ userid, owner, date }: UserType) {
   return (
      <NavLink
         to={`user/${userid}`}
         className='flex items-center gap-2 mr-auto select-none'>
         <Avatar variant='beam' size={36} name={userid.name} src={userid.avatar} />
         <div className='flex flex-col justify-center'>
            <span className='font-medium leading-5'>{userid.name}</span>
            <span className='text-xs text-grayV2'>{formatDate(date)}</span>
         </div>
      </NavLink>
   );
}
