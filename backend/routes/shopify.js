import { Router } from "express";
import ShopifyItems from "../models/ShopifyItems.js";

const router = Router();

// r
// /shopify
router.get('/', async (req, res) => {
    try {
        const results = await ShopifyItems.find({}).limit(20)
        res.status(200).json(results)
    } catch(e) {
        res.status(400).json(e)
    }
})

// create pagination

// c
// /shopify
router.post('/', async (req, res) => {
    try {
        let docs = req.body
        const results = await ShopifyItems.insertMany(docs)
        res.send(results).status(204)
    } catch(e) {
        console.log(e)
        res.status(400).json(e)
    }
})

// r
// /shopify:sku
router.get('/:sku', async (req, res) => {
    try {
        const {sku} = req.params;
        const results = await ShopifyItems.find({sku: sku})
        if (!results.length) {
            return res.status(404).json({message: 'SKU not found.'})
        }
        res.status(200).json(results)
    } catch(e) {
        res.status(400).json(e)
    }
})


// d (gotta think about this as well)
// /shopify:sku
router.delete('/:sku', async (req, res) => {
    try {
        // let update = req.body
        // const results = await ShopifyItems.findOneAndDelete(docs)
        // res.send(results).status(204)
    } catch(e) {
        console.log(e)
        res.status(400).json(e)
    }
})

// shopifiy doesn't need an update route since it will all come from shopify's data
// basically udpate on their website

export default router;