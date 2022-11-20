import { NavLink } from "react-router-dom";
import Image from "../../../assets/images/login.jpg";
import toast from "react-hot-toast";
import { login } from "../../../axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../../store/auth/user";

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

         console.log(response.data);
         toast.success("Login success");
         dispatch(userLogin(response.data));
         navigate("/");
      } catch (error: any) {
         console.log(error.response);
         return toast.error(error.response.data.message);
      }
   };
   return (
      <div className='h-full flex'>
         <div className='flex-1'>
            <img className='w-full h-full object-cover' src={Image} alt='' />
         </div>
         <form onSubmit={loginhandle} className='flex-1 relative flex flex-col'>
            <span className='block w-full text-end text-4xl font-bold py-4 px-5'>
               Posity
            </span>
            <div className='flex-1 flex'>
               <div className='m-auto flex flex-col gap-7'>
                  <span className='font-bold text-4xl'>Login</span>
                  <div className='flex flex-col'>
                     <span className='text-sm text-grayV1/70'>Email address</span>
                     <input
                        className='text-xl placeholder-grayV1/70 rounded w-96 px-2 py-1 shadow-sm border border-mainDarkV1/20'
                        type='text'
                        name='email'
                        placeholder='example@gmail.com'
                     />
                  </div>
                  <div className='flex flex-col'>
                     <span className='text-sm text-grayV1/70'>Password</span>
                     <input
                        className='text-xl placeholder-grayV1/70 rounded w-96 px-2 py-1 shadow-sm border border-mainDarkV1/20'
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
