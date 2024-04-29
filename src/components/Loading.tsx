import { DotLoader } from "react-spinners";

interface LoadingProps {
    text: string;
}

export default function Loading({text}: LoadingProps) {
    return (
        <div className="w-full flex flex-col my-12 gap-y-10 items-center">
            <DotLoader
            size={120}
            color="#e04210"
            />
            <h3>Загружаем {text}...</h3>
        </div>
    )
}