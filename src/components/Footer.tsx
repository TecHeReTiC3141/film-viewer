import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div
            className="container px-4 flex flex-col items-center gap-y-2 mx-auto mt-6 py-4 border-t-2 border-gray-500 rounded-xl">
            <p className="">2024. <span className="font-bold">Film Viewer</span></p>
            <p className="text-sm">Made by <Link to="https://github.com/TecHeReTiC3141" target="_blank"
                      className="italic hover:underline">TecHeReTiC</Link> with love and dedication</p>
        </div>
    )
}