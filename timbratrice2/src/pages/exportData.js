import React, { useEffect, useState } from "react";
import axios from "axios";
import MonthPicker from "simple-react-month-picker";
import moment from "moment";
import { ExportExcel } from "./excelfile";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";

function Export() {

    // const [date, setDate] = useState(null);
    // const [user, setUser] = useState([]);
    // const fileType = "xlsx";
    // const fileName = "user_data";
    // var customHeadings;


    // const fetch = async () => {

    //     const date1 = date[0];
    //     const date2 = date[1];
    //     const data = {
    //         date1,
    //         date2,
    //     }

    //     axios.post('http://127.0.0.1:8000/api/export/upload', data);

    //     const fetchData = async () => {
    //         await axios.get(`http://127.0.0.1:8000/api/export/${date1}`).then(res => {
    //             setUser(res.data.user)
    //             console.log(user)
    //         })
            

    //     }
    //     fetchData()

    //     customHeadings = user.map(item => ({
    //         "ID": item.id,
    //         "Email": item.email,
    //         "Start Shift": item.orari_inizio,
    //         "End Shift": item.orari_fine
    //     }))
    //     console.log(customHeadings)
    //     const ws = XLSX.utils.json_to_sheet(user);
    //     const wb = { Sheets: { data: ws }, SheetNames: ["users_data"] };
    //     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    //     const blob = new Blob([excelBuffer], { type: fileType });
    //     FileSaver.saveAs(blob, fileName + ".xlsx");
        
    //     let timer = setTimeout(() => {
    //         // window.location = '/export';
            

    //         return (() => {
    //             clearTimeout(timer)
    //         })
    //     }, 3000)

    // }


    // return (
    //     <div>
    //         <h1>Export page</h1>
    //         <MonthPicker onChange={setDate}></MonthPicker>
    //         {date !== null ? (
    //             <p>
    //                 Start: {moment(date[0]).format("YYYY-MM-DD")} <br />
    //                 End: {moment(date[1]).format("YYYY-MM-DD")} <br></br>
    //                 <button onClick={fetch}>Export data</button>
    //                 {/* <ExportExcel apiData={user} fileName={fileName} /> */}
    //             </p>

    //         ) : null}



    //     </div>
    // )



    const [userData, setUserData] = useState([]);
    
    useEffect(() => {
        fetch('http://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(json => {
            console.log("Json", json)
            setUserData(json)
        })
    }, [])

    return (
        <div>
            <ExportExcel userDetail={userData} />
        </div>
    )

}

export default Export;