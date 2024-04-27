import { MdOutlineWbSunny } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";


export default function ThemeSwitcher() {

    function handleThemeSwitch() {
        if (localStorage.theme === "dark") {
            document.documentElement.classList.remove('dark');
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem("theme", "dark");
        }

    }

    return (
        <button onClick={handleThemeSwitch} className="flex gap-3 items-center cursor-pointer">
            <MdOutlineWbSunny/>
            <div className="rounded-full w-14 h-7 border-4 border-white bg-transparent"></div>
            <FaRegMoon/>
        </button>
    )
}