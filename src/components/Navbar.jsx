import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Usernamecontext from '../context/Usernamecontext'
// icons
import {BsGlobeCentralSouthAsia} from "react-icons/bs"
import {BiLogIn} from "react-icons/bi"
import {FaRegCircleUser} from "react-icons/fa6"
// toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const navigate = useNavigate();
  const {username0, setUsername0, isLoggedIn, setIsLoggedIn} = useContext(Usernamecontext)

  const logoutUser = async() => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}auth/logout`, {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      }).then(res => {console.log(res); navigate("/"); toast.error("Successfully Logged-out!", {
        position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, theme: "colored",
        }); localStorage.removeItem("tokenGlobe"); localStorage.removeItem("GlobeUser"); localStorage.removeItem("Globeuser_id")})
    } catch (error) {
      console.log(error)
    }
  }

  const getUser = localStorage.getItem("GlobeUser");
  const getUsertoken = localStorage.getItem("tokenGlobe")

  useEffect(() => {
    if(getUsertoken !== ""){
      console.log("user logged in!")
    }else{
      console.log("unauthorized")
    }
  }, [])
  

  return (
    <>
        <div id="container" className='grid place-items-center grid-cols-3 py-5 border'>
          <div id="button-navigation" className='text-right font-semibold'>
           {/* {<button onClick={() => {logoutUser(); setIsLoggedIn(false)}}>Logout</button> } */}
           {isLoggedIn ? <button onClick={() => {logoutUser(); setIsLoggedIn(false)}}>Logout</button> : ""}

          </div>
          <div id="heading-logo" className='grid place-items-center'>
            <BsGlobeCentralSouthAsia onClick={() => navigate('/home')} size={35}/>
          </div>
          <div id="username-box" className='font-semibold'>
             {getUser}
          </div>
        </div>
    </>
  )
}

export default Navbar