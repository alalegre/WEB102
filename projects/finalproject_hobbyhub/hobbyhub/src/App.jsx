import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Home from './pages/Home'
import NavBar from './components/NavBar'
import NewPost from './pages/NewPost'
import PostInfo from './pages/PostInfo'
import EditPost from './pages/EditPost'

import './App.css'

function App() {
  let element = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/create',
      element: <NewPost />
    },
    {
      path: '/post/:id',
      element: <PostInfo />
    },
    {
      path: '/edit/:id',
      element: <EditPost />
    },
  ])

  return (
    <div className="App">
      <NavBar />
      {element}
    </div>
  )
}

export default App
