import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Usernamecontext from '../context/Usernamecontext';
import axios from "axios"
// toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // context states
  const {username0, setUsername0, loggedUserData, setLoggedUserData, isLoggedIn, setIsLoggedIn} = useContext(Usernamecontext)

  console.log(process.env.REACT_APP_BASE_URL)

  // Login user
  const handleLogin = async() => {
    const credentials = {username, password};

    
    if(username === "" || password === ""){
      toast.error("Please fill all the fields", {theme:"dark"})
    }
    else{
      try {
        let response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/login`, credentials)
        console.log(response)
        setUsername("")
        setPassword("")
        if(response.data.success === true){
          localStorage.setItem("tokenGlobe", response.data.token);
          localStorage.setItem("GlobeUser", response.data.user.username);
          localStorage.setItem("Globeuser_id", response.data.user._id)
          const profile_value = response.data.user.username;
          navigate("/home")
          toast.success("Successfully Logged-in!", {
            position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, theme: "colored",
          }); 
          setUsername0(profile_value)
          setLoggedUserData(response.data)
          setIsLoggedIn(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  

  // Signup user
  const handleSignup = async() => {
    const credentials = {username, password};

    
    if(username === "" || password === ""){
      toast.error("Please fill all the fields", {theme:"dark"})
    }
    else if(password.length < 6){
      toast.error("Password must be of 6 or more characters", {theme:"dark"})
    }
    else{
      // 
      try {
        let response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/register`, credentials)
        console.log(response)
        setUsername("")
        setPassword("")
        toast.success("User Registered, Kindly Login", {
          position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, theme: "colored",
        });
      } catch (error) {
        console.log(error.response.data)
        if(error.response?.data.success){
          console.log("user already existing")
          toast.error("User Already Exists with same username, try a different one or Login", {theme:"dark"})
        }
      }
    }
    


    

  }

  

  const getUsertoken = localStorage.getItem("tokenGlobe")

  // const checkForUser = async() => {
  //   if (!getUsertoken){
  //     navigate("/");
  //   }
  //   else{
  //     navigate("/home")
  //     toast.success("Welcome Back!", {
  //       position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, theme: "colored",
  //     }); 
  //   }
  // }

  useEffect(() => {
    // checkForUser()
  }, [])
  


  return (
    <>
      <div className='h-[100vh] flex justify-center'>
        <div id="container" className=' my-20 '>
          <h4 className='text-3xl font-semibold py-4'>Login/Signup</h4>
          <div className='grid'>
            <label htmlFor="username" className='text-sm'>Username</label>
            <input type="text" className='border h-10 px-1 sm:px-2 ' name="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
          </div>

          <div className='grid'>
            <label htmlFor="username" className='text-sm'>Password</label>
            <input type="password" className='border h-10 px-1 sm:px-2 ' name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <div className='grid grid-cols-2 my-4'>
            <button onClick={handleLogin} className='border bg-[#252525] text-gray-100 py-3 hover:bg-[#141414] transition ease-in-out duration-300 rounded'>Login</button>
            <button onClick={handleSignup} className='border bg-[#252525] text-gray-100 py-3 hover:bg-[#141414] transition ease-in-out duration-300 rounded'>SignUp</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth