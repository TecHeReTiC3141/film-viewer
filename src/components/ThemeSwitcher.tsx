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
            <div className="rounded-full w-14 h-8 border-2 border-gray-900 dark:border-white bg-transparent p-2 relative">
                <div
                    className="h-5 w-5 rounded-full absolute left-1 dark:left-7 top-1 bg-gray-900 dark:bg-white transition-all duration-300" />
            </div>
            <FaRegMoon/>
        </button>
    );
}