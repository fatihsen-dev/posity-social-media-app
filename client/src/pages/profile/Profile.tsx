import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../../store/index";
import { useEffect } from "react";
import { getProfileUser } from "../../axios";
import { userProfileDataFunc } from "../../store/auth/user";

export default function Profile() {
   const { userProfileData } = useSelector((state: RootState) => state.userData);
   const dispatch = useDispatch();
   const { username } = useParams();

   useEffect(() => {
      (async () => {
         const profileData = await getProfileUser(username);
         dispatch(userProfileDataFunc(profileData.data));
      })();
   }, [username]);

   return (
      <div>
         <pre className='w-full overflow-auto'>
            {JSON.stringify(userProfileData, null, 2)}
         </pre>
      </div>
   );
}
