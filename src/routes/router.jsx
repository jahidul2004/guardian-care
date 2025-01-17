import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import MealDetails from "../pages/details/MealDetails";
import Meals from "../pages/meals/Meals";
import Login from "../pages/Login/Login";
import Register from "../pages/register/Register";
import UserDashboard from "../pages/userDashboard/UserDashboard";
import MyProfile from "../pages/userDashboard/profile/MyProfile";
import PrivateRoute from "./PrivateRoute";

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
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/dashboard/user",
                element: (
                    <PrivateRoute>
                        <UserDashboard></UserDashboard>
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: "profile",
                        element: <MyProfile></MyProfile>,
                    },
                    {
                        path: "requestedMeal",
                        element: <h1>Requested Meal</h1>,
                    },
                    {
                        path: "myReview",
                        element: <h1>My Review</h1>,
                    },
                    {
                        path: "paymentHistory",
                        element: <h1>Payment History</h1>,
                    },
                ],
            },
        ],
    },
]);

export default router;
