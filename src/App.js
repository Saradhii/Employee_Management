import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from "./components/Login/Login";
import Register from './components/Register/Register';
import SingleEmployee from './components/Employees/SingleEmployee';
import Employees from './components/Employees/Employees';
import CreateEmployee from './components/Employees/CreateEmployee';
import UpdateEmployee from './components/Employees/UpdateEmployee';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route default path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/employee/create' element={<CreateEmployee/>}/>
        <Route path='/employees/:id' element={<SingleEmployee/>}/>
        <Route path='/employees/:id/edit' element={<UpdateEmployee/>}/>
    </Routes>
    </>
  );
}

export default App;
