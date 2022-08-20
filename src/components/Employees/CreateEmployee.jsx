import React from 'react';
import Login from '../Login/Login';
import { useState,useEffect } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CreateEmployee = () => {
  const token = localStorage.getItem("token");
    const [data,setData] =useState({});
    const {id} = useParams();

    const [formData, Setformdata] = useState({});
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
      window.location.href="/employees";
    };
    var msg;

    const handleChange = (e)=>{
      let name = e.target.name;
      Setformdata({
      ...formData,
      [name]: e.target.value,
      [name]: e.target.value,
      [name]: e.target.value,
      [name]: e.target.value,
      [name]: e.target.value,
      [name]: e.target.value,
  });
  }

  const handleSubmit = (e)=>{
      e.preventDefault();
      console.log(formData);
      axios.post(`https://fake-server-2-app.herokuapp.com/employees`, formData, {
          headers: { "Content-Type": "application/json" },
        }).then((responce) => {
          const { data } = responce;
          console.log(data);
          msg=data.message;
          setOpen(true);
        });
    };

  return (
    <>{token? <>
      <div className='regmain'>
        <div className='regtitle'>
          <h1>ADD NEW EMPLOYEE </h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
           <label htmlFor="name">Name</label>
           <input type="text" className='fname' name="name" onChange={handleChange} placeholder="enter your name..." required />
  
           <label htmlFor="email">Contact No</label>
           <input type="text" className='lname' name="contactno" onChange={handleChange} placeholder="enter your contact no..." required/>
  
           <label htmlFor="password">Age</label>
           <input type="text" className='lname' name="age" onChange={handleChange} placeholder="enter your age..." required/>
    
           <label htmlFor="username">Salary</label>
           <input type="text" className='lname' name="salary" onChange={handleChange} placeholder="enter your salary..." required/>
  
           <label htmlFor="mobile">Department</label>
           <input type="text" className='lname' name="department" onChange={handleChange} placeholder="department..." required/>
           
           <label htmlFor="description">Image</label>
           <input type="text" className='lname' name="img" onChange={handleChange} placeholder="Your image url..." required/>
           
           <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
          <Alert severity="success">New Employee added</Alert>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Continue</Button>
          </DialogActions>
      </Dialog>
      </>:<Login/>}
      </>
  )
}

export default CreateEmployee