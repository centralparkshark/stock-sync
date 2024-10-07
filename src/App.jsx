import './App.css'
import SyncedOverview from './components/SyncedOverview'
import ItemBoard from './components/ItemBoard'

function App() {

  return (
    <>
      <div className='left'>
        <SyncedOverview />
      </div>
      <div className="right">
        <ItemBoard />
      </div>
      
      
    </>
  )
}

export default App

