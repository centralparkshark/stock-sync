import { Router } from "express";
import TamItems from "../models/TamItems.js";

const router = Router();



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

router.post('/:sku', async (req, res) => {
    try {
        const {sku} = req.params;
        const existingItem = await TamItems.findOne({sku: sku})
        if (!existingItem) {
            const newItem = await TamItems.create(req.body)
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
        const updatedItem = await TamItems.findOneAndUpdate(
            { sku: sku }, 
            updatedFields,
            { returnNewDocument: true }
        )
        res.send(updatedItem).status(200)
    } catch(e) {
        res.status(400).json(e)
    }
})

// create search


// /tam
router.get('/', async (req, res) => {
    try {
        const {search, status} = req.query
        const query = {
            $and: [
                search ? {title : {$regex: search, $options: 'i'}} : {},
                status ? {stock : {$lt: Number(status)}} : {}
            ]
        }
        const results = await TamItems.find(query).limit(20)
        res.status(200).json(results)
    } catch(e) {
        res.status(400).json(e)
    }
})


router.post('/', async (req, res) => {
    try {
        let docs = req.body
        const results = await TamItems.insertMany(docs)
        res.send(results).status(204)
    } catch(e) {
        res.status(400).json(e)
    }
})


export default router;