import { useLoaderData } from "react-router-dom"
import { BASE_URL } from "./InventoryPage"

export default function ItemPage() {
    const {tam, shopify } = useLoaderData()

    let tamData = tam[0]
    let shopifyData = shopify[0]

    return (
        <div className="flex">
            <Display {...tamData} />
            <Display {...shopifyData} />    
        <div>
                {/* {itemData.category.map(tag => <div className="status">{tag}</div>)} */}
            </div>
        </div>
        
    )
}

function Display(system) {
    return (
        <div className="card half">
            <h2>{system.title}</h2>
            <img src={system.media} alt={system.title} />
            <table>
                <td>
                    <p>{system.description}</p>
                </td>
                <td>
                    <p>${system.price}</p> 
                </td>
            </table>
            
            
        </div>
        
    )
}

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

