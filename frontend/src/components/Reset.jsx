import { useState } from "react"
import ReactDom from "react-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

export default function Reset({pop,popup}){
    const[value,setvalue]=useState({
        email:"",
        oldPassword:"",
        newPassword:""
    })
    const token=localStorage.getItem("token")
    
    if(!pop){
        return null
    }
   
    async function handle(){
        console.log(value)
        console.log(token)
        await axios.put("http://localhost:3000/api/user/reset",
        value,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }    
        ).then(res=>{
            console.log(res.data.message)
            toast.success(res.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }).catch(e=>{
            console.log(e.response.data.message)
            toast.error(e.response.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })
    } 
return  ReactDom.createPortal(
    <>
     <div className="fixed top-0 left-0 min-w-full h-full flex items-center justify-center z-45 backdrop-blur-sm">
     
  <div className="relative flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

  <div className="absolute z-50 cursor-pointer translate-x-44 -translate-y-48 rotate-45" onClick={popup}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
</div>
      <div className="w-96 p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md  sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Change Password
          </h2>
          <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2" placeholder="name@company.com" 
                  onChange={(e)=>{
                    setvalue((c)=>({
                    ...c,
                    email:e.target.value
                    }))}}/>
              </div>
              <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Old Password</label>
                  <input type="password" name="password" id="oldPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" 
                  onChange={(e)=>{
                    setvalue((c)=>({
                        ...c,
                        oldPassword:e.target.value
                    }))}}/>
              </div>
              <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 ">New password</label>
                  <input type="password" name="newPassword" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  onChange={(e)=>{
                    setvalue((c)=>({
                        ...c,
                        newPassword:e.target.value
                    }))
                  }}/>
              </div>
              <div className="flex items-start">
                
              </div>
              <button  className="w-full text-white bg-red-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={handle}>Reset passwod</button>
          </div>
      </div>
  </div>
    </div>
    </>,
    document.getElementById('portal')
)
}