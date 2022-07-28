import React from "react";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportExcel = ({userDetail}) => {
    
    const fileType = 'xlsx'
    
    const exportToCSV = () => {
         const ws = XLSX.utils.json_to_sheet(userDetail);
         const wb = {Sheets: {data: ws}, SheetNames: ["users_data"]};
         const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});
         const data = new Blob([excelBuffer], {type: fileType});
         FileSaver.saveAs(data, "user_data" + ".xlsx");
    }
    return(
        <button onClick={exportToCSV}>Export data</button>
    )
}