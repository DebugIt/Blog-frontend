import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import './App.css';
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Usernamecontext from "./context/Usernamecontext";
import { useState, useEffect } from "react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from "./Pages/Createpost";
import Viewposts from "./Pages/Viewposts";

function App() {

  const [username0, setUsername0] = useState("")
  const [loggedUserData, setLoggedUserData] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkUser = async() => {
    try {
        await fetch("http://localhost:5000/auth/home", {
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                token : localStorage.getItem("tokenGlobe")
            }
        })
        .then(res => {console.log(res)
        if(res.ok === false){
            window.location.pathname("/")
            console.log(res.message)
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
    <Usernamecontext.Provider value={{username0, setUsername0, loggedUserData, setLoggedUserData, isLoggedIn, setIsLoggedIn}}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Auth />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/create" element={<Createpost />}/>
          <Route path="/explore" element={<Viewposts />}/>
        </Routes>
      </Router>
      <ToastContainer position="top-right"
        autoClose={2000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />    
    </Usernamecontext.Provider>
  );
}

export default App;
