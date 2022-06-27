import React, { Component } from "react";
import "./view.css";
import axios, { Axios } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Table } from "react-bootstrap";
import Moment from "react-moment";
import 'moment-timezone';


class Vista extends Component{

    state = {
        login: [],
        loginf: [],
        user: [],
        loading: true,
    }

   async componentDidMount(){
        const res = await axios.get('http://127.0.0.1:8000/api/utenti');
        // console.log(res.data);

        if(res.data.status === 200){
            this.setState({
                login: res.data.login,
                loginf: res.data.loginf,
                user: res.data.user,
                loading: false,
            })
        }
    }

    render(){

        var utenti_HTMLTABLE = "";
        if(this.state.loading){
            utenti_HTMLTABLE = <tr><td colSpan="6"><h2>Loading...</h2></td></tr>
        }else{
            utenti_HTMLTABLE = 
            this.state.login.map((item) => {
                    return  (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.cognome}</td>
                            <td>{item.email}</td>
                            <td><Moment format="DD-MM-YYYY, HH:mm:ss">{item.orari_inizio}</Moment></td>
                            <td><Moment format="DD-MM-YYYY, HH:mm:ss">{item.orari_fine}</Moment></td>
                        </tr> 
                      )
            });
        }

        return(
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Email</th>
                            <th>Entrata</th>
                            <th>Uscita</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {utenti_HTMLTABLE}
                    </tbody>
                </Table>
        );
    }
}

export default Vista;