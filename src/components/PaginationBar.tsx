import { useMemo } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { SetURLSearchParams } from "react-router-dom";
import clsx from "clsx";


interface PaginationBarProps {
    currentPage: number;
    setSearchParams: SetURLSearchParams,
}

export default function PaginationBar({ currentPage, setSearchParams }: PaginationBarProps) {
    // TODO: conditionally set length of pagination bar (like if sm < width < md) then only one from each side
    const left = useMemo(() => Math.max(1, currentPage - 3), [ currentPage ]);
    const right = useMemo(() => Math.max(7, currentPage + 3), [ currentPage ]);
    return (
        <div className="flex w-fit gap-2 my-2 mx-auto">
            {left > 1 && <button className="px-4 py-2 text-lg rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                                 onClick={() => setSearchParams({ page: `${currentPage - 1}` })}><FaArrowLeftLong/>
            </button>}
            <button disabled={currentPage === 1} className="px-4 py-2 text-lg rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    onClick={() => setSearchParams({ page: `${currentPage - 1}` })}><FaArrowLeftLong/>
            </button>
            <div className="md:flex gap-2 hidden">

                {Array.from(Array(right - left + 1).keys()).map(num => (
                    <button key={num} className={clsx("px-4 py-2 text-lg rounded-md ",
                        currentPage === left + num ? "bg-gray-800 text-gray-200 dark:bg-white dark:text-gray-800" : "hover:bg-gray-300 dark:hover:bg-gray-600")}
                            onClick={() => setSearchParams({ page: `${left + num}` })}>{left + num}</button>))}
            </div>
            <div className="block md:hidden">
                <button disabled
                    className={"px-4 py-2 text-lg rounded-md bg-gray-800 text-gray-200 dark:bg-white dark:text-gray-800 disabled"}>{currentPage}</button>
            </div>
            <button className="px-4 py-2 text-lg rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    onClick={() => setSearchParams({ page: `${currentPage + 1}` })}><FaArrowRightLong/></button>
        </div>
    )
}