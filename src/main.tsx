import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from "react-router-dom";
import FilmsGallery from "./FilmsGallery.tsx";
import Home from "./Home.tsx";
import FilmPage from "./FilmPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage.tsx";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<Home/>} errorElement={<ErrorPage />}>
            <Route path="/:id" element={<FilmPage/>} errorElement={<ErrorPage />}/>
            <Route index element={<FilmsGallery/>} errorElement={<ErrorPage />}/>
        </Route>
    </>
));

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
