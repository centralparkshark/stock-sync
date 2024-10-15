import { Router } from "express";
import TamItems from "../models/TamItems.js";
import ShopifyItems from "../models/ShopifyItems.js";

const createRouter = (model) => {
    const router = Router();

    router.get('/', (req, res) => handleGetAllItems(model, req, res))
    router.post('/', (req, res) => handlePostManyItems(model, req, res))

    router.get('/:sku', (req, res) => handleGetItem(model, req, res))
    router.post('/:sku', (req, res) => handlePostItem(model, req, res))
    router.patch('/:sku', (req, res) => handlePatchItem(model, req, res))
    router.delete('/:sku', (req, res) => handleDeleteItem(model, req, res))

    return router;
}



// READ (/:sku)
async function handleGetItem(model, req, res) {
    const {sku} = req.params;
    try {
        const results = await model.find({ sku })
        if (!results.length) {
            return res.status(404).json({message: 'SKU not found.'})
        }
        res.status(200).json(results)
    } catch(e) {
        res.status(400).json(e)
    }
}


// CREATE (ONE, :/sku)
async function handlePostItem(model, req, res) {
    const {sku} = req.params;
    try {
        const existingItem = await model.findOne({ sku })
        if (!existingItem) {
            const newItem = await model.create(req.body);
            return res.status(201).json(newItem);
        }
        console.log("Item exists.");
        res.status(409).json({ message: 'Item already exists.' });
    } catch(e) {
        res.status(400).json(e)
    }
}

// UPDATE (:/sku)
async function handlePatchItem(model, req, res) {
    const {sku} = req.params;
    const updatedFields = req.body;
    try {
        const updatedItem = await model.findOneAndUpdate(
            { sku },
            updatedFields,
            {new: true}
        );
        res.status(200).json(updatedItem);
    } catch(e) {
        console.error(e); // Log the error for debugging
        res.status(400).json(e)
    }
}

// DELETE (:/sku)
async function handleDeleteItem(model, req, res) {
    const {sku} = req.params;
    try {
        const deletedItem = await model.findOneAndDelete({ sku });
        if (!deletedItem) {
            return res.status(404).json({ message: 'SKU not found.' });
        }
        res.status(200).json({ message: 'Item deleted successfully.', item: deletedItem });
    } catch(e) {
        res.status(400).json(e)
    }
}

// READ (ALL) limit 50 + search
const handleGetAllItems = async (model, req, res) => {
    try {
        const { search, status } = req.query
        const query = {
            $and: [
                search ? {
                    $or: [
                        {title: {$regex: search, $options: 'i'}},
                        {sku: {$regex: search, $options: 'i'}}
                    ]
                } : {},
                status ? { stock: { $lt: Number(status)}} : {}
            ]
        }
        const results = await model.find(query).limit(50);
        res.status(200).json(results);
    } catch (e) {
        res.status(400).json(e);
    }
};

// CREATE (MANY)
const handlePostManyItems = async (model, req, res) => {
    try {
        const results = await model.insertMany(req.body);
        res.status(204).json(results);
    } catch (e) {
        res.status(400).json(e);
    }
};

export const tamRouter = createRouter(TamItems);
export const shopifyRouter = createRouter(ShopifyItems);
