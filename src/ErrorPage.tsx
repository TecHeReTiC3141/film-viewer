import { Link, useNavigate, useRouteError } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

export default function ErrorPage() {
    const error = useRouteError() as { statusText: string, message: string };
    console.error("Error: " + error);

    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-6 my-8">
            {error?.statusText === "Not found" || error?.message === "Not found" ?
                (
                    <>
                        <h1 className="text-xl font-bold">Страница не найдена</h1>
                        <Link to="/"
                              className="flex items-center text-lg text-gray-200 hover:text-white
                              gap-2 mt-2 rounded-full p-3 bg-blue-400 hover:bg-blue-600"><FaArrowLeft/> На главную</Link>
                    </>
                ) : <>
                    <h1>Произошла непредвиденная ошибка</h1>
                    <h3>Попробуйте перезагрузить страницу</h3>
                    <button onClick={() => navigate(0)}>Обновить страницу</button>
                </>}

        </div>
    )
}