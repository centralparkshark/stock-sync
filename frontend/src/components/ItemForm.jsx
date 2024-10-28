import { useState, useEffect } from "react";
import { BASE_URL } from "../pages/InventoryPage";

export default function ItemForm({editMode, tamData, shopifyData, NotFound}) {
    const [editing, setEditing] = useState(editMode || false)
    const [input, setInput] = useState(shopifyData || {})
    const [errors, setErrors] = useState({})

    // shopifyData =  {
    //     id
    //     inventoryQuantity
    //     price
    //     compareAtPrice
    //     image {
    //         url
    //         altText
    //     }
    //     product {
    //         description
    //         descriptionHtml
    //         productType
    //         status
    //         tags
    //         title
    //         vendor
    //     }
    //     sku
    // }

    // assume tamData is the og state, uneditable
    // assume shopifyData as new state, can be changed

    function checkForMismatch(data1, data2) {
        return data1 !== data2
    }

    // for change of input fields
    function handleChange(e) {
        const {name, value} = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }))

        if (tamData[name] !== undefined) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: checkForMismatch(tamData[name], value) ? "Values do not match." : "",
            }))
        }
    }

    function missing() {
        return (<div className="missing">Missing!</div>)
    }

    
    // save editing
    async function saveEdits() {
        // data to send
        try {
            const url = shopifyData ? `${BASE_URL}/shopify/${shopifyData.sku}` : `${BASE_URL}/shopify`
            const options =  {
                method: shopifyData ? 'PATCH' : 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(input),
            };
            const response = await fetch(url, options)

            if (response.ok) {
                setInput(prevData => ({
                    ...prevData,
                    ...input, // Merge the updated fields
                }));
                setEditing(false);
            }
        } catch (e) {
            console.error("Error saving edits:", e);
        } 
    }

    function renderTableRow(label, key, type = "text") {
        const tamValue = tamData[key]
        const shopifyValue = shopifyData ? shopifyData[key] : null;
        const showEditingInput = editing ? ( 
            <input
                name={key}
                type={type}
                onChange={handleChange}
                value={input[key] || ""}
            />
        ) : shopifyValue || missing()
    
        const hasMismatch = checkForMismatch(tamValue, input[key])
        const errorMessage = hasMismatch ? errors[key] : null;
        

        return (
            <tr>
                <td>{label}:</td>
                <td>{tamValue}</td>
                <td colSpan={2}>
                    {showEditingInput}
                    {errorMessage && <div className="error">{errorMessage}</div>}
                </td>
            </tr>
        )
    }

    

    
    return (
        <div className="card">
            <div className="topRight">
                {!editing ? 
                    <div className=" fa fa-edit fa-2x" onClick={() => setEditing(true)}></div> :
                    <button onClick={() => saveEdits()}>Save Changes</button>}
            </div>
            <form>
                {!shopifyData && NotFound()}
                {editing && <label htmlFor="title" className="h2">Title:</label>}
                {editing ? <input name="title" className="h2" type="text" onChange={handleChange} value={input.title || ""}/> : <h2>{shopifyData ? shopifyData.title : tamData.title}</h2>}
                <p>SKU: {tamData.sku}</p>
                {shopifyData.image ? <img className="productPicture" src={shopifyData.image.url} alt={shopifyData.image.altText} /> : missing()}
                {shopifyData ? editing && <label htmlFor="description">Description:</label> : missing()}
                {shopifyData ? editing ? <textarea name="description" type="text" onChange={handleChange} value={input.description}/> : <p className="description">{shopifyData.product.description}</p> : missing()}
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
                            <td>
                                {shopifyData ? shopifyData.inventoryQuantity : missing()}
                            </td>
                        </tr>
                        {renderTableRow("Price", "price", "number")}
                        {renderTableRow("Compare At Price", "compareAtPrice", "number")}
                        <tr>
                            <td>Vendor:</td>
                            <td>{tamData.vendor}</td>
                            <td>{shopifyData ? shopifyData.product.vendor : missing()}</td>
                        </tr>
                        
                        {shopifyData &&
                        <>
                        <tr>
                            <td>Weight:</td>
                            <td></td>
                            <td>{editing ? 
                            <>
                                <input name="weight" type="number" onChange={handleChange} value={input.weight}/>
                                <input name="weightType" type="text" onChange={handleChange} value={input.weightType}/>
                            </>
                            : <>{shopifyData.weight || missing()}{shopifyData.weightType}</>}</td>
                        </tr>
                        {renderTableRow("Category", "category", "text")}
                        {renderTableRow("Product Type", "productType", "text")}
                        {renderTableRow("Collections", "collections", "text")}
                    
                
                    <tr>
                        <td>Status:</td>
                        <td><div className="status">{shopifyData.status || "Not on Shopify."}</div></td>
                    </tr>
                        
                        </> 

                        }
                    <tr>
                        <td>Last Updated:</td>
                        <td>{tamData.lastUpdated}</td>
                        <td>{shopifyData? shopifyData.lastUpdated: missing()}</td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>

        
    )
}


