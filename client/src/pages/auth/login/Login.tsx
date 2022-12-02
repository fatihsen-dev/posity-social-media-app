import { NavLink } from "react-router-dom";
import Image from "../../../assets/images/login.jpg";
import toast from "react-hot-toast";
import { getAllPost, getAllUsers, login } from "../../../axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allUserFunc, userLogin } from "../../../store/auth/user";
import { setAllpost } from "../../../store/posts/post";

export default function Login() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const loginhandle = async (e: any) => {
      e.preventDefault();
      const { email, password } = e.target;
      try {
         const response = await login({
            email: email.value,
            password: password.value,
         });
         toast.success("Login success");
         const allUsersResponse = await getAllUsers();
         const postResponse = await getAllPost();
         dispatch(userLogin(response.data));
         dispatch(setAllpost(postResponse.data));
         dispatch(allUserFunc(allUsersResponse.data));
         navigate("/");
      } catch (error: any) {
         console.log(error.response);
         return toast.error(error.response.data.message);
      }
   };
   return (
      <div className='h-full flex'>
         <div className='flex-1 2xl:inline-block lg:inline-block hidden'>
            <img className='w-full h-full object-cover' src={Image} alt='' />
         </div>
         <form onSubmit={loginhandle} className='flex-1 relative flex flex-col'>
            <span className='block w-full text-end text-4xl font-bold py-4 px-5'>
               Posity
            </span>
            <div className='flex-1 flex w-full px-5'>
               <div className='m-auto flex flex-col gap-7 w-full 2xl:w-[440px] sm:w-[440px]'>
                  <span className='font-bold text-4xl'>Login</span>
                  <div className='flex flex-col'>
                     <span className='text-sm text-grayV1/70'>Email address</span>
                     <input
                        className='text-xl placeholder-grayV1/70 w-full rounded px-2 py-1 shadow-sm border border-mainDarkV1/20'
                        type='text'
                        name='email'
                        placeholder='example@gmail.com'
                     />
                  </div>
                  <div className='flex flex-col'>
                     <span className='text-sm text-grayV1/70'>Password</span>
                     <input
                        className='text-xl placeholder-grayV1/70 rounded w-full px-2 py-1 shadow-sm border border-mainDarkV1/20'
                        type='password'
                        name='password'
                        placeholder='**********'
                     />
                  </div>
                  <button
                     className='bg-mainDarkV1 text-lightV1 rounded py-1.5 font-medium text-xl'
                     type='submit'>
                     Login
                  </button>
                  <div className='text-end underline leading-3'>
                     <NavLink to='/register'>Create new account</NavLink>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
}
