import React, { Component } from "react";
import "./view.css";
import axios, { Axios } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

class Vista extends Component{

    state = {
        utenti: [],
        loading: true,
    }

   async componentDidMount(){
        const res = await axios.get('http://127.0.0.1:8000/api/utenti');
        console.log(res.data);

        if(res.data.status === 200){
            this.setState({
                utenti: res.data.utenti,
                loading: false,
            })
        }
    }

    render(){

        var utenti_HTMLTABLE = "";
        if(this.state.loading){
            utenti_HTMLTABLE = <tr><td colSpan="7"><h2>Loading...</h2></td></tr>
        }else{
            utenti_HTMLTABLE = 
            this.state.utenti.map((item) => {
              return  (
                <tr key={item.cognome}>
                    <td>{item.nome}</td>
                    <td>{item.cognome}</td>
                    <td>{item.email}</td>
                </tr>
              )
            });
        }

        return(
            <div className="utenti">
                <table className="tutenti">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utenti_HTMLTABLE}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Vista;