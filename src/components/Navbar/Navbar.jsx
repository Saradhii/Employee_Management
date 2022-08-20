import React from 'react'
import "./Styles.css";
import Alert from '@mui/material/Alert';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Navbar = () => {
    let token = localStorage.getItem("token");
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
    setOpen(false);
    window.location.href="/";
    };

    const handleclick =()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setOpen(true);
    }
  return (
    <>
    {token ? <div className='header'>
       <Link to="/"><h3>Home</h3></Link> 
       <Link to="/logout"><h3 onClick={handleclick}>Logout</h3></Link>
       <Link to="/register"><h3>Register</h3></Link> 
       <Link to="/employees"><h3>Employees</h3></Link>
    </div> : 
       <div className='header'>
       <Link to="/"><h3>Home</h3></Link> 
       <Link to="/login"><h3>Login</h3></Link>
       <Link to="/register"><h3>Register</h3></Link> 
       <Link to="/employees"><h3>Employees</h3></Link>
    </div>}

    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">User Logged out successfully</Alert>
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

export default Navbar