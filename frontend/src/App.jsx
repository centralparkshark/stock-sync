import './App.css'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <NavBar />
      <div id="detail">
        <Outlet />
      </div>
    </>
  )
}

export default App

