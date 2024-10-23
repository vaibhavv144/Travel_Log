import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/pages/Login'
import Register from './Components/pages/Register'
import NewVlog from './Components/pages/NewVlog'
import AllVlogs from './Components/pages/AllVlogs'
import Show from './Components/pages/Show'
import Edit from './Components/pages/Edit'
import Tour from "./routes/tour.jsx";
import Plans from './Components/pages/Plans.js'
import Home from "./Components/pages/Home.js"
import UserProfile from './Components/pages/UserProfile.js'
import Chat from './Components/pages/Chat.js'
import Expense from './Components/pages/Expense.js'
import Story from './Components/pages/Story.js'
import CreateStory from './Components/pages/CreateStory.js'
import CreateTrip from './Components/pages/CreateTrip.js'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tour' element={<Tour />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/new' element={<NewVlog />} />
        <Route path='/all' element={<AllVlogs />} />
        <Route path='/show/:id' element={<Show />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/plan' element={<Plans />} />
        <Route path='/profile/:id' element={<UserProfile />} />
        <Route path='/messages/:id' element={<Chat />} />
        <Route path='/expenses' element={<Expense />} />
        <Route path='/story' element={<Story />} />
        <Route path='/createstory' element={<CreateStory />} />
        <Route path='/createtrip' element={<CreateTrip />} />
      </Routes>

    </>
  )
}

export default App