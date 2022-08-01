import React, { useEffect, useState } from "react";
import "./view.css";
import axios from "axios";
import Moment from "react-moment";
import 'moment-timezone';
import swal from "sweetalert";


function Vista(){

    const [login, setLogin] = useState([]);
    const [loginf, setLoginf] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {       //Fetch data when page mount
        
            let isMounted = true;

                axios.get('http://127.0.0.1:8000/api/utenti').then(res => {
                if(isMounted){
                    if(res.status === 200){
                        setLogin(res.data.login);   //Assign to consts the res data
                        setLoginf(res.data.loginf);
                        setUser(res.data.user);
                        setLoading(false);
                    } else{
                        swal({
                            icon: 'warning',
                            text: 'Error loading users'
                        })
                    }
                }
                })
            
            return () => {
                isMounted = false;
            }
        
    }, [])


    var utenti_HTMLTABLE = "";      //Creating a var for mapping response data and then assign to table
    if(loading){
        utenti_HTMLTABLE = <tr><td colSpan="6"><h2>Loading...</h2></td></tr>    
    }else{
        utenti_HTMLTABLE = login.map((item) => {    //Map response
            return(                                  
                <tr key={item.id} className="tr-item">       {/* Create the response data for the table */}
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td><Moment format="YYYY-MM-DD, HH:mm:ss">{item.orari_inizio}</Moment></td>
                    <td><Moment format="YYYY-MM-DD, HH:mm:ss">{item.orari_fine}</Moment></td>
                </tr>
            )
        })
    }


    return (
        <div>
        <div className="admin-table">       
            <table>                             {/* Create table */}
                <thead className="thead">
                    <tr>
                        <th>ID</th>                 
                        <th>Email</th>
                        <th>Start Shift</th>
                        <th>End Shift</th>
                    </tr>
                </thead>
                <tbody>                         {/* Assing to the table body the map item inside utenti_HTMLTABLE var */}
                    {utenti_HTMLTABLE}
                </tbody>
            </table>
        </div>
        </div>
    )

}


export default Vista;