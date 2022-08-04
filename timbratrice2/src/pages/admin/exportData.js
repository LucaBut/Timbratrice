import React, { useEffect, useState } from "react";
import axios from "axios";
import MonthPicker from "simple-react-month-picker";
import moment from "moment";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";

function Export() {

    const [data, setData] = useState([])
    const [date, setDate] = useState(null);

    useEffect(() => {
        if (data.length > 0) {
            excel()
        }

    }, [data])              //Execute every time data change

    const fileName = "user_data_" + date;
    const fileType = "xlsx";
    const fileExtension = ".xlsx";


    function exportData() {
        const date1 = date[0];
        const date2 = date[1];

        const month = {
            date1,
            date2,
        }

        axios.post('http://127.0.0.1:8000/api/export/upload', month);
        const fetchData = async () => {
            await axios.get(`http://127.0.0.1:8000/api/export/${date1}/${date2}`).then(res => { //Get with date1 and date2 values

                // reshaping the array
                const customHeadings = res.data.user.map(item => ({     //Excel file
                    "User ID": item.id,
                    "User Email": item.email,
                    "Date Start Shift": item.date_start_shift,
                    "Hour Start Shift": item.hour_start_shift,
                    "Date End Shift": item.date_end_shift,
                    "Hour End Shift": item.hour_end_shift,
                    "Selected Month": item.date_start,
                }))

                setData(customHeadings)
            })

            // await axios.get('http://127.0.0.1:8000/api/export2');
        }
        fetchData()

    }

    function excel() {          //Function that create excel file and download
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(blob, fileName + fileExtension);
    }

    return (    //Create the month picker component
        <div>
            <MonthPicker onChange={setDate}></MonthPicker>
            {date !== null ? (              //If data isn't null then print the firt day of the firts month and the last day of the second month selected 
                <p>
                    Start: {moment(date[0]).format("YYYY-MM-DD")} <br />
                    End: {moment(date[1]).format("YYYY-MM-DD")} <br></br>
                    <button onClick={exportData}>Export</button>
                </p>
            ) : null}
        </div>
    );

}

export default Export;