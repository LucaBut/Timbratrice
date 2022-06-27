import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";


export const Nav = styled.nav`
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
  height: 70px;
  align-items: center;
  position: absolute;
  top:0px;
  float: right;
  width: 400px;
`;

export const NavLink = styled(Link)`
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  position: fixed;
  top: 0;
  color: rgb(0, 0, 0);
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div` /*Scritta home*/
  display: flex;
  color: rgb(0, 0, 0);
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;