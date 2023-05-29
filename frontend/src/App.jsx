import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Index from './pages/Index'
import Login from './pages/Login'
import Register from './pages/Register'
import { UserContextProvider } from './UserContext'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import EditPost from './pages/EditPost'

export default function App() {
  return (
    <div className='App'>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' index element={<Index />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/create-new-post' element={<CreatePost />}></Route>
            <Route path='/post/:id' element={<Post />}></Route>
            <Route path='/edit-post/:id' element={<EditPost />}></Route>
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  )
}
