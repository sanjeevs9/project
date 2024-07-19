import axios from "axios"
import { useEffect, useState } from "react"
import network from "../../network"
import { useParams, useSearchParams } from "react-router-dom"
import Header from "./Header";

export  default function Blog(){
    const [data,setdata]=useState({title:"",description:"",author:"",date:""}); 
    const {id}=useParams();

    console.log(id)
    useEffect(()=>{
        async function fetch(){
            await axios.get(`${network}post/blog/${id}`)
            .then(res=>{
            
                setdata({title:res.data.message.title,description:res.data.message.description,author:res.data.message.author,date:res.data.message.publish_date})
            }).catch(err=>{
                console.log(err);
            })
        }   
        fetch()
    },[])
    useEffect(()=>{
        console.log(data);
    },[data])

    return (
        <>
        <Header>

        </Header>
        <div className="flex justify-center">
            <div className="max-w-[50rem] pl-10 pr-10 flex flex-col items-center pt-5 ">
          
                <div className="font-bold text-4xl underline">{data.title}</div>  
                <div className=" flex flex-col w-full">  
                <div className="pr-10 pt-5 font-semibold flex justify-end text-sm">{data.date}</div>
                </div>
                <div className="pt-10 font-medium leading-9">{data.description}</div>
                <div className="w-full pt-10">
                    <div>
                <div className="font-bold">{data.author}</div>
                <div className="">  Author</div>
                </div>
                </div>
            </div>
        </div>
        
        
        
        </>
    )
}