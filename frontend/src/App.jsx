import './App.css'
import SyncedOverview from './components/SyncedOverview'
import ItemBoard from './components/ItemBoard'
// import { tamData } from './data/tam'
// import { shopifyData } from './data/shopify'
import { useEffect, useState } from 'react'

export const BASE_URL = import.meta.env.VITE_BASE_URL

function App() {

  const [tamData, setTamData] = useState([])
  const [shopifyData, setShopifyData] = useState([])

  useEffect(() => {
    async function initialFetch() {
      const tamResponse = await fetch(`${BASE_URL}/tam`)
      const tamData = await tamResponse.json()
      console.log(tamData)
      setTamData(tamData)

      const shopifyResponse = await fetch(`${BASE_URL}/shopify`)
      console.log(shopifyResponse)
      const shopifyData = await shopifyResponse.json()
      console.log(shopifyData)
      setShopifyData(shopifyData)
    }
    initialFetch()
  }, [])

  

  return (
    <>
      <div className='left'>
        <SyncedOverview />
        <div className='card'><h2 className='titleBar'>Cycle Counting:</h2>Coming Soon</div>
      </div>
      <div className="right">
        <ItemBoard title={"TAM"} inventory={tamData}/>
        <ItemBoard title={"Shopify"} inventory={shopifyData}/>
      </div>
      
      
    </>
  )
}

export default App

