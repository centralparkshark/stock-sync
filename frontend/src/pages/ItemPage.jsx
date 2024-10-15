import { useLoaderData } from "react-router-dom"
import { BASE_URL } from "./InventoryPage"
import { useState, useEffect } from "react"
import AddItemPopUp from "../components/AddItemPopUp"
import ItemForm from "../components/ItemForm"

export default function ItemPage() {
    const {tam, shopify } = useLoaderData()
    const [shopifyData, setShopifyData] = useState(shopify[0] || null)
    const tamData = tam[0]
    const [popUpOpen, setPopUpOpen] = useState(false)

    function NotFound({name, sku}) {
        return (
            <div className="card">
                <h2>No item found.</h2>
                {name == "shopify" ? <button onClick={() => setPopUpOpen(true)}>Create item?</button> : ''}
            </div>
        )
    }    

    async function handleCreateItem(sku) {
        try {
            const response = await fetch(`${BASE_URL}/shopify`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(tamData),
            })
            if (response.ok) {
                const newShopifyData = await fetch(`${BASE_URL}/shopify/${sku}`);
                if (newShopifyData.ok) {
                    const data = await newShopifyData.json()
                    setShopifyData(data[0])
                } else {
                    console.error("Failed to fetch new data.")
                }
            }
        } catch(e) {
            console.error(e)
        }
    }

    return (
        <div className="flex relative">
            {popUpOpen && <AddItemPopUp setPopUpOpen={setPopUpOpen}/>}
            <div className="half">
                <h1>TAM</h1>
                {tamData ? <ItemForm {...tamData} name="tam"/> : <NotFound name ="tam"/>}            
            </div>
            <div className="half">
                <h1>Shopify</h1>
                {shopifyData ? <ItemForm {...shopifyData} name="shopify"/> : <NotFound name ="shopify"  sku={tamData.sku}/>}   
            </div>
            
            
        <div>
                {/* {itemData.category.map(tag => <div className="status">{tag}</div>)} */}
            </div>
        </div>
        
    )
}

// loader function
export const itemLoader = async (params) => {
    const tamRes = await fetch(`${BASE_URL}/tam/${params.sku}`)
    const shopifyRes = await fetch(`${BASE_URL}/shopify/${params.sku}`)

    const tam = await tamRes.json()
    const shopify = await shopifyRes.json()
    return {tam, shopify}
}
