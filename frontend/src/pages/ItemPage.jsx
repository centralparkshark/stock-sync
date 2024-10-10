import { useLoaderData } from "react-router-dom"
import { BASE_URL } from "./InventoryPage"
import { useState } from "react"


export default function ItemPage() {
    const {tam, shopify } = useLoaderData()

    let tamData = tam[0]
    let shopifyData = shopify[0]

    return (
        <div className="flex">
            <div className="half">
                <h1>TAM</h1>
                {tamData ? <SimpleDisplay {...tamData} name="tam"/> : <NotFound />}            
            </div>
            <div className="half">
                <h1>Shopify</h1>
                {shopifyData ? <SimpleDisplay {...shopifyData} name="shopify"/> : <NotFound />}   
            </div>
            
            
        <div>
                {/* {itemData.category.map(tag => <div className="status">{tag}</div>)} */}
            </div>
        </div>
        
    )
}

function NotFound() {
    return (
        <>
            <h2>No item found.</h2>
            <button>Create item?</button>
        </>
    )
}

function SimpleDisplay({name, ...system}) {
    function saveEdits(name) {
        console.log(name)
        setEditing(!editing)

        // i think last updated should only change if stock is changed
        setData(prevData => ({
            ...prevData,
            stock: Number(input.stock),
            price: Number(input.price),
        }))

        // need to send a post to db
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    const [editing, setEditing] = useState(false)
    const [data, setData] = useState(system)
    const [input, setInput] = useState(system)

    return (
        <div className="card">
            <div className="editButton">
                {!editing ? <div className=" fa fa-edit fa-2x" onClick={() => setEditing(!editing)}></div> : <button onClick={() => saveEdits(name)}>Save Changes</button>}
            </div>
            <h2>{data.title}</h2>
            <img src={data.media} alt={data.title} />
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
                    { data.compareAtPrice ? <tr>
                        <td>Compare At Price:</td>
                        <td>{editing ? <input/> : data.compareAtPrice}</td>
                    </tr> : ''}
                    <tr>
                        <td>Vendor:</td>
                        <td>{editing ? <input/> : data.vendor}</td>
                    </tr>
                    <tr>
                        <td>Last Updated:</td>
                        <td>{data.lastUpdated}</td>
                    </tr>
                </tbody>
            </table>
            {name == "shopify" ? <ShopifyDetails {...data}/> : ''}
        </div>

        
    )
}

function ShopifyDetails(details) {
    return (
        <>
        <table>
            <tbody>
                <tr>
                    <td>Weight:</td>
                    <td>{details.weight}{details.weightType}</td>
                </tr>
                <tr>
                    <td>Category:</td>
                    <td>{details.category}</td>
                </tr>
                <tr>
                    <td>Product Type:</td>
                    <td>{details.productType}</td>
                </tr>
                <tr>
                    <td>Collections:</td>
                    <td>{details.collections}</td>
                </tr>
                <tr>
                    <td>Status:</td>
                    <td><div className="status">{details.status}</div></td>
                </tr>
            </tbody>
        </table>
        <button>Add Variants</button>
        {details.variants.length > 0 ? <div>variants go here</div> : ""}
        </>
    )
}

// variants: [
//     {
//         sku: { type: String }, // variant sku
//         stock: { type: Number, default: 0},
//         price:{ type: Number },
//         compareAtPrice: { type: Number },
//         weight: { type: Number },
//         weightType: { type: String },

//         options: [
//             {
//                 name: { type: String }, // ex. size, color
//                 value: { type: String }, //e ex. red, Large
//             }
//         ]
//     }
// ]

// loader function
export const itemLoader = async (params) => {
    const tamRes = await fetch(`${BASE_URL}/tam/${params.sku}`)
    const shopifyRes = await fetch(`${BASE_URL}/shopify/${params.sku}`)

    const tam = await tamRes.json()
    const shopify = await shopifyRes.json()
    return {tam, shopify}
}




// Needed Sections for Shopify
// Title
// Description (Body (HTML))
// Media
// Category

// Variants
    // SKU and/or Barcode
    // Price
    // Stock
    // If sale, needs og price (Cmpare At)
    // Weight (oz) (needed for shipping)

// Status (Active, Draft, Archived)
// Publishing

// Product type (clothing - if this is correct tax should be automatically correct)
// Vendor (ask allison if I should start adding those) 
// Collections 
// Tags

// Pricing
    // Price
    // Compare at Price (if on sale)
    // Cost per item
    // profit
    // margin


// Other Sections for TAM
// whatever goes on an item receiver (og price, calculates margin?) 
// ^ this is on shopify as well thought I think

// Sections I want to add
// Low stock (should probably be a percent)
// Backstock location

// Notes
// What to do about multiple store locations (FP, HHC, MC, Online)

