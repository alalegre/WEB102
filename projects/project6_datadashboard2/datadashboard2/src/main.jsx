import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import './index.css'

import App from './App.jsx'
import Layout from './routes/Layout'
import DetailView from './routes/DetailView'
import SideBar from './Components/SideBar'
import NotFound from './routes/NotFound'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SideBar />}>
        <Route index element={<App />} />
        <Route path="/dayDetails/:date" element={<DetailView />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)
