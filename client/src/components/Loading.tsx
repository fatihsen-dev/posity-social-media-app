import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface TLoading {
   status?: null | false | object;
}

export default function Loading({ status }: TLoading) {
   const navigate = useNavigate();

   useEffect(() => {
      if (status === false) {
         navigate("login");
      }
   }, [status]);

   return (
      <div className='absolute inset-0 z-10 grid w-full h-full bg-lightV1 place-items-center'>
         <Player
            autoplay
            loop
            src='https://assets2.lottiefiles.com/datafiles/lS0dvppV3Zjc2ZB/data.json'
            style={{ height: "300px", width: "300px" }}></Player>
      </div>
   );
}
