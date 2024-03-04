import { Route,BrowserRouter,Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      
    </>
  )
}

export default App
