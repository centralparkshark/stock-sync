import ItemBoard from '../components/ItemBoard'
import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'

export const BASE_URL = import.meta.env.VITE_BASE_URL


export default function InventoryPage() {
    const [search, setSearch] = useState("")
    const [tamData, setTamData] = useState([])
    const [shopifyData, setShopifyData] = useState([])
    const [searchedTamData, setSearchedTamData] = useState(tamData)
    const [searchedShopifyData, setSearchedShopifyData] = useState(shopifyData)
  
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

    function handleSearch(search) {
      setSearch(search)
      setSearchedTamData(searchInventory(tamData))
      setSearchedShopifyData(searchInventory(shopifyData))
    }

    function searchInventory(inventory) {
      return inventory.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    }


    return (
      <div className='card'>
        <SearchBar onSearch={handleSearch}/>
        <div className="" id="invCard">
          <ItemBoard title={"TAM"} inventory={searchedTamData}/>
          <ItemBoard title={"Shopify"} inventory={searchedShopifyData}/>
        </div>
      </div>
    )
}