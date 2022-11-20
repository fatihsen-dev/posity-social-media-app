import { useParams } from "react-router-dom";

export default function Profile() {
   const { username } = useParams();

   return <div>Profile userId: {username}</div>;
}
