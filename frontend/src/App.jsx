import { Route,BrowserRouter,Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/post' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
