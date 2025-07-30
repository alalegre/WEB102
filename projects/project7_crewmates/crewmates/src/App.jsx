import { useState } from 'react'
import './App.css'

import Create from './pages/Create'
import Edit from './pages/Edit'
import Summary from './pages/Summary'
import Main from './pages/Main'
import Sidebar from './components/SideBar'

import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  let element = useRoutes([
    {
      path: "/",
      element: <Main />
    },
    {
      path: "/edit/:id",
      element: <Edit />
    },
    {
      path: "/summary",
      element: <Summary />
    },
    {
      path: "/create",
      element: <Create />
    }
  ])

  return (
    <div className="App">
      <Sidebar />
      <div className="header">
      </div>
      {element}
    </div>
  )
}

export default App
