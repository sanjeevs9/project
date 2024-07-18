import JoditEditor from 'jodit-react';
import Header from './Header';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import network from '../../network';
import { toast } from 'react-toastify';


export default function Write(){
    const[value,setvalue]=useState({
        title:"",
        content:""
    })
    const token =localStorage.getItem("token");
    const editor =useRef(null)
    const navigate=useNavigate();

    useEffect(()=>{
        if(!token){
            toast.error("please login to post a blog", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              navigate("/signin")
        }
    },[])
   
    async function handle(){
        
        if(!token){
            return 
        }
        const date = new Date();
        const data = date.toString().split(" ");
        let final = data[1] + " " + data[2] + ", " + data[3];
    
        
        await axios.post(`${network}post/write`,
         {
                title:value.title,
                description:value.content,
                publish_date:final
         },{
            headers:{
                Authorization:`Bearer ${token}`
            }
         }
         ).then(res=>{
            console.log(res.data) 
            toast.success("Successfully posted", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });         

         }).catch(error=>{
            console.log(error)
            toast.error(error.response.data.message, {
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
    return(
        <>
      
    <div className='flex flex-col h-screen'>
        <div className=''>
        <Header/>
        </div>
        <div className='pl-20 pr-20 bg-red-100 h-full pt-5 '>
    
    
        <div className='flex flex-col justify-center '>
                <div className=''>
                <input className='flex p-3 border-2 w-full' placeholder='Title' onChange={(e)=>{
                    setvalue((c=>({...c,title:e.target.value})))}}></input>
                </div>
        </div>
        <div className=''>

        <JoditEditor className=''
    ref={editor}
    value={""}
    onChange={newContent => {
        

        // Replace <br> and </p> with newline characters
        let contentWithLineBreaks = newContent.replace(/<br\s*\/?>/g, "\n").replace(/<\/p>/g, "\n");
        // Remove all other HTML tags
        let contentWithoutTags = contentWithLineBreaks.replace(/<[^>]*>/g, "");

        setvalue(prevValue => ({...prevValue, content: contentWithoutTags}));
    }}
/>
                </div>
                <div className=' flex justify-center '>
                <button type="button" className="w-1/3 flex py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 items-center justify-center " onClick={handle}>Publish</button>
                </div>
        </div>
        </div>
        </>
    )
}