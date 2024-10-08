import { useState } from "react";
import Papa from 'papaparse'

export default function UploadPage() {

    const [system, setSystem] = useState(undefined);
    const [file, setFile] = useState(undefined);
    const [jsonData, setJsonData] = useState([])

    function sendFormData(e) {
        e.preventDefault()
        if (file) {
            console.log("here1")
            Papa.parse(file, {
                complete: function (results) {
                    setJsonData(results.data)
                    console.log(results.data)
                },
                header: true,
                skipEmptyLines: true
            })
        }
        // send data to correct system (need to create create routes)

    }

    return (
        <div className="center">
        <div className="card">
           <form action="">
                <div onChange={(e) => setSystem(e.target.value)}>
                    <label htmlFor="tam">TAM</label>
                    <input type="radio" name="system" id="tam" value="tam" required />
                    <label htmlFor="shopify">Shopify</label>
                    <input type="radio" name="system" id="shopify" value="shopify" required />
                </div>
                <input type="file" name="csv" id="" accept="text/csv" onChange={(e) => setFile(e.target.files[0])} required/>
                <button onClick={(e) => sendFormData(e)}>Upload</button>
           </form>
        </div>
        </div>
    )
}