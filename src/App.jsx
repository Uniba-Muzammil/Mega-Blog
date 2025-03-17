import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login,logout } from './store/authSlice'
import authServices from './appwrite/auth'

function App() {
const [loading, setLoading] = useState(true)
const dipatch = useDispatch()
useEffect(() => {
    authServices.getCurrentUser()
    .then((userData) => {
        if (userData) {
            dipatch(login({userData}))
        }
        else{
            dipatch(logout())
        }
    })
    .finally(() => {
        setLoading(false)
    }
    )},[])
    
  return !loading ? (
    <div className='text-'>hii</div>
      
    
  ):null
}


export default App
