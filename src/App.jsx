import './App.css'
import Item from './components/Item'
import { tamData } from './data/tam'


function App() {

  return (
    <>
      {tamData.map(item => (<Item key={item.sku} {...item}></Item>))}
    </>
  )
}

export default App

