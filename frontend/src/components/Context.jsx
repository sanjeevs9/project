import axios from "axios";
import { createContext, useEffect, useState } from "react";
import  network from "../../network";


export const Context=createContext(null);


export default function UserContext({children}){
    const[email,setEmail]=useState();
    const token=localStorage.getItem("token");
    const [login,setlogin]=useState(false);

    useEffect(()=>{
        if(!token){
            return;
        }
        axios.get(`${network}/user/get`,
            {
                headers:{
                    authorization:`Bearer ${token}`
                }
            },{
                email:email
            }
        ).then(res=>{
                setEmail(res.data.email)
                console.log(res.data.email)
        }).catch(err=>{
            console.log(err)
        })

    },[login])
    return(
        <>
        <Context.Provider value={{email,login,setlogin}}>
            {children}
        </Context.Provider>
        </>
    )
}