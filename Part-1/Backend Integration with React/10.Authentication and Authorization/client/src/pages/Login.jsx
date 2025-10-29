import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import api from "../utils/axios"

export const LoginPage=()=>{
    console.log("I am here")
    const email=useRef()
    const password=useRef()
    const navigate = useNavigate()

    const handleFormSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response = await api.post("/auth/login", {
                email: email.current.value,
                password: password.current.value
            })
            
            // Store the token
            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem("role",response.data.role)
                localStorage.setItem("isAuthenticated",response.data.isAuthenticated)
                // Redirect to home page or dashboard
                navigate('/api/user/home')
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message)
            // Handle error (show to user)
        }
    }

    return(
        <>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label for="email">Email: </label>
                    <input type="email" id="email" placeholder="Enter your email" ref={email} className="border-2"/>
                </div>
                <div>
                    <label for="password">Password: </label>
                    <input type="password" id="password" placeholder="Enter your password" ref={password} className="border-2"/>
                </div>

                <button type="submit" className="border">Login</button>
            </form>
        </>
    )
}