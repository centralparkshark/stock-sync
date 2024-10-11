import { useState } from "react";
import Papa from 'papaparse'
import { BASE_URL } from "./InventoryPage";

export default function UploadPage() {

    const [system, setSystem] = useState(undefined);
    const [file, setFile] = useState(undefined);
    const [jsonData, setJsonData] = useState([])
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    function sendFormData(e) {
        e.preventDefault()
        const date = new Date()
        if (file) {
            Papa.parse(file, {
                complete: function (results) {
                    results.data.map(item => (item.lastUpdated = date))
                    setJsonData(results.data)
                },
                header: true,
                skipEmptyLines: true
            })
        }
        sendToDB()
    }

    async function sendToDB() {
        try {
            const res = await fetch(`${BASE_URL}/${system}`,{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            if (res.ok) {
                const result = await res.json()
                setSuccess(true)
                setError('')}
            else {
                const errorMessage = await res.text()
                setError(`Error adding data: ${errorMessage || res.statusText}`)
            }
        } catch (e) {
            console.error('Failed to send data to the database:', e);
            setError(`Error: ${e.message}`);
        }
    }

    // this error handling is just simply not correct

    return (
        <>
        
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
            {error ? <p>Error: {error}</p> : ''}
            {success ? <p>Items successfully added!</p> : ''}
            </div>
        </div>
        </>
    )
}