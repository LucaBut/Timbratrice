import React, { Component, useState, nodes } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Nav, NavLink, Bars, NavMenu } from './NavbarElements'
import "./nav.css";
import axios from 'axios';
import swal from 'sweetalert';

function Navbar() {

  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.taget.value);
  }

  // const data = {
  //   search.filter((item) => {}
  //   item.name.includes(search)
  //   ),
  // };

  const history = useNavigate();

  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/logout').then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token', res.data.token);
        localStorage.removeItem('auth_nome', res.data.username);
        swal("Success", res.data.message, "success").then(function () {
          window.location = '/';
        });
        history.push('/');
      }
    });
  }

  // var AuthButtons = '';
  // if (!localStorage.getItem('auth_token')) {
  //   AuthButtons = (
  //     <Nav>
  //       <NavMenu className='navbar-nav'>
  //         <NavLink to="/">
  //           <center>Login</center>
  //         </NavLink>
  //         <NavLink to="/register">
  //           <center>Registrati</center>
  //         </NavLink>
  //       </NavMenu>
  //     </Nav>
  //   )
  // } else if (localStorage.getItem('auth_nome') === 'admin@gmail.com') {
  //   AuthButtons = (
  //     <Nav>
  //       <NavMenu>
  //         <NavLink to="/view">
  //           <center>Lista Utenti</center>
  //         </NavLink>
  //         <NavLink to="/" onClick={logoutSubmit}>
  //           {/* <center><button type="button" onClick={logoutSubmit} className="nav-btn">Logout</button></center> */}
  //           Logout
  //         </NavLink>
  //       </NavMenu>
  //     </Nav>
  //   )
  // } else {
  //   AuthButtons = (
  //     <Nav>
  //       <NavMenu>
  //         <NavLink to="/home" >
  //           <center>Home</center>
  //         </NavLink>
  //         {/* <NavLink to="/view" >
  //           <center>Lista utenti</center>
  //         </NavLink> */}
  //         <NavLink to="/" onClick={logoutSubmit}>
  //           {/* <center><button type="button" onClick={logoutSubmit} className="nav-btn">Logout</button></center> */}
  //           <center>Logout</center>
  //         </NavLink>
  //       </NavMenu>
  //     </Nav>

  //   )
  // }

  var AuthButtons = '';
  if (!localStorage.getItem('auth_token')) {
    AuthButtons = (
      <ul className='nav-bar-bar'>
        <li><a href='/'>Login</a></li>
        <li><a href='/register'>Registrati</a></li>
      </ul>
    )
  } else if (localStorage.getItem('auth_nome') === 'admin@gmail.com') {
    AuthButtons = (
      <ul className='nav-bar-bar'>
        <li><a href='/view'>Lista Utenti</a></li>
        <li className='logout-btn'><a onClick={logoutSubmit}>Logout</a></li>
        <li><a href='/admin'>Dashboard</a></li>
      </ul>

      // <Nav>
      //   <NavMenu>
      //     <NavLink to="/view">
      //       <center>Lista Utenti</center>
      //     </NavLink>
      //     <NavLink to="/" onClick={logoutSubmit}>
      //       {/* <center><button type="button" onClick={logoutSubmit} className="nav-btn">Logout</button></center> */}
      //       Logout
      //     </NavLink>
      //   </NavMenu>
      // </Nav>
    )
  } else {
    AuthButtons = (
      <ul className='nav-bar-bar'>
        <li><a href='/home'>Home</a></li>
        <li className='logout-btn'><a onClick={logoutSubmit}>Logout</a></li>
      </ul>
      // <Nav>
      //   <NavMenu>
      //     <NavLink to="/home" >
      //       <center>Home</center>
      //     </NavLink>
      //     {/* <NavLink to="/view" >
      //       <center>Lista utenti</center>
      //     </NavLink> */}
      //     <NavLink to="/" onClick={logoutSubmit}>
      //       {/* <center><button type="button" onClick={logoutSubmit} className="nav-btn">Logout</button></center> */}
      //       <center>Logout</center>
      //     </NavLink>
      //   </NavMenu>
      // </Nav>

    )
  }




  const pathname = window.location.pathname;
  if (pathname === "/view") {
    var sbar = '';
    sbar = (
      <ul>
        <li><a href='/view'>Lista Utenti</a></li>
        <li className='logout-btn'><a onClick={logoutSubmit}>Logout</a></li>
        <li><a href='/admin'>Dashboard</a></li>
        <li htmlFor="search" className='search-li'>
          Search users:
          <input placeholder='Search...' className="search" type="text" onChange={handleSearch} />
        </li>
      </ul>
    );
  }

  return (

    <>
      <ul className='nav-bar-bar'>
        {/* <li><a href='/home'>Home</a></li>
      <li><a href='/view'>Lista Utenti</a></li> */}
        <li>{AuthButtons}</li>
        <li>{sbar}</li>
      </ul>
      {/* <Nav>
        <NavMenu>
          <NavLink to="/home" >
            <center>Home</center>
          </NavLink>
          <NavLink to="/view" >
            <center>Lista utenti</center>
          </NavLink>
            {AuthButtons}
        </NavMenu>
      </Nav> */}
    </>
  );
};

export default Navbar;