export default function Item({title, tamStock}) {
    return (
        <div className="item">
            <div>{title}</div>
            <div>{tamStock}</div>
        </div>
    )
}



// Needed Sections for Shopify
// Title
// Description (Body (HTML))
// Media
// Category

// Variants
    // SKU
    // Price
    // Stock
    // If sale, needs og price (Cmpare At)
    // Weight in grams (needed for shipping)

// Status (Active, Draft, Archived)
// Publishing

// Product type (clothing - if this is correct tax should be automatically correct)
// Vendor (ask allison if I should start adding those) 
// Collections 
// Tags


// Other Sections for TAM
// whatever goes on an item receiver (og price, calculates margin?) 
// ^ this is on shopify as well thought I think

// Sections I want to add
// Low stock (should probably be a percent)
// Backstock location

// Notes
// What to do about multiple store locations (FP, HHC, MC, Online)