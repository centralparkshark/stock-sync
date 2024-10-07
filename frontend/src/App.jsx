import './App.css'
import SyncedOverview from './components/SyncedOverview'
import ItemBoard from './components/ItemBoard'
import { tamData } from './data/tam'
import { shopifyData } from './data/shopify'

export const BASE_URL = import.meta.env.VITE_BASE_URL

function App() {

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

