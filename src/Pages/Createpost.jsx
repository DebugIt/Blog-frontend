import React, {useContext, useEffect, useState} from 'react'
import Usernamecontext from '../context/Usernamecontext';
import { SiYourtraveldottv } from 'react-icons/si';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
// toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import '../index.css'

const Createpost = () => {

    const [inputs, setInputs] = useState({
        title:"",
        content:"",
        location:"",
        imageUrl:"",
        date:""
    })
    const handleChange = (e) => {
        setInputs((prevState) => ({...prevState, [e.target.name]:e.target.value}))
    }

    const navigate = useNavigate();

    const createPost = async() => {
        const res = axios.post(`${process.env.REACT_APP_BASE_URL}posts/create-post`, {
            title:inputs.title,
            content:inputs.content,
            location:inputs.location,
            imageUrl:inputs.imageUrl,
            date:inputs.date,
            user:localStorage.getItem('Globeuser_id')
        }).catch(error => console.log(error));

        if(res.status === 200){
            const resData = await res.data;
            toast.success("Post Created", {theme:"colored"})
            console.log(resData)
        }
        toast.success("Post Created", {theme:"colored"})

        
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        createPost();
    }



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
        <div id="container">
            <div className='flex gap-2 my-8 text-2xl font-semibold justify-center'>
                <BiArrowBack size={30} onClick={() => navigate(-1)}/>
                <h1 className=''>Share your unique experience </h1><SiYourtraveldottv size={30} />
            </div>
            {/*  */}
            <div id="formContainer" className='flex justify-center'>
                <div id="" className='grid'>
                    <input className='border py-2 px-3 my-1 rounded focus:border-b-2 focus:border-black focus:outline-none' type="text" name='title' value={inputs.title} onChange={handleChange} placeholder='Enter Title'/>
                    <textarea className='border py-2 px-3 my-1 rounded focus:border-b-2 focus:border-black focus:outline-none' rows="4" cols="50" placeholder='Share your story...' name='content' value={inputs.content} onChange={handleChange}></textarea>
                    <input className='border py-2 px-3 my-1 rounded focus:border-b-2 focus:border-black focus:outline-none' type="text" placeholder='Enter Location' name='location' value={inputs.location} onChange={handleChange}/>
                    <input className='border py-2 px-3 my-1 rounded focus:border-b-2 focus:border-black focus:outline-none' type="text" placeholder='Enter Image Url' name='imageUrl' value={inputs.imageUrl} onChange={handleChange}/>
                    <input className='border py-2 px-3 my-1 rounded focus:border-b-2 focus:border-black focus:outline-none' type="text" value={localStorage.getItem("Globeuser_id")} disabled placeholder='Enter user'/>                
                    <input className='border py-2 px-3 my-1 rounded focus:border-b-2 focus:border-black focus:outline-none' type="date" name='date' value={inputs.date} onChange={handleChange}/>                
                    <button className='px-3 my-1 rounded border bg-[#252525] text-gray-100 py-3 hover:bg-[#141414] transition ease-in-out duration-300' onClick={handleSubmit}>Post</button>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default Createpost