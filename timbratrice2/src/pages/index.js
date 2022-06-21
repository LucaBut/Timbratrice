// import React from 'react';
import React, { useState, useEffect, Component } from 'react';
import "./index.css";
import axios from 'axios';

var data = new Date();
var Hh, Mm, Ss, m, a, dd, b;

Hh = data.getHours();
Mm = data.getMinutes();
Ss = data.getSeconds();
m = data.getMonth();
a = data.getFullYear();
dd = data.getDate();

const Home = () => {

return (
    <div className='App'>
        <center><h1 className='title'>Benvenuto nell'azienda</h1></center>
        <button className="b1">Timbro inizio turno</button>
        <h4 className='clock'>{("Sono le ore: " + Hh + ":" + Mm + ":" + Ss + " del giorno: " + dd + "-" + m + "-" + a).toString()}</h4>
        <button className="b2">Timbro fine turno</button>
    </div>
);

}

export default Home;
