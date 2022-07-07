import React, { Component } from "react";
import "./view.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import Moment from "react-moment";
import 'moment-timezone';
import swal from "sweetalert";


class Vista extends Component {

    state = {
        login: [],
        loginf: [],
        user: [],
        loading: true,
    }

        async componentDidMount() {
        if(localStorage.getItem('auth_nome') === 'admin@gmail.com'){
            const res = await axios.get('http://127.0.0.1:8000/api/utenti');
            if (res.data.status === 200) {
            this.setState({
                login: res.data.login,
                loginf: res.data.loginf,
                user: res.data.user,
                loading: false,
            })
        }}else{
            swal({
                icon: "warning",
                text: "Unauthorized"
            }).then(function() {
                window.location='/home';
        });
        }
    }


    render() {

        var utenti_HTMLTABLE = "";
        if (this.state.loading) {
            utenti_HTMLTABLE = <tr><td colSpan="6"><h2>Loading...</h2></td></tr>
        } else {
            utenti_HTMLTABLE =
                this.state.login.map((item) => {
                        return (
                            <tr key={item.id} className='tr-item'>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td><Moment format="DD-MM-YYYY, HH:mm:ss">{item.orari_inizio}</Moment></td>
                                <td><Moment format="DD-MM-YYYY, HH:mm:ss">{item.orari_fine}</Moment></td>
                            </tr>
                        )
                });
        }

        return (
            <>
            <Table striped bordered hover>
                <thead className="thead">
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Entrata</th>
                        <th>Uscita</th>
                    </tr>
                </thead>
                <tbody>
                    {utenti_HTMLTABLE}
                </tbody>
            </Table>
            </>
        );
    }
}

export default Vista;