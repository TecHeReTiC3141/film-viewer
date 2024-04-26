import logo from "../../public/film-viewer-icon.png";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="w-full bg-red-500 sticky top-0 left-0 text-white text-xl py-4 px-3 flex gap-4 items-center">
            <img src={logo} alt="Logo" className="w-8 h-8"/>

            <Link to="/">
                <h2 className="hover:underline">Кино справочник</h2>
            </Link>
        </div>
    )
}