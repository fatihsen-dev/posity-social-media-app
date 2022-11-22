import { useSelector } from "react-redux";
import type { RootState } from "../../store/index";

export default function Profile() {
   const { user } = useSelector((state: RootState) => state.userData);

   return (
      <div>
         <pre className='w-full overflow-auto'>{JSON.stringify(user, null, 2)}</pre>
      </div>
   );
}
