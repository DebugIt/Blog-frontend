import React, {useContext, useEffect} from 'react'
import Usernamecontext from '../context/Usernamecontext';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css'

const Home = () => {

    const navigate = useNavigate();
    // context state
    const {loggedUserData, setLoggedUserData, isLoggedIn, setIsLoggedIn, username0} = useContext(Usernamecontext)
    
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
                console.log(res.message)
            }
            else{
                setIsLoggedIn(true)
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

  const getUser = localStorage.getItem("GlobeUser");


  return (
    <>
        <div id="container" className="flex justify-center my-28">
            <div className="grid">
                <h1 className='font-bold text-4xl sm:text-7xl '>Welcome</h1>
                <h3 className='font-bold text-3xl out-text' >{getUser}</h3>
            </div>
        </div>
        <div id="buttons" className='flex justify-center gap-2 rounded text-white'>
            {/* <div className='grid grid-cols-2 gap-2'> */}
                <button className='border py-3 px-3 bg-[#252525] rounded
                hover:bg-black transition duration-300 ease-in-out
                '><Link to={"/explore"}>Explore Stories</Link></button>
                <button className='border py-3 px-3 bg-[#252525] rounded
                hover:bg-black transition duration-300 ease-in-out
                '><Link to={"/create"}>Share Your's</Link></button>
            {/* </div> */}
        </div>
    </>
  )
}

export default Home