import { useState } from "react";

export default function ItemForm({name, ...itemData}) {
    const [editing, setEditing] = useState(false)
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

    
    // after editing
    async function saveEdits(name) {
        // data to send
        const payload = {
            stock: Number(input.stock),
            price: Number(input.price),
            vendor: input.vendor,
            weight: Number(input.weight),
            weightType: input.weightType,
        }

        try {
            const response = await fetch(`${BASE_URL}/${name}/${data.sku}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            if (response.ok) {
                // set data 
                const updatedData = await response.json()
                setData(updatedData)
            }
            setEditing(false)
        } catch (e) {
            console.error(e)
        }


    }

    
    return (
        <div className="card">
            <div className="topRight">
                {!editing ? 
                    <div className=" fa fa-edit fa-2x" onClick={() => setEditing(true)}></div> 
                    : 
                    <button onClick={() => saveEdits(name)}>Save Changes</button>}
            </div>
            <h2>{data.title}</h2>
            <img src={data.media} alt={data.title} />
            <p>SKU: {data.sku}</p>
            <ItemDetails data={data} editing={editing} input={input} handleChange={handleChange}/>
            {name == "shopify" && <ShopifyDetails data={data} editing={editing} input={input} handleChange={handleChange}/>}
            {name == 'tam' && <button>Sync Item</button>}
        </div>

        
    )
}

function ItemDetails({ data, editing, input, handleChange }) {
    return (
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
                    { data.compareAtPrice ? <tr>
                        <td>Compare At Price:</td>
                        <td>{editing ? <input name="compareAtPrice" type="number" onChange={handleChange} value={input.compareAtPrice}/> : data.compareAtPrice}</td>
                    </tr> : ''}
                    <tr>
                        <td>Vendor:</td>
                        <td>{editing ? <input name="vendor" type="text" onChange={handleChange} value={input.vendor}/> : data.vendor}</td>
                    </tr>
                    <tr>
                        <td>Last Updated:</td>
                        <td>{data.lastUpdated}</td>
                    </tr>
                </tbody>
            </table>
    )
}

function ShopifyDetails({ data, editing, input, handleChange }) {
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>Weight:</td>
                        <td>{editing ? 
                        <>
                            <input name="weight" type="number" onChange={handleChange} value={input.weight}/>
                            <input name="weightType" type="text" onChange={handleChange} value={input.weightType}/>
                        </>
                        : <>{data.weight}{data.weightType}</>}</td>
                    </tr>
                    {/* <tr>
                        <td>Category:</td>
                        <td>{editing ? <input name="category" type="text" onChange={handleChange} value={input.category}/> : data.category}</td>
                    </tr>
                    <tr>
                        <td>Product Type:</td>
                        <td>{data.productType}</td>
                    </tr>
                    <tr>
                        <td>Collections:</td>
                        <td>{data.collections}</td>
                    </tr> */}
                    <tr>
                        <td>Status:</td>
                        <td><div className="status">{data.status}</div></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}