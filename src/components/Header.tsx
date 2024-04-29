import logo from "../../public/film-viewer-icon.png";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher.tsx";

export default function Header() {
    return (
        <div
            className="w-full bg-red-500 sticky top-0 left-0 text-gray-900 dark:text-white py-4 px-6 md:px-8 flex gap-4 items-center z-40">
            <Link to="/" className="flex items-center gap-4">
                <img src={logo} alt="Logo" className="w-8 h-8"/>
                <h2 className="text-sm md:text-xl hover:underline hidden sm:block">Кино справочник</h2>
            </Link>
            <div className="flex-1"/>
            <ThemeSwitcher/>
        </div>
    )
}