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
// /shopify/:sku
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

router.post('/:sku', async (req, res) => {
    try {
        const {sku} = req.params;
        const existingItem = await ShopifyItems.findOne({sku: sku})
        if (!existingItem) {
            const newItem = await ShopifyItems.create(req.body)
            res.send(newItem).status(201)
        } else {
            console.log("Item exists.")
        }
    } catch(e) {
        console.log(e)
        res.status(400).json(e)
    }
})

router.patch('/:sku', async (req, res) => {
    try {
        const {sku} = req.params;
        const updatedFields = req.body
        const updatedItem = await ShopifyItems.findOneAndUpdate(
            { sku: sku }, 
            updatedFields,
            { returnNewDocument: true }
        )
        res.send(updatedItem).status(200)
    } catch(e) {
        res.status(400).json(e)
    }
})
export default router;