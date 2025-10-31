import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import api from "../utils/axios"
import {useDispatch} from "react-redux"
import { registerUser } from "../store/auth-slice"

export const RegisterPage=()=>{
    let username=useRef()
    let email=useRef()
    let password=useRef()
    const navigate = useNavigate()
    const dispatch=useDispatch()

    const handleFormSubmit = async(e) => {
        e.preventDefault()
        const formData = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value
        };
        
        const result = await dispatch(registerUser(formData))
        
        if (result.type === '/auth/register/fulfilled') {
            navigate('/auth/login')
            console.log(result.payload.message)
        } else if (result.type === '/auth/register/rejected') {
            // Display the validation error message
            console.log("Registration error",result.payload.message || 'Registration failed')
        }
    }


    return(
        <>
        <form onSubmit={handleFormSubmit}>
            <div>
                <label for="username">Username</label>
                <input type="text" placeholder="Enter your username" id="username" className="border-2" ref={username}/>
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