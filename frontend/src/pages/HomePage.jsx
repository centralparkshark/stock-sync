import SyncedOverview from '../components/SyncedOverview'
import ItemBoard from '../components/ItemBoard'
import { useEffect, useState } from 'react'

export const BASE_URL = import.meta.env.VITE_BASE_URL

export default function HomePage() {
    
    const [tamData, setTamData] = useState([])
    const [shopifyData, setShopifyData] = useState([])
  
    // useEffect(() => {
    //   async function initialFetch() {
    //     const tamResponse = await fetch(`${BASE_URL}/tam`)
    //     const tamData = await tamResponse.json()
    //     console.log(tamData)
    //     setTamData(tamData)
  
    //     const shopifyResponse = await fetch(`${BASE_URL}/shopify`)
    //     console.log(shopifyResponse)
    //     const shopifyData = await shopifyResponse.json()
    //     console.log(shopifyData)
    //     setShopifyData(shopifyData)
    //   }
    //   initialFetch()
    // }, [])

  
    return (
        <>
        <div className='left'>
            <SyncedOverview />
            <div className='card'><h2 className='titleBar'>Cycle Counting:</h2>Coming Soon</div>
        </div>
        <div className="right card">
            <ItemBoard title={"TAM"} inventory={tamData}/>
            <ItemBoard title={"Shopify"} inventory={shopifyData}/>
        </div>
        </>
    )
}