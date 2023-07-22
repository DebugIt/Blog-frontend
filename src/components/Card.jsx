import axios from 'axios';
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({title, user, content, location, date, imageUrl, postId}) => {
    const isLoggedInUser = () => {
        if(localStorage.getItem("Globeuser_id")===user){
            return true;
        }
        return false
    }
    console.log("post id for post: " ,postId);
    
    const deletePost = async (id) => {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}posts/${id}`)
          .catch(err => console.log(err))
    
        if (res && res.status === 200) {
          const resData = await res.data;
          toast.success("Post deleted", { theme: "colored" })
          window.location.reload(true)
          return resData;
        } else {
          console.log("Unable to delete post")
        }
    }


    return (
    <>
    {/* TODO: image link */}
        <div id="card" className='border rounded pb-3 my-2'>
            <div className='grid grid-cols-3 my-3 px-3'>
                <h5 id="user" className='text-lg text-start'>Debug</h5>
                <h1></h1>
                <h6 className='mt-1 ml-16' onClick={() => deletePost(postId)}>
                    {isLoggedInUser() && <AiOutlineDelete size={25}/>}
                </h6>
            </div>
            <img className='w-full' src={imageUrl} alt="" />
            <h1 id="title" className='px-3 text-2xl'>{title}</h1>
            <h4 id="description" className='font-semibold px-3'>
                {content}
            </h4>
            <div className='grid grid-cols-2 px-3'>
                <h6 id="location">Location: {location}</h6>
                <h6 id="date" className='text-end right-4'>{date}</h6>
            </div>
        </div>

       
        

    </>
  )
}

export default Card