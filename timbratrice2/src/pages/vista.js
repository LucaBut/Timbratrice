import React from "react";
import "./view.css";
import axios, { Axios } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Vista(){
    const [users_list, setUserList] = useState([]);

    let navigate = useNavigate();

    const Vista = () => {
        Axios.length("http://localhost:3036/view").then((response) => {
            setUserList(response.data);
        });
    };

    return (
        <div className="users">
            <button onClick={Vista}>Show Users</button>
            <h3>
            </h3>
            {users_list.map((val, key) => {
                return (
                    <div className="user">
                        <div>
                            <h3>Email: {val.email}</h3>
                            <h3>Nome: {val.nome}</h3>
                            <h3>Cognome: {val.cognome}</h3>
                            <h3>Orario entrata: {val.ora_inizio}</h3>
                            <h3>Orario uscita: {val.ora_fine}</h3>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}



export default Vista;