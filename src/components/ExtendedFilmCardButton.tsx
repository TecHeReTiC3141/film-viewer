import { IconType } from "react-icons";
import { useState } from "react";

export interface ExtendedFilmCardButtonProps {
    TurnedOnIcon: IconType,
    TurnedOffIcon: IconType,
    text: string,
}

export default function ExtendedFilmCardButton({ TurnedOffIcon, TurnedOnIcon, text }: ExtendedFilmCardButtonProps) {
    const [ turnedOn, setTurnedOn ] = useState<boolean>(false);
    return (
        <button onClick={event => {
            event.preventDefault();
            setTurnedOn(prev => !prev);
        }} className="flex flex-1 flex-col gap-y-2 items-center rounded-lg p-1 bg-transparent transition-colors duration-200
         hover:bg-gray-500 hover:dark:bg-gray-700 ">
            <span className="text-xl lg:text-2xl">
                {turnedOn ? <TurnedOnIcon/> : <TurnedOffIcon/>}
            </span>
            <p className="text-xs xl:text-sm text-nowrap">{text}</p>
        </button>
    )
}