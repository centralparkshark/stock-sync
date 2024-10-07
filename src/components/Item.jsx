import { shopifyData } from "../data/shopify"

import { useState } from "react"

export default function Item(props) {
    //console.log(props)
    
    let isSynced = false;

    let sku = props.sku.replace(/^0+/, '') // replace leading zeros to match skus
    
    // need to check if shopify data already has sku
    if (shopifyData.some(item => item.sku === sku)) {
        isSynced = true;
    } 

    const [synced, setSynced] = useState(isSynced)

    return (
        <tr className="item">
            <td>{props.title}</td>
            <td>{props.tamStock}</td>
            <td>
                {!synced && <div className="status shopify">Not Synced</div>}
                {/* {<div className="status cycle">Uncounted</div>} */}
                {props.tamStock < 5 && <div className="status lowStock">Low Stock</div>}
            </td>
        </tr>
    )
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

