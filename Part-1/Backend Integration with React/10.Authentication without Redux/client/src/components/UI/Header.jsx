import { NavLink } from "react-router-dom"

export const Header=()=>{
    return(
        <div className="flex border-2 gap-2 cursor-pointer items-end">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/auth/register">Register</NavLink>
        <NavLink to="/auth/login">Login</NavLink>
        <NavLink to="/auth/change-password">Change Password</NavLink>
        <NavLink to="/api/user/home">User Home</NavLink>
        <NavLink to="/api/admin/home">Admin Home</NavLink>
        </div>
    )
}