import { Router } from "express";
import ShopifyItems from "../models/ShopifyItems.js";

const router = Router();

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

export default router;