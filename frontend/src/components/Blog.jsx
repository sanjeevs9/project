import axios from "axios"
import { useEffect, useState } from "react"
import network from "../../network"
import { useParams, useSearchParams } from "react-router-dom"

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
        <div>{data.title}</div>
        <div>{data.description}</div>
        <div>{data.date}</div>
        <div>{data.author}</div>
        </>
    )
}