import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import MealDetails from "../pages/details/MealDetails";
import Meals from "../pages/meals/Meals";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/meals/:id",
                element: <MealDetails></MealDetails>,
                loader: async ({ params }) => {
                    const data = await fetch(
                        `http://localhost:3000/meals/${params.id}`
                    ).then((res) => res.json());
                    return data;
                },
            },
            {
                path: "/meals",
                element: <Meals></Meals>,
                loader: async () => {
                    const data = await fetch(
                        "http://localhost:3000/meals"
                    ).then((res) => res.json());
                    return data;
                },
            },
        ],
    },
]);

export default router;
