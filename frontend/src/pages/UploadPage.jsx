import { useState } from "react";
import Papa from 'papaparse'
import { BASE_URL } from "./InventoryPage";

export default function UploadPage() {
    const [system, setSystem] = useState(undefined)
    const [file, setFile] = useState(undefined);
    const [error, setError] = useState("")
    const [success, setSuccess] = useState('')

    function sendFormData(e) {
        e.preventDefault()
        setSystem("tam")
        const date = new Date()
        if (file) {
            Papa.parse(file, {
                complete: function (results) {
                    const processedData = results.data.map(item => {
                        return {
                            ...item,
                            lastUpdated: date.toISOString()
                        };                
                    })
                    sendToDB(processedData)
                },
                header: true,
                skipEmptyLines: true
            })
        } else {
            console.error("No file selected.")
            return;
        }
        
    }

    async function checkItemExists(item) {
        const response = await fetch(`${BASE_URL}/${system}/${item.sku}`)
        return response.ok; // Returns true if the item exists
    }

    async function sendToDB(data) {
        for (const item of data) {
            try {
                console.log(item)
                const exists = await checkItemExists(item);
                if (!exists) {
                    const res = await fetch(`${BASE_URL}/${system}`,{
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(item)
                    })
                    if (res.ok) {
                        const result = await res.json()
                        setSuccess("New items added!")
                        setError('')}
                    else {
                        const errorMessage = await res.text()
                        setError(`Error adding data: ${errorMessage || res.statusText}`)
                    }
                } else {
                    try {
                        const response = await fetch(`${BASE_URL}/${system}/${item.sku}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(item)
                        })
                        if (response.ok) {
                            setSuccess("Items updated!")
                        }
                    } catch (e) {
                        console.error(e)
                        setError(e)
                    }

                }
            } catch (e) {
                console.error('Failed to send data to the database:', e);
                setError(`Error: ${e.message}`);
            }
        }
    }


    // this error handling is just simply not correct
    const lastUpdate = "Today"
    return (
        <>
        
        <div className="center">
            <div className="card">
            <form action="">
                    <h2>Upload TAM Data:</h2>
                    <p>Last update: {lastUpdate}</p>
                    <input type="file" name="csv" id="" accept="text/csv" onChange={(e) => setFile(e.target.files[0])} required/>
                    <button onClick={(e) => sendFormData(e)}>Upload</button>
            </form>
            {error ? <p>Error: {error}</p> : ''}
            {success ? <p>{success}</p> : ''}
            </div>
        </div>
        </>
    )
}