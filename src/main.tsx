import CreateCategory from "./pages/Categories/CreateCategory";
import EditCategory from "./pages/Categories/EditCategory";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Categories from "@pages/Categories/Categories";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Register from "@pages/Register";

import "@assets/fonts/inter/Inter-Bold.ttf";
import "@assets/fonts/inter/Inter-Light.ttf";
import "@assets/fonts/inter/Inter-Medium.ttf";
import "@assets/fonts/inter/Inter-Regular.ttf";

import App from "@/App";
import "@/index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/categories",
                element: <Categories />,
            },
            {
                path: "/categories/create",
                element: <CreateCategory />,
            },
            {
                path: "/categories/edit/:id",
                element: <EditCategory />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
