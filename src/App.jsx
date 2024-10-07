import './App.css'
import SyncedOverview from './components/SyncedOverview'
import Item from './components/Item'
import { tamData } from './data/tam'


function App() {

  return (
    <>
      <div className='left'>
        <SyncedOverview />
      </div>
      <div className="right">
        <div className='items card'>
          {tamData.map(item => (<Item key={item.sku} {...item}></Item>))}
        </div>
      </div>
      
      
    </>
  )
}

export default App

