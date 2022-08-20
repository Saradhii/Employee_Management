import React from 'react'
import Login from '../Login/Login';
import {Link} from "react-router-dom";
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

const UpdateEmployee = () => {
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
        axios.patch(`https://fake-server-2-app.herokuapp.com/employees/${id}`, formData, {
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
        <h1>EDIT EMPLOYEE DETAILS</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
         <label htmlFor="name">Name</label>
         <input type="text" className='fname' name="name" onChange={handleChange} defaultValue={data.name} required />

         <label htmlFor="email">Contact No</label>
         <input type="text" className='lname' name="contactno" onChange={handleChange} defaultValue={data.contactno} required/>

         <label htmlFor="password">Age</label>
         <input type="text" className='lname' name="age" onChange={handleChange} defaultValue={data.age} required/>
  
         <label htmlFor="username">Salary</label>
         <input type="text" className='lname' name="salary" onChange={handleChange} defaultValue={data.salary} required/>

         <label htmlFor="mobile">Department</label>
         <input type="text" className='lname' name="department" onChange={handleChange} defaultValue={data.department} required/>
         
         <label htmlFor="description">Image</label>
         <input type="text" className='lname' name="img" onChange={handleChange} placeholder="Your image url..." required/>
         
         <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">Employee details updated</Alert>
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

export default UpdateEmployee