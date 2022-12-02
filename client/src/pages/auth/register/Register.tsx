import { NavLink, useNavigate } from "react-router-dom";
import Image from "../../../assets/images/register.jpg";
import toast from "react-hot-toast";
import { register } from "../../../axios";

export default function Register() {
   const navigate = useNavigate();

   const registerhandle = async (e: any) => {
      e.preventDefault();
      const { name, email, password, confrim } = e.target;

      if (password.value !== confrim.value) {
         return toast.error("Wrong password");
      }

      try {
         await register({
            name: name.value,
            email: email.value,
            password: password.value,
         });

         toast.success("Register success");
         navigate("/login");
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
         <div className='flex-1 relative flex flex-col px-4'>
            <span className='block w-full text-end text-4xl font-bold py-4 px-5'>
               Posity
            </span>
            <div className='flex-1 flex'>
               <form
                  onSubmit={registerhandle}
                  className='m-auto flex flex-col gap-7 2xl:w-[440px] sm:w-[440px] w-full'>
                  <span className='font-bold text-4xl'>Register</span>
                  <div className='flex flex-col'>
                     <span className='text-sm text-grayV1/70'>Full Name</span>
                     <input
                        className='text-xl placeholder-grayV1/70 rounded px-2 py-1 shadow-sm border border-mainDarkV1/20'
                        name='name'
                        type='text'
                        placeholder='Franklin Duncan'
                     />
                  </div>
                  <div className='flex flex-col'>
                     <span className='text-sm text-grayV1/70'>Email address</span>
                     <input
                        className='text-xl placeholder-grayV1/70 rounded px-2 py-1 shadow-sm border border-mainDarkV1/20'
                        type='text'
                        name='email'
                        placeholder='example@gmail.com'
                     />
                  </div>
                  <div className='flex flex-col'>
                     <span className='text-sm text-grayV1/70'>Password</span>
                     <input
                        className='text-xl placeholder-grayV1/70 rounded px-2 py-1 shadow-sm border border-mainDarkV1/20'
                        type='password'
                        name='password'
                        placeholder='**********'
                     />
                  </div>
                  <div className='flex flex-col'>
                     <span className='text-sm text-grayV1/70'>Confrim Password</span>
                     <input
                        className='text-xl placeholder-grayV1/70 rounded px-2 py-1 shadow-sm border border-mainDarkV1/20'
                        type='password'
                        name='confrim'
                        placeholder='**********'
                     />
                  </div>
                  <button
                     className='bg-mainDarkV1 text-lightV1 rounded py-1.5 font-medium text-xl'
                     type='submit'>
                     Register
                  </button>
                  <div className='text-end underline leading-3'>
                     <NavLink to='/login'>Go to login page</NavLink>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}
