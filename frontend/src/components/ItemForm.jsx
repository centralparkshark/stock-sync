import { useState, useEffect } from "react";
import { BASE_URL } from "../pages/InventoryPage";

export default function ItemForm({editMode, tamData, shopifyData, NotFound}) {
    const [editing, setEditing] = useState(editMode || false)
    const [editedData, setEditedData] = useState(shopifyData)
    const [input, setInput] = useState(shopifyData)

    // assume tamData is the og state, uneditable
    // assume shopifyData as new state, can be changed

    // for change of input fields
    function handleChange(e) {
        const {name, value} = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function missing() {
        return (<div className="missing">Missing!</div>)
    }

    
    // save editing
    async function saveEdits() {
        // data to send
        try {
            const url = editedData ? `${BASE_URL}/shopify/${editedData.sku}` : `${BASE_URL}/shopify`
            const options =  {
                method: editedData ? 'PATCH' : 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(input),
            };
            const response = await fetch(url, options)

            if (response.ok) {
                setEditedData(prevData => ({
                    ...prevData,
                    ...input, // Merge the updated fields
                }));
                setEditing(false);
            }
        } catch (e) {
            console.error("Error saving edits:", e);
        } 
    }

    function checkForMatch(data1, data2) {
        console.log(data1, data2)
        if (data1 == data2) return true;
        else return false;
    }

    function renderTableRow(label, key, type = "text") {
        const tamValue = tamData[key]
        const shopifyValue = editedData ? editedData[key] : null;
        const showEditingInput = editing ? ( 
            <input
                name={key}
                type={type}
                onChange={handleChange}
                value={input[key] || ""}
            />
        ) : shopifyValue || missing()
    
        return (
            <tr>
                <td>{label}:</td>
                <td>{tamValue}</td>
                <td colSpan={2}>{showEditingInput}</td>
            </tr>
        )
    }

    

    
    return (
        <div className="card">
            <div className="topRight">
                {!editing ? 
                    <div className=" fa fa-edit fa-2x" onClick={() => setEditing(true)}></div> : <button onClick={() => saveEdits()}>Save Changes</button>}
            </div>
            <form>
                {!editedData && NotFound()}
                {editing && <label htmlFor="title" className="h2">Title:</label>}
                {editing ? <input name="title" className="h2" type="text" onChange={handleChange} value={input.title}/> : <h2>{editedData ? editedData.title : tamData.title}</h2>}
                <p>SKU: {tamData.sku}</p>
                {editedData ? <img className="productPicture" src={editedData.media} alt={editedData.title} /> : missing()}
                {editedData ? editing && <label htmlFor="description">Description:</label> : missing()}
                {editedData ? editing ? <textarea name="description" type="text" onChange={handleChange} value={input.description}/> : <p className="description">{editedData.description}</p> : missing()}
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>TAM:</th>
                            <th>Shopify:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Stock:</td>
                            <td>{tamData.stock}</td>
                            <td>{editedData ? editedData.stock : missing()}</td>
                        </tr>
                        {renderTableRow("Price", "price", "number")}
                        {renderTableRow("Compare At Price", "compareAtPrice", "number")}
                        {renderTableRow("Vendor", "vendor", "text")}
                        
                        {editedData ?
                        <>
                        <tr>
                            <td>Weight:</td>
                            <td></td>
                            <td>{editing ? 
                            <>
                                <input name="weight" type="number" onChange={handleChange} value={input.weight}/>
                                <input name="weightType" type="text" onChange={handleChange} value={input.weightType}/>
                            </>
                            : <>{editedData.weight}{editedData.weightType}</>}</td>
                        </tr>
                        {renderTableRow("Category", "category", "text")}
                        {renderTableRow("Product Type", "productType", "text")}
                        {renderTableRow("Collections", "collections", "text")}
                    
                
                    <tr>
                        <td>Status:</td>
                        <td><div className="status">{editedData.status ? editedData.status : "Not on Shopify."}</div></td>
                    </tr>
                        
                        </> : missing()

                        }
                    <tr>
                        <td>Last Updated:</td>
                        <td>{tamData.lastUpdated}</td>
                        <td>{editedData? editedData.lastUpdated: missing()}</td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>

        
    )
}


