import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
        sessionStorage.removeItem('auth_token', res.data.token);
        sessionStorage.removeItem('auth_nome', res.data.username);
        swal("Success", res.data.message, "success").then(function () {
          window.location = '/';
        });
        history.push('/');
      }
    });
  }

  // var AuthButtons = '';
  // if (!sessionStorage.getItem('auth_token')) {
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
  // } else if (sessionStorage.getItem('auth_nome') === 'admin@gmail.com') {
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
        <li className='logout-btn'><a onClick={logoutSubmit}>Logout</a></li>
        <li><a href='/admin'>Add Users</a></li>
      </ul>
      </center>

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
      <center>
      <ul className='nav-bar-bar'>
        <li><a href='/home'>Home</a></li>
        <li><a href='/password'>Change Password</a></li>
        <li><a href='/calendar'>Calendar</a></li>
        <li className='logout-btn'><a onClick={logoutSubmit}>Logout</a></li>
      </ul>
      </center>
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




  // const pathname = window.location.pathname;
  // if (pathname === "/view") {
  //   var sbar = '';
  //   sbar = (
  //     <ul>
  //       <li><a href='/view'>Users log</a></li>
  //       <li className='logout-btn'><a onClick={logoutSubmit}>Logout</a></li>
  //       <li><a href='/admin'>Add Users</a></li>
  //       <li htmlFor="search" className='search-li'>
  //         Search users:
  //         <input placeholder='Search...' className="search" type="text" onChange={handleSearch} />
  //       </li>
  //     </ul>
  //   );
  // }

  return (

    <>
      <ul className='nav-bar-bar'>
        {/* <li><a href='/home'>Home</a></li>
      <li><a href='/view'>Lista Utenti</a></li> */}
        <li>{AuthButtons}</li>
        {/* <li>{sbar}</li> */}
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