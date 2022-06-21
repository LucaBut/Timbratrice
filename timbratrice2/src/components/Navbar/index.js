import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";


const Navbar = () => {
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
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;