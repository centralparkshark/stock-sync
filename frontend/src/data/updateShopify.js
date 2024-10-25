import { BASE_URL } from "../pages/InventoryPage";

async function updateShopify() {
    try {
        const response = await fetch(`${BASE_URL}/updateShopify`); 
        const products = await response.json();
        return products
    } catch (error) {
        console.error(error);
    }
}

// goal of this is to pull items off of shopify and upload them to mongodb