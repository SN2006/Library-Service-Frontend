import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./routes/home/Home.jsx";
import Login from "./routes/auth-form/Login.jsx";
import Book, {bookLoader} from "./routes/bookPage/Book.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/books/:id",
        loader: bookLoader,
        element: <Book/>
    }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
