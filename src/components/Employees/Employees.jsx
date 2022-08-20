import React from 'react';
import { useState,useEffect } from "react";
import Login from '../Login/Login';
import {Link} from "react-router-dom"
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Employees = () => {
  const [data,setData] = useState([]);
  const token=localStorage.getItem("token");
  const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
      window.location.reload();
    };

    useEffect(() => {
    const getdata= async()=>{
       let res = await fetch(`https://fake-server-2-app.herokuapp.com/employees`,{
           method:"GET"
         });
         let data = await res.json();
         setData(data)
         console.log(data);
    }
    getdata();
  }, []);

 const deleteItem = async (id) => {
  setOpen(true);
  let res = await fetch(`https://fake-server-2-app.herokuapp.com/employees/${id}`, {
    method: "DELETE",
  });
  let Newdata = await res.json();
  setData(...Newdata);
};

  return (
    <>
    {token?<>
      <div className='emain'>
         <div className='etitle'>
          <h1>All Emplyee details</h1>
          <Link to="/employee/create"><button>Add New Employee</button></Link>
         </div>
         <div className='edata'>
              <div className='itemh'>
                <p>Image</p>
                <p>Name</p>
                <p>Contact No</p>
                <p>Age</p>
                <p>Department</p>
                <p>Salary</p>
                <p>View</p>
                <p>Edit</p>
                <p>Delete</p>
              </div>
          { data && data.map((e)=>{
            return(
              <>
              <div className='item'>
                <img src={e.img}/>
                <p>{e.name}</p>
                <p>{e.contactno}</p>
                <p>{e.age}</p>
                <p>{e.department}</p>
                <p>{e.salary}</p>
                <Link to={`/employees/${e.id}`}><button>View</button></Link>
                <Link to={`/employees/${e.id}/edit`}><button>Edit</button></Link>
                <button onClick={() => {deleteItem(e.id)}}>Delete</button>
              </div>
              </>
            )
          })}
         </div>
      </div>
    </>:<Login/>}
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">Item deleted</Alert>
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

export default Employees