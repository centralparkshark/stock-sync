import { useLoaderData } from "react-router-dom"
import { BASE_URL } from "./InventoryPage"

export default function ItemPage() {
    const {tam, shopify } = useLoaderData()

    let tamData = tam[0]
    let shopifyData = shopify[0]

    return (
        <div className="flex">
            <div className="half">
                <h1>TAM</h1>
                {tamData ? <SimpleDisplay {...tamData} /> : <NotFound />}            
            </div>
            <div className="half">
                <h1>Shopify</h1>
                {shopifyData ? <SimpleDisplay {...shopifyData} /> : <NotFound />}   
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

function SimpleDisplay(system) {
    return (
        <div className="card">
            <div className="editButton fa fa-edit fa-2x"></div>
            <h2>{system.title}</h2>
            <img src={system.media} alt={system.title} />
            <p>SKU: {system.sku}</p>
            <table>
                <tr>
                    <td>Stock:</td>
                    <td>{system.stock}</td>
                </tr>
                <tr>
                    <td>Price:</td>
                    <td>${system.price}</td>
                </tr>
                { system.compareAtPrice ? <tr>
                    <td>Compare At Price:</td>
                    <td>${system.compareAtPrice}</td>
                </tr> : ''}
                <tr>
                    <td>Vendor:</td>
                    <td>{system.vendor}</td>
                </tr>
                <tr>
                    <td>Last Updated:</td>
                    <td>{system.lastUpdated}</td>
                </tr>
            </table>
            {system.collections ? <ShopifyDetails {...system}/> : ''}
            
            
        </div>
        
    )
}

function ShopifyDetails(details) {
    console.log(details)
    return (
        <>
        <table>
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

