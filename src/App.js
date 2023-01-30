import React from 'react'
import {Routes,Route} from 'react-router-dom'
import MainPage from './Pages/MainPage'
import Blog from './Pages/Blog'
import Gallery from './Pages/Gallery'
import Services from './Pages/Services'
import Contact from './Pages/Contact'
import Doctors from './Pages/Doctors'
import Appointment from './Pages/Appointment'
import Hero from './Pages/Hero'
import Reports from './Pages/Reports'

export default function App() {
  return (
    <Routes>

      <Route exact path='/' element={<Blog/>}/>
      <Route exact path='/blog' element={<Blog/>}/>
      <Route exact path='/gallery' element={<Gallery/>}/>
      <Route exact path='/services' element={<Services/>}/>
      <Route exact path='/contact' element={<Contact/>}/>
      <Route exact path='/doctors' element={<Doctors/>}/>
      <Route exact path='/appointment' element={<Appointment/>}/>
      <Route exact path='/hero' element={<Hero/>}/>
      <Route exact path='/reports' element={<Reports/>}/>

    </Routes>
  )
}

