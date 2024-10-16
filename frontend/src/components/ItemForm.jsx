import { useState, useEffect } from "react";
import { BASE_URL } from "../pages/InventoryPage";

export default function ItemForm({name, editMode, setShopifyData = () => {}, ...itemData}) {
    const [editing, setEditing] = useState(editMode || false)
    const [data, setData] = useState(itemData)
    const [input, setInput] = useState(itemData)

    // for change of input fields
    function handleChange(e) {
        const {name, value} = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    
    // save editing
    async function saveEdits(name) {
        // data to send
        try {
            let response;
            // Check if the item exists
            const checkResponse = await fetch(`${BASE_URL}/${name}/${data.sku}`);
            if (checkResponse.ok) {
                // Item exists, perform a PATCH request
                response = await fetch(`${BASE_URL}/${name}/${data.sku}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(input),
                });
            } else {
                // Item does not exist, perform a POST request
                response = await fetch(`${BASE_URL}/${name}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(input),
                });
            }
            console.log(response.status)
            if (response.ok) {
                setData(prevData => ({
                    ...prevData,
                    ...input, // Merge the updated fields
                }));
                if (name == 'shopify') {
                    setShopifyData(prevData => ({
                        ...prevData,
                        ...input,
                    }));
                 }
            }
        } catch (e) {
            console.error("Error saving edits:", e);
        } finally {
            setEditing(false);
        }
    }

    
    return (
        <div className="card">
            <div className="topRight">
                {!editing ? 
                    <div className=" fa fa-edit fa-2x" onClick={() => setEditing(true)}></div> : <button onClick={() => saveEdits(name)}>Save Changes</button>}
            </div>
            <form>
            {editing && <label htmlFor="title">Title:</label>}
            {editing ? <input name="title" type="text" onChange={handleChange} value={input.title}/> : <h2>{data.title}</h2>}
            {/* <img src={data.media} alt={data.title} /> */}
            {name == 'shopify' && editing && <label htmlFor="description">Description:</label>}
            {name == 'shopify' && editing ? <textarea name="description" type="text" onChange={handleChange} value={input.description}/> : <p>{data.description}</p>}
            <p>SKU: {data.sku}</p>
            <table>
                <tbody>
                    <tr>
                        <td>Stock:</td>
                        <td>{editing ? <input name="stock" type="number" onChange={handleChange} value={input.stock}/> : data.stock}</td>
                    </tr>
                    <tr>
                        <td>Price:</td>
                        <td>{editing ? <input name="price" type="number" onChange={handleChange} value={input.price}/> : data.price}</td>
                    </tr>
                    <tr>
                        <td>Compare At Price:</td>
                        <td>{editing ? <input name="compareAtPrice" type="number" onChange={handleChange} value={input.compareAtPrice}/> : data.compareAtPrice}</td>
                    </tr>
                    <tr>
                        <td>Vendor:</td>
                        <td>{editing ? <input name="vendor" type="text" onChange={handleChange} value={input.vendor}/> : data.vendor}</td>
                    </tr>
                    {name == 'shopify' && 
                    <>
                    <tr>
                        <td>Weight:</td>
                        <td>{editing ? 
                        <>
                            <input name="weight" type="number" onChange={handleChange} value={input.weight}/>
                            <input name="weightType" type="text" onChange={handleChange} value={input.weightType}/>
                        </>
                        : <>{data.weight}{data.weightType}</>}</td>
                    </tr>
                    <tr>
                        <td>Category:</td>
                        <td>{editing ? <input name="category" type="text" onChange={handleChange} value={input.category}/> : data.category}</td>
                    </tr>
                    <tr>
                        <td>Product Type:</td>
                        <td>{editing ? <input name="productType" type="text" onChange={handleChange} value={input.productType}/> : data.productType}</td>
                    </tr>
                    <tr>
                        <td>Collections:</td>
                        <td>{editing ? <input name="collections" type="text" onChange={handleChange} value={input.collections}/> : data.collections}</td>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td><div className="status">{data.status}</div></td>
                    </tr>
                    </>
                    }
                    <tr>
                        <td>Last Updated:</td>
                        <td>{data.lastUpdated}</td>
                    </tr>
                </tbody>
            </table>
            {/* {name == 'tam' && <button>Sync Item</button>} */}
            </form>
        </div>

        
    )
}