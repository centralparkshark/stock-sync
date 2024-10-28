import { Router } from "express";
import Shopify from "shopify-api-node";
import dotenv from "dotenv";
import axios from 'axios'

import createNewItem from "./graphql/createNewItem.js";

dotenv.config()

const shopify = new Shopify({
    shopName: 'vmillerstocksync',
    apiKey: process.env.API_KEY,
    password: process.env.ADMIN_ACCESS_TOKEN
})

const version = "2024-10"; // not used anywhere jsut for reference

const createRouter = () => {
    const router = Router();

    router.get('/', (req, res) => handleGetAllItems(req, res) )
    router.post('/', (req, res) => {
        console.log("Adding new item..")
        createNewItem(req, res)
    })

    router.get('/:sku', (req, res) => handleGetItem(req, res) )
    // router.post('/:sku', (req, res) => createNewItem(req, res) )
    router.patch('/:sku', (req, res) => handlePatchItem(req, res) )
    router.delete('/:sku', (req, res) => handleDeleteItem(req, res) )

    return router;
}



// READ (/:sku)
async function handleGetItem(req, res) {
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
        if (!product) return res.status(404).json({message: 'Product not found.'})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

// UPDATE (:/sku)
async function handlePatchItem(req, res) {
    const {sku} = req.params;
    const updatedFields = req.body;

    // get id to update item
    const query = `query {
        productVariants(first: 1, query: "sku:${sku}") {
            edges {
                node {
                    id
                }
            }
        }
    }`;

    try {
        // Step 1: Find the product variant by SKU
        const response = await axios.post(
            `https://${process.env.SHOP}.myshopify.com/admin/api/2024-10/graphql.json`,
            { query },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.ADMIN_ACCESS_TOKEN
                }
            }
        );

        const edges = response.data.data.productVariants.edges;
        if (edges.length === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        const productVariantId = edges[0].node.id;

        // Step 2: Update the product variant using the ID
        const updatedResponse = await axios.put(
            `https://${process.env.SHOP}.myshopify.com/admin/api/2024-10/variants/${productVariantId}.json`,
            { variant: updatedFields },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.ADMIN_ACCESS_TOKEN
                }
            }
        );

        res.status(200).json(updatedResponse.data.variant);
    } catch(e) {
        console.error(e); // Log the error for debugging
        res.status(400).json(e)
    }
}

// DELETE (:/sku)
async function handleDeleteItem(req, res) {
    const {sku} = req.params;
    try {
        const [productVariant] = await shopify.productVariant.list({ sku });
        if (!productVariant) {
            return res.status(404).json({ message: 'SKU not found.' });
        }
        await shopify.product.delete(productVariant.product_id);
        res.status(200).json({ message: 'Item deleted successfully.' });
    } catch(e) {
        res.status(400).json(e)
    }
}

// READ (ALL) 
// TODO: Add search back in
const handleGetAllItems = async (req, res) => {
    try {
        const products = await shopify.product.list()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
};

// CREATE (MANY)
const handlePostManyItems = async (req, res) => {
    try {
        const results = await Promise.all(req.body.map(item => shopify.product.create(item)));
        res.status(201).json(results);
    } catch (e) {
        res.status(400).json(e);
    }
};

export const shopifyRouter = createRouter();