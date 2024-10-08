import ItemBoard from '../components/ItemBoard'
import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'

export const BASE_URL = import.meta.env.VITE_BASE_URL


export default function InventoryPage() {
    const [tamData, setTamData] = useState([])
    const [shopifyData, setShopifyData] = useState([])
  
    useEffect(() => {
      async function initialFetch() {
        const tamResponse = await fetch(`${BASE_URL}/tam`)
        const tamData = await tamResponse.json()
        setTamData(tamData)
  
        const shopifyResponse = await fetch(`${BASE_URL}/shopify`)
        const shopifyData = await shopifyResponse.json()
        setShopifyData(shopifyData)
      }
      initialFetch()
    }, [])



    return (
      <div className='card'>
        <SearchBar />
        <div className="" id="invCard">
          <ItemBoard title={"TAM"} inventory={tamData}/>
          <ItemBoard title={"Shopify"} inventory={shopifyData}/>
        </div>
      </div>
    )
}