import axios from "axios";

export default async function checkIfExists(sku) {
    // Check if the item already exists
    const query = `query {
        productVariants(first: 1, query: "sku:${sku}") {
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
    if (existingVariants.length > 0) return true
    else return false
}