import mongoose from "mongoose";

const shopifySchema = new mongoose.Schema({
    sku: { type: String, required: true}, // default sku if only one item (no variants)
    title: { type: String, required: true},
    description: { type: String }, 
    stock: { type: Number, default: 0},
    price:{ type: Number },
    compareAtPrice: { type: Number },
    weight: {type: Number, default: 0 },
    weightType: {type: String, default: 'g'},
    category: { type: String },
    productType: { type: String},
    vendor: {type: String, default: "Heinz History Center"}, 
    collections: {type: [String]},
    status: {type: String, enum: ["draft", "active", "archived"], default: "draft", required: true},
    lastUpdated: {type: String, required: true}, // date, change on new data upload but not on edit
    variants: [
        {
            sku: { type: String }, // variant sku
            stock: { type: Number, default: 0},
            price:{ type: Number },
            compareAtPrice: { type: Number },
            weight: {type: Number },
            weightType: {type: String },

            options: [
                {
                    name: { type: String }, // ex. size, color
                    value: { type: String }, // ex. red, Large
                }
            ]
        }
    ]
})

// required is sku, title, status, and last updated
// stock, vendor, status have default values

const ShopifyItems = mongoose.model("ShopifyItems", shopifySchema)

shopifySchema.index({sku: 1}, {title: 1})
mongoose.set('autoIndex', false)

export default ShopifyItems;