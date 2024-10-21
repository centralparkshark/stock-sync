import { useLoaderData } from "react-router-dom"
import { BASE_URL } from "./InventoryPage"
import { useState, useEffect } from "react"
import AddItemPopUp from "../components/AddItemPopUp"
import ItemForm from "../components/ItemForm"
import './itemPage.css'


export default function ItemPage() {
    const {tam, shopify } = useLoaderData()
    const [shopifyData, setShopifyData] = useState(shopify[0] || null)
    const tamData = tam[0]
    const [popUpOpen, setPopUpOpen] = useState(false)

    function NotFound() {
        return (
            <div className="center">
                <button type="button" onClick={() => setPopUpOpen(true)}>Add to Shopify?</button> 
            </div>
        )
    }  

    return (
        <div className=" flex relative">
            {popUpOpen && <AddItemPopUp setPopUpOpen={setPopUpOpen} tamData={tamData} setShopifyData={setShopifyData}/>}
            <ItemForm tamData={tamData} shopifyData={shopifyData} NotFound={NotFound} />
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
