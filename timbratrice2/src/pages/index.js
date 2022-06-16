import React from 'react';
import "./index.css";

var data = new Date();

var Hh, Mm, Ss, m, a, dd;

Hh = data.getHours();
Mm = data.getMinutes();
Ss = data.getSeconds();
m = data.getMonth();
a = data.getFullYear();
dd = data.getDate();

const Home = () => {
    return (
        <div className='App'>
            <h1 className='title'><center>BENVENUTO NELL'AZIENDA</center></h1>
            <button className="b1">Timbro inizio turno</button>
            <h4 className='clock'>{("Sono le ore: " + Hh + ":" + Mm + ":" + Ss + " del giorno: " + dd + "-" + m + "-" + a).toString()}</h4>
            <button className="b2">Timbro fine turno</button>
        </div>
    );
};

export default Home;
