import { Router } from "express";
import TamItems from "../models/TamItems.js";

const router = Router();

// /tam
router.get('/', async (req, res) => {
    try {
        res.status(200).json('GET /tam')
    } catch(e) {
        res.status(400).json(e)
    }
})

// /tam:sku
router.get('/:sku', async (req, res) => {
    try {
        const {sku} = req.params;
        const results = await TamItems.find({sku: sku})
        if (!results.length) {
            return res.status(404).json({message: 'SKU not found.'})
        }
        res.status(200).json(results)
    } catch(e) {
        res.status(400).json(e)
    }
})

export default router;