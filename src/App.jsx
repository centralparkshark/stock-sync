import './App.css'
import SyncedOverview from './components/SyncedOverview'
import ItemBoard from './components/ItemBoard'

function App() {

  return (
    <>
      <div className='left'>
        <SyncedOverview />
        <div className='card'><h2 className='titleBar'>Cycle Counting:</h2>Coming Soon</div>
      </div>
      <div className="right">
        <ItemBoard />
      </div>
      
      
    </>
  )
}

export default App

