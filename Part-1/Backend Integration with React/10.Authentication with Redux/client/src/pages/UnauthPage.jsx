import { useNavigate } from "react-router-dom"

export const UnauthPage=()=>{
    const navigate=useNavigate()
    const handleBack=(e)=>{
        e.preventDefault()
        navigate("/api/user/home")
    }
    return(
        <>
        <div>
        You are not unauthorized for this page.
        This page is for the admin only. 
        </div>

        <span className="border w bg-blue-500 text-white ">
        <button onClick={handleBack} className="cursor-pointer"> Go back to your user home page</button>
        </span>
        </>
    )
}