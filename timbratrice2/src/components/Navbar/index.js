import React, { Component } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, } from './NavbarElements'
import "./nav.css";
import axios from 'axios';
import swal from 'sweetalert';

function Navbar() {

  const history = useNavigate();

  const logoutSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location = '/';
    axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
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
    });
  }

  var AuthButtons = '';
  if (!localStorage.getItem('auth_token')) {
    AuthButtons = (
      <Nav>
        <NavMenu className='navbar-nav'>
          <NavLink to="/" activeStyle>
            <center>Login</center>
          </NavLink>
          <NavLink to="/register" activeStyle>
            <center>Registrati</center>
          </NavLink>
        </NavMenu>
      </Nav>
    )
  } else {
    AuthButtons = (
      <NavLink to="/" >
        <center><button type="button" onClick={logoutSubmit} className="nav-btn">Logout</button></center>
      </NavLink>
    )
  }

  return (

    <>
      <Nav>
        <NavMenu>
          <NavLink to="/home" activeStyle>
            <center>Home</center>
          </NavLink>
          <NavLink to="/view" activeStyle>
            <center>Lista utenti</center>
          </NavLink>
          <NavLink to="/" >
            {AuthButtons}
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;