import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import Moment from "react-moment";

// class Times extends Component {

//     state = {
//         login: [],
//     }

//     async componentDidMount() {
//         let email
//         const data = this.contex
//         console.log(data)
//         email = sessionStorage.getItem('auth_nome');
//         // axios.post('http://127.0.0.1:8000/api/calendario', data);
//         const res = await axios.get(`http://127.0.0.1:8000/api/calendar-start/${email}`);
//         if (res.data.status === 200) {
//             this.setState({
//                 login: res.data.login,
//             })
//         }
//     }

//     render() {
//         var utente_HTMLTABLE =
//             this.state.login.map((item) => {
//                 return (
//                     <tr key={item.id} className='tr-item'>
//                         <td>{item.id}</td>
//                         <td>{item.email}</td>
//                         <td>{item.date_two}</td>
//                         <td>{item.date_end}</td>
//                     </tr>
//                 )
//             });

//         return (
//             <>
//                 <table>
//                     <thead className="thead">
//                         <tr>
//                             <th>ID</th>
//                             <th>Email</th>
//                             <th>Start Shift</th>
//                             <th>End Shift</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {utente_HTMLTABLE}
//                     </tbody>
//                 </table>
//             </>
//         );

//     }

// }

export default Times;



function Times(){
    const [login, setLogin] = useState({
        login: [],
    })

    const email = sessionStorage.getItem('auth_nome');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/calendar-start/${email}`).then(res => {
            login = ({
                login: res.data.login,
        })
        })
    })

        login.login.map((item) => {
            return(
                <table>
                <thead className="thead">
                    <tr>
                        <th>Email</th>
                        <th>Start Shift</th>
                    </tr>
                </thead>
                <tbody>
                <tr key={item.id} className="tr-item">
                    <td>{item.email}</td>
                    <td><Moment format="YYYY-MM-DD">{item.orari_inizio}</Moment></td>
                </tr>
                </tbody>
                </table>
            )
        })
}





































































































// import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import Moment from "react-moment";
// import 'moment-timezone';
// import contex from "./contex";


// function Times(props) {

//     // const [event, setEvent] = useState(null)
//     const [info, setInfo] = useState(false)
//     const date = useContext(contex);
//     // console.log(date);

//     function displayInfo(e) {
//         setInfo(true);
//         //     setEvent(e.target.innerText);
//     }

//     // const [start, setStart] = useState({
//     //     login: [],
//     //     email: '',
//     //     date_two: '',
//     // })
//     const [start, setStart] = useState({
//         email: '',
//         orari_inizio: '',
//     })

//     const [state, setState] = useState({
//         login: [],
//     })


//     // const [start, setStart] = useState({
//     //     email: '',
//     //     ora: '',
//     // })


//     function init_data() {
//         start.orari_inizio = { date };
//         start.email = sessionStorage.getItem('auth_nome');
//         const data = {
//             email: start.email,
//             orari_inizio: start.orari_inizio,
//         }

//         axios.post('http://127.0.0.1:8000/api/calendario', data).then(res => {
//             // console.log(res.data)
//         });
//     }

//     useEffect(() => {
//         init_data()
//         const email = start.email;
//         axios.get(`http://127.0.0.1:8000/api/calendar-start/${email}`).then(res => {
//             setStart.email = res.data.email;
//             setStart.orari_inizio = res.data.orari_inizio;
//             setState.login = res.data.login;
//             // console.log(res.data.orari_inizio);
//         })
//     })


//     // const startSubmit = (e) => {
//     //     e.preventDefault();
//     //     // console.log({ora});
//     //     // start.orari_inizio = { ora };
//     //     // <Time orari_inizio = {props.date} />

//     //     // <Calendario orari_inizio = {date} />
//     //     // console.log({date})
//     //     // console.log(<Calendario orari_inizio = {props.date}/>)
//     //     // start.orari_inizio = <Calendario orari_inizio = {props.date}/>
//     //     // console.log(<Moment format="YYYY-DD-MM"><Calendario orari_inizio = {props.date}/></Moment>)
//     //     console.log({date});
//     //     start.orari_inizio = {date};
//     //     start.email = sessionStorage.getItem('auth_nome');
//     //     const data = {
//     //         email: start.email,
//     //         orari_inizio: start.orari_inizio,
//     //     }

//     //     // axios.post('http://127.0.0.1:8000/api/ora');

//     //     axios.post('http://127.0.0.1:8000/api/calendario', data);

//     //     axios.get('http://127.0.0.1:8000/api/calendar-start', data).then(res => {
//     //         if (res.data.status === 200) {
//     //             setStart({
//     //                 login: res.data.login,
//     //                 email: start.email,
//     //                 orari_inizio: start.orari_inizio,
//     //             })
//     //         }
//     //     })
//     // }

//     // console.log(<Moment format="YYYY-DD-MM"><Calendario orari_inizio = {props.date}/></Moment>)

//     // var utente_HTMLTABLE =
//     //     state.login.map((item) => {
//     //         return (
//     //             <tr key={item.id} className="tr-item">
//     //                 <td>{item.id}</td>
//     //                 <td>{item.email}</td>
//     //                 <td><Moment format="DD-MM-YYYY, HH:mm:ss">{item.date_one}</Moment></td>
//     //                 {/* <td><Moment format="DD-MM-YYYY, HH:mm:ss">{item.orari_fine}</Moment></td> */}
//     //             </tr>
//     //         )
//     //     })

//     var user_HTMLTABLE =
//         state.login.map((item) => {
//             return (
//                 <div key={item.id}>
//                     <h3>{item.email}</h3>
//                 </div>
//             )
//         })

//     return (

//         <>


//             {/* <table>
//                 <thead className="thead">
//                     <tr>
//                         <th>ID</th>
//                         <th>Email</th>
//                         <th>Start Shift</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {utente_HTMLTABLE}
//                 </tbody>
//             </table> */}
//             {/* <div> */}
//             {/* {props.showTime ? <Time orari_inizio={props.showTime}/> : null} */}
//             {/* <div>
//                     {info ? `Your appointment is set to ${start} ${props.date.toDateString()}` : null}
//                 </div> */}
//             {/* <button onClick={startSubmit}>Entrata</button> */}
//             <div>
//                 <h3>The day {props.date.toDateString()} you start work at: {state.login} and you finished at: {start.email}</h3>
//             </div>
//         </>
//         // <div className="times">
//         //     {shift.map(shift => {
//         //         return (
//         //             <div>
//         //                 <button onClick={startSubmit}> {shift} </button>
//         //             </div>
//         //         )
//         //     })}
//         // <div>
//         //     {info ? `Your appointment is set to ${start} ${props.date.toDateString()}` : null}
//         // </div>
//         // </div>

//     )
// }

// export default Times;