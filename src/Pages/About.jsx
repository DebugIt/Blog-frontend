import React, {useContext, useEffect} from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import Usernamecontext from '../context/Usernamecontext';


const About = () => {

    const navigate = useNavigate();
    // context state
    const {loggedUserData, setLoggedUserData, isLoggedIn, setIsLoggedIn} = useContext(Usernamecontext)
    
    const checkUser = async() => {
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}auth/home`, {
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    token : localStorage.getItem("tokenGlobe")
                }
            })
            .then(res => {console.log(res)
            if(res.ok === false){
                navigate("/")
            }else{
                setIsLoggedIn(true);
            }
            })
        } catch (error) {
            console.log(error)
        }
    }

    // authentication
    useEffect(() => {
      checkUser()
    }, [])
    


  return (
    <div>About - only to be accessed with token <Link to={"/home"}>home</Link></div>
  )
}

export default About