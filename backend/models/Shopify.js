import mongoose from "mongoose";

const shopifySchema = new mongoose.Schema({
    sku: { type: String, required: true}, // default sku if only one item
    title: { type: String, required: true},
    description: { type: String }, 
    stock: { type: Number, default: 0},
    price:{ type: Number },
    compareAtPrice: { type: Number },
    weight: { type: Number },
    weightType: { type: String },
    category: { type: String },
    productType: { type: String},
    vendor: {type: String, default: "Heinz History Center"}, 
    collections: {type: [String]},
    status: {enum: ["draft", "active", "archived"], default: "draft", required: true},
    lastUpdated: {type: String, required: true}, // date
    variants: [
        {
            sku: { type: String }, // variant sku
            stock: { type: Number, default: 0},
            price:{ type: Number },
            compareAtPrice: { type: Number },
            weight: { type: Number },
            weightType: { type: String },

            options: [
                {
                    name: { type: String }, // ex. size, color
                    value: { type: String }, //e ex. red, Large
                }
            ]
        }
    ]
})

// required is sku, title, status, and last updated
// stock, vendor, status have default values
