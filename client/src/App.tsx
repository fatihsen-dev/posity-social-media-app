import axios from "axios";
import { login, register } from "./axios";

function App() {
   const loginHandle = async (e: any) => {
      e.preventDefault();
      const { email, password } = e.target;

      try {
         const res = await login({
            email: email.value,
            password: password.value,
         });
         console.log(res.data);
      } catch (error) {
         console.log(error);
      }
   };
   const registerHandle = async (e: any) => {
      e.preventDefault();
      const { name, email, password } = e.target;

      try {
         const data = await register({
            name: name.value,
            email: email.value,
            password: password.value,
         });

         console.log(data);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div className='container h-full flex justify-center items-center gap-10'>
         <form
            className='flex flex-col gap-3 bg-blue-100 p-5 rounded'
            onSubmit={loginHandle}>
            <input
               className='rounded p-1'
               name='email'
               type='email'
               placeholder='E-mail'
            />
            <input
               className='rounded p-1'
               name='password'
               type='password'
               placeholder='Password'
            />
            <button
               className='bg-blue-500 rounded py-1 text-white hover:bg-blue-500/90'
               type='submit'>
               Login
            </button>
         </form>
         <form
            className='flex flex-col gap-3 bg-blue-100 p-5 rounded'
            onSubmit={registerHandle}>
            <input
               className='rounded p-1'
               name='name'
               type='text'
               placeholder='Full name'
            />
            <input
               className='rounded p-1'
               name='email'
               type='email'
               placeholder='E-mail'
            />
            <input
               className='rounded p-1'
               name='password'
               type='password'
               placeholder='Password'
            />
            <button
               className='bg-blue-500 rounded py-1 text-white hover:bg-blue-500/90'
               type='submit'>
               Register
            </button>
         </form>
      </div>
   );
}

export default App;
