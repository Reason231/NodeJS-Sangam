import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import api from "../utils/axios"

export const RegisterPage=()=>{
    let userName=useRef()
    let email=useRef()
    let password=useRef()
    const navigate = useNavigate()

    const handleFormSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response = await api.post("/auth/register", {
                username: userName.current.value,
                email: email.current.value,
                password: password.current.value
            })
            navigate('/auth/login')
            return response
            
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.message || error.message)
            // Handle error (show to user)
        }
    }


    return(
        <>
        <form onSubmit={handleFormSubmit}>
            <div>
                <label for="username">Username</label>
                <input type="text" placeholder="Enter your username" id="username" className="border-2" ref={userName}/>
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" placeholder="Enter your email" id="email" className="border-2" ref={email}/>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" placeholder="Enter your password" id="password" className="border-2" ref={password}/>
            </div>
            
            <button className="border-2" type="submit">Register</button>

        </form>
        </>
    )
}