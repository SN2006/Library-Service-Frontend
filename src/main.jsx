import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>
            hello
        </div>
    },
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
