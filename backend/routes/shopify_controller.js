import { Router } from "express";
// import TamItems from "../models/TamItems.js";
import ShopifyItems from "../models/ShopifyItems.js";
import Shopify from "shopify-api-node";
import dotenv from "dotenv";
import axios from 'axios'

dotenv.config()

const shopify = new Shopify({
    shopName: 'vmillerstocksync',
    apiKey: process.env.API_KEY,
    password: process.env.ADMIN_ACCESS_TOKEN
})

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
    const query = ` query {
        productVariants(first: 1, query: "sku:${sku}") {
            edges {
                node {
                    id
                    inventoryQuantity
                    price
                    compareAtPrice
                    image {
                        url
                        altText
                    }
                    product {
                        description
                        descriptionHtml
                        productType
                        status
                        tags
                        title
                        vendor
                    }
                    sku
                }
            }
        }
    }`
    try {
        const response = await axios.post(
            `https://${process.env.SHOP}.myshopify.com/admin/api/2024-10/graphql.json`,
            {query},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.ADMIN_ACCESS_TOKEN
                }
            }
        )
        const product = response.data.data.productVariants.edges[0].node
        console.log(product)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}


// // CREATE (ONE, :/sku)
// async function handlePostItem(model, req, res) {
//     const {sku} = req.params;
//     try {
//         const existingItem = await model.findOne({ sku })
//         if (!existingItem) {
//             const newItem = await model.create(req.body);
//             return res.status(201).json(newItem);
//         }
//         console.log("Item exists.");
//         res.status(409).json({ message: 'Item already exists.' });
//     } catch(e) {
//         res.status(400).json(e)
//     }
// }

// // UPDATE (:/sku)
// async function handlePatchItem(model, req, res) {
//     const {sku} = req.params;
//     const updatedFields = req.body;
//     try {
//         const updatedItem = await model.findOneAndUpdate(
//             { sku },
//             updatedFields,
//             {new: true}
//         );
//         res.status(200).json(updatedItem);
//     } catch(e) {
//         console.error(e); // Log the error for debugging
//         res.status(400).json(e)
//     }
// }

// // DELETE (:/sku)
// async function handleDeleteItem(model, req, res) {
//     const {sku} = req.params;
//     try {
//         const deletedItem = await model.findOneAndDelete({ sku });
//         if (!deletedItem) {
//             return res.status(404).json({ message: 'SKU not found.' });
//         }
//         res.status(200).json({ message: 'Item deleted successfully.', item: deletedItem });
//     } catch(e) {
//         res.status(400).json(e)
//     }
// }

// READ (ALL) limit 50 + search
const handleGetAllItems = async (model, req, res) => {
    // 
    try {
        const products = await shopify.product.list()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
};

// // CREATE (MANY)
// const handlePostManyItems = async (model, req, res) => {
//     try {
//         const results = await model.insertMany(req.body);
//         res.status(204).json(results);
//     } catch (e) {
//         res.status(400).json(e);
//     }
// };

export const shopifyRouter = createRouter(ShopifyItems);