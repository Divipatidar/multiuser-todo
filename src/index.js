import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './LoginSignup.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';
import ForgetPassword from './components/ForgetPassword';

const root = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Welcome/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/forgetPassword" element={<ForgetPassword/>} />
    </Routes>  
  </BrowserRouter >,
);
