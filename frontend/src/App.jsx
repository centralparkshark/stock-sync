import './App.css'
import NavBar from './components/NavBar'
import ProfileBar from './components/ProfileBar'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <NavBar />
      <div id="detail">
        <ProfileBar />
        <Outlet />
      </div>
    </>
  )
}

export default App

