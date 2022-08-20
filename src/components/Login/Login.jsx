import React from 'react';
import { useState,useEffect } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Login = () => {
  const [formData, Setformdata] = useState({});
  const [open, setOpen] = React.useState(false);
  const [msg,setMsg] = useState("");
  const handleClose = () => {
    setOpen(false);
    window.location.href="/";
  };

    const handleChange = (e)=>{
        let name = e.target.name;
        Setformdata({
        ...formData,
        [name]: e.target.value,
        [name]: e.target.value,
    });
    }
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
        axios.post(`https://masai-api-mocker.herokuapp.com/auth/login`, formData, {
            headers: { "Content-Type": "application/json" },
          }).then((responce) => {
            const { data } = responce;
            console.log(data);
            setOpen(true);
            if(data.error)
            {
              let msg=data.message;
              setMsg(msg);
            }
            else{
              let msg="Login success";
              localStorage.setItem("token",data.token);
              localStorage.setItem("username",formData.username);
              setMsg(msg);
            }
          });
      };
      console.log(msg);

  return (
    <>
    <div className='regmain'>
      <div className='regtitle'>
            <h1>LOGIN</h1>
      </div>
      <div>
      <form onSubmit={handleSubmit}>

         <label htmlFor="username">Username</label>
         <input type="text" className='lname' name="username" onChange={handleChange} placeholder="Your username.." required/>

         <label htmlFor="password">Password</label>
         <input type="text" className='lname' name="password" onChange={handleChange} placeholder="Your password.." required/>

         <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>

    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">{msg}</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default Login