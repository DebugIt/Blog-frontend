import React, { useEffect, useState, useContext } from 'react'
import Usernamecontext from '../context/Usernamecontext';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card'
import { GrAdd } from 'react-icons/gr';
import { BiArrowBack } from 'react-icons/bi';

import axios from "axios"

// import dotenv from "dotenv";
// dotenv.config()

const Viewposts = () => {
  const [postData, setPostData] = useState([]);


  const navigate = useNavigate();
    // context state
  const {loggedUserData, setLoggedUserData, isLoggedIn, setIsLoggedIn, username0} = useContext(Usernamecontext)
  
  

  const checkUser = async() => {
    
    try {
        const API_URL = process.env.BASE_URL;
        await fetch(`${process.env.REACT_APP_BASE_URL}auth/home`, {
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          token : localStorage.getItem("tokenGlobe")
      }
        })
        .then(res => {console.log(res)
          if(res.ok === true){
            setIsLoggedIn(true)
            
          }
          
          else{
            navigate("/")
            console.log("authentication",res.message)
          }
            })
      } catch (error) {
        console.log(error)
      }
  }


  
  

  

  const getPosts = async () => {
    try {
      console.log(`myapi: ${process.env.REACT_APP_BASE_URL}`)
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}posts/all`)
      const data = response.data;
      setPostData(data.posts);
      console.log(data.posts)
    } catch (error) {
      console.log(error)
    }
  }
  
  
  
  useEffect(() => {
    checkUser()
    getPosts();
  }, [])
  

  return (
    <>
        <div id="container">
          <div className='grid grid-cols-2'>
            <div className='flex my-3 mx-3'>
              <BiArrowBack size={30} onClick={() => navigate(-1)}/>
              <h1 className='text-3xl font-semibold'>Explore Stories</h1>
            </div>
            
            <button className='text-end px-3 py-3 my-1 mx-4 absolute right-0 rounded-full border cursor-pointer
            '><Link to={"/create"}><GrAdd className=''/></Link></button>
          </div>

          <div id="view-container" className='grid my-5 mx-3
          sm:grid-cols-3 sm:gap-2 
          xl:grid-cols-4 xl:gap-4 
          2xl:grid-cols-6 2xl:gap-5'>

            {postData.map((ele, index) => (
                <Card key={index} title={ele.title} user={ele.user} content={ele.content} location={ele.location} date={new Date(`${ele.date}`).toLocaleDateString()} imageUrl={ele.imageUrl} postId={ele._id}/>

              ))
            }
          
          </div>
        </div>
    </>
  )
}

export default Viewposts