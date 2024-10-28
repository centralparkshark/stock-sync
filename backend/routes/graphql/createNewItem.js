import axios from "axios";
import checkIfExists from "./checkIfExists.js";

export default async function createNewItem(req, res) {
    const productData = req.body;

    console.log(productData)

    try {
        if (await checkIfExists(productData.sku)) {
            return res.status(409).json({ message: 'Item already exists.' });
        }

        // Create a new product variant
        const mutation = `mutation {
            productSet(input: {
                title: "${productData.title}"
                descriptionHtml: "${productData.description}"
                status: DRAFT,
                tags: "testTag1, testTag2",
                vendor: "${productData.vendor}",
                productOptions: [{
                    name: "Title",
                    values: [{name: "Default Title"}]
                }]
                variants: [
                    {
                        
                        price: ${productData.price},
                        sku: "${productData.sku}",
                        optionValues: [{optionName: "Title", name: "Default Title"}]
                    }
                ]
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


        // console.log(JSON.stringify(createResponse.data, null, 2));
        const { product, userErrors } = createResponse.data.data.productSet;
        if (userErrors.length > 0) {
            return res.status(400).json({ errors: userErrors });
        }
        res.status(201).json(product);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
}