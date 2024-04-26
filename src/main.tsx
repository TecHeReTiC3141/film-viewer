import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from "react-router-dom";
import FilmsGallery from "./FilmsGallery.tsx";
import Home from "./Home.tsx";
import FilmPage from "./FilmPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<Home/>}/>
        <Route path="/films/:id" element={<FilmPage/>}/>
        <Route path="/films" element={<FilmsGallery/>}/>
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
