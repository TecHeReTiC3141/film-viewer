import Header from "./components/Header.tsx";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

export default function Home() {
    return (
        <div className="h-full bg-gray-800 text-white flex flex-col">
            <Header/>
            <div className="flex-1">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}