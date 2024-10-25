import ItemBoard from '../components/ItemBoard'
import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'

export const BASE_URL = import.meta.env.VITE_BASE_URL


export default function InventoryPage() {
    const [tamData, setTamData] = useState([])
    const [shopifyData, setShopifyData] = useState([])

    useEffect(() => {
      async function initialFetch() {
        // pulls from mongodb
        const tamResponse = await fetch(`${BASE_URL}/tam`)
        const tamJSON = await tamResponse.json()
        setTamData(tamJSON)
  
        // pulls from shopify
        const shopifyResponse = await fetch(`${BASE_URL}/shopify`)
        const shopifyJSON = await shopifyResponse.json()
        console.log(shopifyJSON)
        setShopifyData(shopifyJSON)
      }
      initialFetch()
    }, [])


    async function handleSearch(e, searchTerm) {
      e.preventDefault()
      const tamRes = await fetch(`${BASE_URL}/tam?search=${searchTerm}`);
      const tamJSON = await tamRes.json()
      setTamData(tamJSON)

      const shopifyRes = await fetch(`${BASE_URL}/shopify?search=${searchTerm}`);
      const shopifyJSON = await shopifyRes.json()
      setShopifyData(shopifyJSON)
    }

    async function handleFilter(status, shopName) {
      let num;
      if (status == "lowstock") {
        num = 5
      } else if (status == "outstock") {
        num = 0
      }
      if (shopName == 'tam') {
        const tamRes = await fetch(`${BASE_URL}/tam?status=${num}`);
        const tamJSON = await tamRes.json()
        setTamData(tamJSON)
      } else if (shopName == "shopify") {
        const shopifyRes = await fetch(`${BASE_URL}/shopify?status=${num}`);
        const shopifyJSON = await shopifyRes.json()
        setShopifyData(shopifyJSON)
      }  
    }


    return (
      <div className='card'>
        <SearchBar onSearch={handleSearch}/>
        <div className="" id="invCard">
          <ItemBoard title={"TAM"} inventory={tamData} onFilter={handleFilter}/>
          <ItemBoard title={"Shopify"} inventory={shopifyData} onFilter={handleFilter}/>
        </div>
      </div>
    )
}