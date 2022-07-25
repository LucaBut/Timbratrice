import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import contex from "./contex";
import swal from "sweetalert";


function Times() {

    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState([]);

    const email = sessionStorage.getItem('auth_nome');
    const date = useContext(contex).toDateString();
    // const hour = { date }
    console.log("Contex date: " + date)


    const data = {
        email,
        date,
    }

    var count = 0;


    // function fetchLogin(){

    //     let timer = setTimeout(() => {
    //         console.log("Dentro useEffetct " + date)
    //         let isMounted = true;
    //         axios.post('http://127.0.0.1:8000/api/calendario', data);
    //         const fetchUser = async () => {
    //             await axios.get(`http://127.0.0.1:8000/api/calendar-start/${email}/${date}`).then(res => {
    //                 if (isMounted) {
    //                     if (res.data.status === 200) {
    //                         setLogin(res.data.user);
    //                         setLoading(false);
    //                         // count = 1
    //                     } else {
    //                         swal({
    //                             icon: 'warning',
    //                             text: 'Error loading shifts'
    //                         })
    //                     }
    //                 }
    //             })
    //         }
    //         fetchUser()

    //         return () => {
    //             clearTimeout(timer);
    //             isMounted = false;
    //         }
    //     }, 2000)

    // }

    // if(count == 0){
    //     fetchLogin();
    // }

    // for(let i = 0; i < 2; i++){
    //     fetchLogin();
    // }

    // if(count == 1){
    //     console.log("2 " + date)
    // }

    // const fetchLogin = () => {
    //     console.log("Ciao")
    // }

    // fetchLogin()

    useEffect(() => {
        let timer = setTimeout(() => {
            console.log("Dentro useEffetct " + date)
            let isMounted = true;
            axios.post('http://127.0.0.1:8000/api/calendario', data);

            const fetchUser = async () => {
                await axios.get(`http://127.0.0.1:8000/api/calendar-start/${email}/${date}`).then(res => {
                    if (isMounted) {
                        if (res.data.status === 200) {
                            setLogin(res.data.user);
                            setLoading(false);

                        } else {
                            swal({
                                icon: 'warning',
                                text: 'Error loading shifts'
                            })
                        }
                    }
                })
            }

            fetchUser();


            return () => {
                clearTimeout(timer);
                isMounted = false;
            }
        }, 1000)

    }, [])





    if (loading) {
        return <h2>Loading...</h2>
    }

    var user_HTMLTABLE = "";

    user_HTMLTABLE = login.map((item) => {
        return (
            // <tr key={item.id} className='tr-item'>
            //     <td>{item.id}</td>
            //     <td>{item.email}</td>
            //     <td>{item.date_two}</td>
            //     <td>{item.date_end}</td>
            // </tr>
            <h2 key={item.id}>Your shift started on: {item.date_one} at: {item.date_two} and ended on: {item.date_day_end} at: {item.date_end}</h2>
        )
    })


    return (
        <div>
            {/* <div>
                <table>
                    <thead className="thead">
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Start Shift</th>
                            <th>End Shift</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user_HTMLTABLE}
                    </tbody>
                </table>
            </div> */}
            {user_HTMLTABLE}
        </div>
    )
}


export default Times;
