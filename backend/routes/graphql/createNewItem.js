import axios from "axios";
import checkIfExists from "./checkIfExists.js";

export default async function createNewItem(req, res) {
    const productData = req.body;
    const location = "gid://shopify/Location/96155828471" // will need changed
    const qty = Math.floor(productData.stock * 0.1)

    try {
        if (await checkIfExists(productData.sku)) {
            return res.status(409).json({ message: 'Item already exists.' });
        }

        // Create a new product variant
        const mutation = `mutation {
            productSet(input: {
                title: "${productData.title}",
                descriptionHtml: "${productData.description}",
                status: DRAFT,
                tags: "testTag1, testTag2",
                vendor: "${productData.vendor}",
                productOptions: [{
                    name: "Title",
                    values: [{name: "Default Title"}]
                }],
                variants: [
                    {
                        
                        price: ${productData.price},
                        sku: "${productData.sku}",
                        optionValues: [{optionName: "Title", name: "Default Title"}],
                        inventoryQuantities: [{
                            name: "available",
                            locationId: "${location}",
                            quantity: ${qty}
                        }]
                    }
                ]
            }) {
                product {
                    id
                    title
                    variants(first: 1) {
                        edges {
                            node {
                                id
                                inventoryItem {
                                    id
                                }
                            }
                        }
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }`;



        const createResponse = await axios.post(
            `https://${process.env.SHOP}.myshopify.com/admin/api/2024-10/graphql.json`,
            { query: mutation },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.ADMIN_ACCESS_TOKEN,
                },
            }
        );


        const { product, userErrors } = createResponse.data.data.productSet;
        if (userErrors.length > 0) {
            return res.status(400).json({ errors: userErrors });
        }

        // set inventory management to shopify
        const trackedMutation = `
            mutation {
            inventoryItemUpdate(id: "${product.variants.edges[0].node.inventoryItem.id}", input: { tracked: true }) {
                inventoryItem {
                id
                tracked
                }
                userErrors {
                field
                message
                }
            }
            }
        `
        const createTrackedResponse = await axios.post(
            `https://${process.env.SHOP}.myshopify.com/admin/api/2024-10/graphql.json`,
            { query: trackedMutation },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.ADMIN_ACCESS_TOKEN,
                },
            }
        );
        
        // console.log(createTrackedResponse.data)
        const trackedUserErrors = createTrackedResponse.data.data.inventoryItemUpdate.userErrors;
        if (trackedUserErrors.length > 0) {
            return res.status(400).json({ errors: trackedUserErrors });
        }

        res.status(201).json(product);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
}

// TODO: Error handling for created item
// TODO: Have it update page on add with some sort of confirmation message
// TODO: Ability to edit the data before sending (bring pop up back)
// TAM Case Number: 136311