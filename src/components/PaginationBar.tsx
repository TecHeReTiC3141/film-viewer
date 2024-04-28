import { useCallback, useEffect, useMemo, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { SetURLSearchParams } from "react-router-dom";
import clsx from "clsx";


interface PaginationBarProps {
    currentPage: number;
    setSearchParams: SetURLSearchParams,
}

export default function PaginationBar({ currentPage, setSearchParams }: PaginationBarProps) {

    const determineOneSideBarLength = useCallback(() => {
        if (window.innerWidth < 640) {
            setOneSideBarLength(0);
        } else if (window.innerWidth < 768) {
            setOneSideBarLength(1);
        } else {
            setOneSideBarLength(3);
        }
    }, []);

    const [ oneSideBarLength, setOneSideBarLength ] = useState<number>(3);
    // TODO: conditionally set length of pagination bar (like if sm < width < md) then only one from each side
    const left = useMemo(() => Math.max(1, currentPage - oneSideBarLength),
        [ currentPage, oneSideBarLength ]);
    const right = useMemo(() => Math.max(oneSideBarLength * 2 + 1, currentPage + oneSideBarLength),
        [ currentPage, oneSideBarLength ]);

    useEffect(() => {
        determineOneSideBarLength();
        window.addEventListener("resize", () => determineOneSideBarLength());
    }, [ determineOneSideBarLength ]);
    return (
        <div className="flex w-fit gap-2 my-2 mx-auto">
            {(left > 1 ||  oneSideBarLength === 0) &&
                <button className="px-4 py-2 text-lg rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                        onClick={() => setSearchParams({ page: `${currentPage - 1}` })}><FaArrowLeftLong/>
                </button>}
            <div className="flex gap-2">

                {Array.from(Array(right - left + 1).keys()).map(num => (
                    <button key={num} disabled={currentPage === num} className={clsx("px-4 py-2 text-lg rounded-md ",
                        currentPage === left + num ? "bg-gray-800 text-gray-200 dark:bg-white dark:text-gray-800" : "hover:bg-gray-300 dark:hover:bg-gray-600")}
                            onClick={() => setSearchParams({ page: `${left + num}` })}>{left + num}</button>))}
            </div>
            <button className="px-4 py-2 text-lg rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    onClick={() => setSearchParams({ page: `${currentPage + 1}` })}><FaArrowRightLong/></button>
        </div>
    )
}