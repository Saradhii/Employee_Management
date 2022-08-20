import React from 'react';
import Login from '../Login/Login';
import {Link} from "react-router-dom";
import { useState,useEffect } from "react";
import {useParams} from "react-router-dom";

const SingleEmployee = () => {
  const token = localStorage.getItem("token");
  const [data,setData] =useState({});
  const {id} = useParams();


  useEffect(() => {
    const getdata= async()=>{
       let res = await fetch(`https://fake-server-2-app.herokuapp.com/employees/${id}`,{
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
    {token?<>
      <div className='profile'>
        <div className='profimg'>
            <img className='sprofimg' src={data.img}/><br></br>
            <h1>{data.name}</h1>
        </div>
        <div className='profdetails'>
           <p>Name:&nbsp;&nbsp;{data.name}</p>
           <p>Age:&nbsp;&nbsp;{data.age}</p>
           <p>Contact No:&nbsp;&nbsp;{data.contactno}</p>
           <p>Salary:&nbsp;&nbsp;{data.salary}</p>
           <p>Department:&nbsp;&nbsp;{data.department}</p>
           <Link to="/employees"><button className='button'>Go back</button></Link>
        </div>
    </div>
    </>:<Login/>}
    </>
  )
}

export default SingleEmployee