import mongoose from "mongoose";

const shopifySchema = new mongoose.Schema({
    title: { type: String, required: true},
    body_html: {},
    vendor: {type: String, default: "Heinz History Center"}, 
    product_type: { type: String},
    tags: {},
    status: {type: String, enum: ["draft", "active", "archived"], default: "draft", required: true},
    variants: [
        {
            title: { type: String},
            price:{ type: Number },
            compare_at_price:{ type: Number },
            taxable: {type: Boolean, default: true},
            grams: {type: Number },
            inventory_management: {type: String, required: true, default: "shopify"},
            sku: { type: String }, // variant sku
            weight: {type: Number },
            weight_unit: {type: String },
            inventory_quantity: { type: Number, default: 0},
        },
    ],
    options: [
        {
            name: {type: String},
            values: [],
        }
    ],
    images: []
})
    
    


// required is sku, title, status, and last updated
// stock, vendor, status have default values

const ShopifyItems = mongoose.model("ShopifyItems", shopifySchema)

shopifySchema.index({sku: 1}, {title: 1})
mongoose.set('autoIndex', false)

export default ShopifyItems;