import { useMemo } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { SetURLSearchParams } from "react-router-dom";
import clsx from "clsx";


interface PaginationBarProps {
    currentPage: number;
    setSearchParams: SetURLSearchParams,
}

export default function PaginationBar({currentPage, setSearchParams}: PaginationBarProps) {

    const left = useMemo(() => Math.max(1, currentPage - 3), [currentPage]);
    const right = useMemo(() => Math.max(7, currentPage + 3), [currentPage]);
    return (
        <div className="flex w-fit gap-2 my-2 mx-auto">
            {left > 1 && <button onClick={() => setSearchParams({page: `${currentPage - 1}`})}><FaArrowLeftLong /></button>}
            {Array.from(Array(right - left + 1).keys()).map(num => (
                <button key={num} className={clsx("px-4 py-2 text-lg rounded-md", currentPage === left + num ? "bg-white text-gray-800" : "hover:bg-gray-600")}
                        onClick={() => setSearchParams({ page: `${left + num}` })}>{left + num}</button>))}
            <button onClick={() => setSearchParams({ page: `${currentPage + 1}` })}><FaArrowRightLong/></button>
        </div>
    )
}