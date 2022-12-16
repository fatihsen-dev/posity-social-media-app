import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Main from "./pages";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Profile from "./pages/profile/Profile";
// import Message from "./pages/message/Message";
// import Groups from "./pages/groups/Groups";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/index";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import { allUserFunc, userLogin } from "./store/auth/user";
import { Control, getAllPost, getAllUsers } from "./axios";
import Loading from "./components/Loading";
import Post from "./pages/post/Post";
import { setAllpost } from "./store/posts/post";
function App() {
   const { user, status } = useSelector((state: RootState) => state.userData);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      if (localStorage.getItem("token")) {
         (async () => {
            try {
               const userResponse = await Control({
                  token: localStorage.getItem("token"),
               });
               const postResponse = await getAllPost();
               const allUsersResponse = await getAllUsers();
               dispatch(allUserFunc(allUsersResponse.data));
               dispatch(userLogin({ user: userResponse.data, status: true }));
               dispatch(setAllpost(postResponse.data));
            } catch (error) {
               dispatch(
                  userLogin({
                     user: {
                        _id: "",
                        name: "",
                        email: "",
                        avatar: "",
                        admin: false,
                        token: "",
                     },
                     status: false,
                  })
               );
               navigate("/login");
            }
         })();
      } else {
         dispatch(
            userLogin({
               user: {
                  _id: "",
                  name: "",
                  email: "",
                  avatar: "",
                  admin: false,
                  token: "",
               },
               status: false,
            })
         );
      }
   }, []);

   return (
      <>
         <div className='h-full'>
            <Routes>
               {status ? (
                  <>
                     <Route path='/' element={<Main />}>
                        <Route index element={<Home />} />
                        <Route path='user/:username' element={<Profile />} />
                        {/* <Route path='message' element={<Message />} />
                        <Route path='groups' element={<Groups />} /> */}
                        <Route path='post/:postid' element={<Post />} />
                     </Route>
                     <Route path='*' element={<NotFound />} />
                  </>
               ) : (
                  <>
                     <Route path='/login' element={<Login />} />
                     <Route path='/register' element={<Register />} />
                     <Route path='*' element={<Loading user={user} />}></Route>
                  </>
               )}
            </Routes>
            {status === null && <Loading />}
         </div>
         <Toaster position='top-left' reverseOrder={false} />
      </>
   );
}

export default App;
