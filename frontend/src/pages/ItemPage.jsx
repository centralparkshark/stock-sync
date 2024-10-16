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

    function NotFound({name}) {
        return (
            <div className="card">
                <h2>No item found.</h2>
                {name == "shopify" ? <button onClick={() => setPopUpOpen(true)}>Create item?</button> : ''}
            </div>
        )
    }    

    return (
        <div className="flex relative">
            {popUpOpen && <AddItemPopUp setPopUpOpen={setPopUpOpen} tamData={tamData} />}
            <div className="half">
                <h1>TAM</h1>
                {tamData ? <ItemForm {...tamData} name="tam"/> : <NotFound name ="tam"/>}            
            </div>
            <div className="half">
                <h1>Shopify</h1>
                {shopifyData ? <ItemForm {...shopifyData} name="shopify"/> : <NotFound name ="shopify"  sku={tamData.sku}/>}   
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
