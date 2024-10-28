import axios from "axios";

export default async function createNewItem(req, res) {
    const productData = req.body;

    console.log(productData)

    try {
        // Check if the item already exists
        const query = `query {
            productVariants(first: 1, query: "sku:${productData.sku}") {
                edges {
                    node {
                        id
                    }
                }
            }
        }`;

        const response = await axios.post(
            `https://${process.env.SHOP}.myshopify.com/admin/api/2024-10/graphql.json`,
            { query },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.ADMIN_ACCESS_TOKEN,
                },
            }
        );

        const existingVariants = response.data.data.productVariants.edges;
        if (existingVariants.length > 0) {
            return res.status(409).json({ message: 'Item already exists.' });
        }

        // Create a new product variant
        const mutation = `mutation {
            productCreate(input: {
                title: "${productData.title}"
            }) {
                product {
                    id
                    title
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

        const { product, userErrors } = createResponse.data.data.productCreate;
        if (userErrors.length > 0) {
            return res.status(400).json({ errors: userErrors });
        }
        res.status(201).json(product);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
}