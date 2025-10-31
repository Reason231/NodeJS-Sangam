import { Outlet } from "react-router-dom"
import { Footer } from "../components/UI/Footer"
import { Header } from "../components/UI/Header"

export const AppLayout=()=>{

    return(
        <div className="flex flex-col gap-2 ">
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
        </div>
    )
}