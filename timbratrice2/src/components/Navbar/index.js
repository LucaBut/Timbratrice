import React from 'react';
import "./nav.css";
import axios from 'axios';
import swal from 'sweetalert';

function Navbar() {

  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/logout').then(res => {
      if (res.data.status === 200) {
        sessionStorage.removeItem('auth_token', res.data.token);
        sessionStorage.removeItem('auth_nome', res.data.username);
        swal("Success", res.data.message, "success").then(function () {
          window.location = '/';
        });
      }
    });
  }


  var AuthButtons = '';
  if (!sessionStorage.getItem('auth_token')) {
    AuthButtons = (
      <center>
      <ul className='nav-bar-bar'>
        <li><a href='/'>Login</a></li>
        <li><a href='/register'>SignUp</a></li>
      </ul>
      </center>
    )
  } else if (sessionStorage.getItem('auth_nome') === 'admin@gmail.com') {
    AuthButtons = (
      <center>
      <ul className='nav-bar-bar'>
        <li><a href='/view'>Users log</a></li>
        <li><a href='/admin'>Add Users</a></li>
        <li><a href='/fullcalendar'>Events on calendar</a></li>
        <li><a href='/addEvent'>Add events to users</a></li>
        <li><a href='/export'>Export data</a></li>
        <li className='logout-btn'><a onClick={logoutSubmit}>Logout</a></li>
      </ul>
      </center>

    )
  } else {
    AuthButtons = (
      <center>
      <ul className='nav-bar-bar'>
        <li><a href='/home'>Home</a></li>
        <li><a href='/password'>Change Password</a></li>
        <li><a href='/calendar'>Calendar shifts</a></li>
        <li><a href='/fullcalendar'>Events on calendar</a></li>
        <li className='logout-btn'><a onClick={logoutSubmit}>Logout</a></li>
      </ul>
      </center>
    )
  } 

  return (

    <>
      <ul className='nav-bar-bar'>
        <li>{AuthButtons}</li>
      </ul>
    </>
  );
};

export default Navbar;