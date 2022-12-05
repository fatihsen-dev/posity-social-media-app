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
         return toast.error(error.response.data.message);
      }
   };
   return (
      <div className='flex h-full'>
         <div className='flex-1 hidden 2xl:inline-block lg:inline-block'>
            <img className='object-cover w-full h-full' src={Image} alt='' />
         </div>
         <div className='relative flex flex-col flex-1 px-4'>
            <span className='block w-full px-5 py-4 text-4xl font-bold text-end'>
               Posity
            </span>
            <div className='flex flex-1'>
               <form
                  onSubmit={registerhandle}
                  className='m-auto flex flex-col gap-7 2xl:w-[440px] sm:w-[440px] w-full'>
                  <span className='text-4xl font-bold'>Register</span>
                  <div className='flex flex-col'>
                     <span className='text-sm text-grayV1/70'>Full Name</span>
                     <input
                        className='px-2 py-1 text-xl border rounded shadow-sm placeholder-grayV1/70 border-mainDarkV1/20'
                        name='name'
                        type='text'
                        placeholder='Franklin Duncan'
                     />
                  </div>
                  <div className='flex flex-col'>
                     <span className='text-sm text-grayV1/70'>Email address</span>
                     <input
                        className='px-2 py-1 text-xl border rounded shadow-sm placeholder-grayV1/70 border-mainDarkV1/20'
                        type='text'
                        name='email'
                        placeholder='example@gmail.com'
                     />
                  </div>
                  <div className='flex flex-col'>
                     <span className='text-sm text-grayV1/70'>Password</span>
                     <input
                        className='px-2 py-1 text-xl border rounded shadow-sm placeholder-grayV1/70 border-mainDarkV1/20'
                        type='password'
                        name='password'
                        placeholder='**********'
                     />
                  </div>
                  <div className='flex flex-col'>
                     <span className='text-sm text-grayV1/70'>Confrim Password</span>
                     <input
                        className='px-2 py-1 text-xl border rounded shadow-sm placeholder-grayV1/70 border-mainDarkV1/20'
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
                  <div className='leading-3 underline text-end'>
                     <NavLink to='/login'>Go to login page</NavLink>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}
