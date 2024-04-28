import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { SetURLSearchParams } from "react-router-dom";
import clsx from "clsx";
import { useScrollDirection } from "react-use-scroll-direction";


interface PaginationBarProps {
    currentPage: number;
    setSearchParams: SetURLSearchParams,
}

export default function PaginationBar({ currentPage, setSearchParams }: PaginationBarProps) {

    const barRef = useRef<HTMLDivElement>(null);


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

    const left = useMemo(() => Math.max(1, currentPage - oneSideBarLength),
        [ currentPage, oneSideBarLength ]);
    const right = useMemo(() => Math.max(oneSideBarLength * 2 + 1, currentPage + oneSideBarLength),
        [ currentPage, oneSideBarLength ]);

    const { scrollDirection } = useScrollDirection();

    useEffect(() => {
        if (scrollDirection === "DOWN") {
            barRef?.current?.classList.remove("max-sm:top-16");
            barRef?.current?.classList.add("max-sm:top-0");
        } else if (scrollDirection === "UP") {
            barRef?.current?.classList.add("max-sm:top-16");
            barRef?.current?.classList.remove("max-sm:top-0");
        }
    }, [ scrollDirection ]);

    useEffect(() => {
        determineOneSideBarLength();

        function handleResize() {
            determineOneSideBarLength()
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [ determineOneSideBarLength ]);


    return (
        <div ref={barRef}
             className={clsx(`bg-gray-200 rounded-b-lg py-3 px-2 dark:bg-gray-800 sticky 
                 max-sm:top-16 max-sm:left-[50vw] max-sm:-translate-x-1/2 max-sm:z-20 flex w-fit gap-2 my-2 mx-auto transition-all duration-300`)}>
            {(left > 1 || oneSideBarLength === 0) &&
                <button className="px-4 py-2 text-lg rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                        disabled={currentPage == 1}
                        onClick={() => setSearchParams({ page: `${currentPage - 1}` })}><FaArrowLeftLong/>
                </button>}
            <div className="flex gap-2">

                {Array.from(Array(right - left + 1).keys()).map(num => (
                    <button key={num} disabled={currentPage === left + num}
                            className={clsx("px-4 py-2 text-lg rounded-md ",
                                currentPage === left + num ? "bg-gray-800 text-gray-200 dark:bg-white dark:text-gray-800" : "hover:bg-gray-300 dark:hover:bg-gray-600")}
                            onClick={() => setSearchParams({ page: `${left + num}` })}>{left + num}</button>))}
            </div>
            <button className="px-4 py-2 text-lg rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    onClick={() => setSearchParams({ page: `${currentPage + 1}` })}><FaArrowRightLong/></button>
        </div>
    )
}