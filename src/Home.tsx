import Header from "./components/Header.tsx";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { useEffect } from "react";

export default function Home() {

    useEffect(() => {
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return (
        <div className="h-full bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white flex flex-col transition-colors duration-300">
            <Header/>
            <div className="flex-1">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}