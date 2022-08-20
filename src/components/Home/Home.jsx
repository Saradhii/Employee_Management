import React from 'react';
import Login from "../Login/Login";
import {Link} from "react-router-dom"
import { useState,useEffect } from "react";

const Home = () => {
    const [data,setData] =useState({});

    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username");
    console.log(token);

    useEffect(() => {
        const getdata= async()=>{
           let res = await fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`,{
               method:"GET",
               headers: {
                   "Authorization": `Bearer ${token}`,
                 },
             });
             let data = await res.json();
             setData(data)
             console.log(data);
        }
        getdata();
     }, []);

  return (
    <>
    {token ? 
    <>
    <div className='profile'>
        <div className='profimg'>
            <img src="https://p.kindpng.com/picc/s/455-4559042_art-hudson-user-icon-small-size-hd-png.png"/><br></br>
            <h3>{username}</h3>
        </div>
        <div className='profdetails'>
           <p>Name:&nbsp;&nbsp;{data.name}</p>
           <p>Email:&nbsp;&nbsp;{data.email}</p>
           <p>Username:&nbsp;&nbsp;{data.username}</p>
           <p>Mobile:&nbsp;&nbsp;{data.mobile}</p>
           <p>Description:&nbsp;&nbsp;{data.description}</p>
           <Link to="/employees"><button className='button'>Employees</button></Link>
        </div>
    </div>
    </> :<Login/> }
    </>
  )
}

export default Home