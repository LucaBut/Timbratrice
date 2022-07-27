import React, { useState } from "react";
import axios from "axios";
import MonthPicker from "simple-react-month-picker";
import moment from "moment";
import { ExportExcel } from "./excelfile";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";

function Export() {
    const [date, setDate] = useState(null);
    const [user, setUser] = useState([]);

    // const fecthMonth = () => {
    //     const data = {
    //         email,
    //         date,
    //     }

    //     axios.post('http://127.0.0.1:8000/api/export/upload', data);

    //     axios.get(`http://127.0.0.1:8000/api/export/${email}/${date}`).then(res => {
    //     if(res.data.status === 200){
    //         setUser(res.data.user)
    //     }    

    //     })
    // }

    const exportToCSV = () => {

        const date1 = date[0];
        const date2 = date[1];
        const data = {
            date1,
            date2,
        }

        axios.post('http://127.0.0.1:8000/api/export/upload', data);

        axios.get(`http://127.0.0.1:8000/api/export/${date1}`).then(res => {
            if (res.data.status === 200) {
                setUser(res.data.user)
            }

        })

        const fileType = "xlsx"
        const ws = XLSX.utils.json_to_sheet(user);
        const wb = { Sheets: { data: ws }, SheetName: ["user"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const excelFile = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(excelFile, "users" + ".xlsx")
    }

    return (
        <div>
            <h1>Export page</h1>
            <MonthPicker onChange={setDate}></MonthPicker>
            {date !== null ? (
                <p>
                    Start: {moment(date[0]).format("YYYY-MM-DD")} <br />
                    End: {moment(date[1]).format("YYYY-MM-DD")} <br></br>
                    <button onClick={exportToCSV}>Export data</button>
                </p>

            ) : null}



        </div>
    )
}

export default Export;