import { useNavigate } from "react-router-dom"

export default function Popup({
    email, 
}){
    const navigate = useNavigate();
    
    function handle(){
        localStorage.removeItem("token")
        navigate("/signin")
    }
    return(
        <>
        <div className="h-fit w-40 bg-slate-50  absolute translate-y-24 rounded-md ">
            <ol className=" gap-2  ">
                <li className="  text-sm pl-2 ">
                    {email} 
                </li>
                <hr className="h-[0.5px] my-2 w-full bg-black border-0 " />
                <li className="pb-2 hover:bg-slate-100 ... w-full  pl-2 cursor-pointer">
                    Settings
                </li>
                <li className="pb-2 hover:bg-slate-100 ... w-full pl-2 cursor-pointer">
                    Help
                </li>
                <li className="pb-2 hover:bg-slate-100 ... pl-2 cursor-pointer" onClick={handle}>
                    Sign out
                </li>
                
            </ol>
        </div>
        </>
    )
}