import mongoose from "mongoose";

const tamSchema = new mongoose.Schema({
    sku: { type: String, required: true}, // all variants have own skus
    title: { type: String, required: true},
    stock: { type: Number, default: 0},
    floorStock: { type: Number, default: 0},
    backStock: { type: Number, default: 0},
    price:{ type: Number },
    vendor: {type: String }, 
    lastCounted: {type: String, required: true}, // date
    shopifyStatus: {type: Boolean, default: false}
})

// required is sku, title, lastCounted
// all stocks and shopifyStatus have default values

const TamItems = mongoose.model("TamItems", tamSchema)

tamSchema.index({sku: 1}, {title: 1})
mongoose.set('autoIndex', false)

export default TamItems;