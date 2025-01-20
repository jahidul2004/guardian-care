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
import UpcomingMeals from "../pages/upcomingMeal/UpcomingMeals";
import RequestedMeals from "../pages/userDashboard/requestedMeals/RequestedMeals";
import MyReviews from "../pages/userDashboard/myReviews/MyReviews";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../pages/adminDashboard/adminProfile/AdminProfile";
import ManageUser from "../pages/adminDashboard/manageUser/ManageUser";
import AddMeal from "../pages/adminDashboard/addMeal/AddMeal";
import AllMeals from "../pages/adminDashboard/allMeals/AllMeals";
import AllReview from "../pages/adminDashboard/allReview/AllReview";
import MealRequests from "../pages/adminDashboard/mealRequests/MealRequests";
import LoginRegisterPrivate from "./LoginRegisterPrivate";
import UpcomingMealsAdmin from "../pages/adminDashboard/upcomingMeals/UpcomingMealsAdmin";
import Payment from "../pages/payment/Payment";
import PaymentHistory from "../pages/userDashboard/paymentHistory/PaymentHistory";
import AdminHome from "../pages/adminDashboard/home/AdminHome";

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
                element: (
                    <PrivateRoute>
                        <MealDetails></MealDetails>
                    </PrivateRoute>
                ),
                loader: async ({ params }) => {
                    const data = await fetch(
                        `https://gurdian-care-server.vercel.app/meals/${params.id}`
                    ).then((res) => res.json());
                    return data;
                },
            },
            {
                path: "/meals",
                element: <Meals></Meals>,
                loader: async () => {
                    const data = await fetch(
                        "https://gurdian-care-server.vercel.app/meals"
                    ).then((res) => res.json());
                    return data;
                },
            },
            {
                path: "/login",
                element: (
                    <LoginRegisterPrivate>
                        <Login></Login>
                    </LoginRegisterPrivate>
                ),
            },
            {
                path: "/register",
                element: (
                    <LoginRegisterPrivate>
                        <Register></Register>
                    </LoginRegisterPrivate>
                ),
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
                        element: <RequestedMeals></RequestedMeals>,
                    },
                    {
                        path: "myReview",
                        element: <MyReviews></MyReviews>,
                    },
                    {
                        path: "paymentHistory",
                        element: <PaymentHistory></PaymentHistory>,
                    },
                ],
            },
            {
                path: "/upcomingMeals",
                element: <UpcomingMeals></UpcomingMeals>,
                loader: async () => {
                    const data = await fetch(
                        "https://gurdian-care-server.vercel.app/upcomingMeals"
                    ).then((res) => res.json());
                    return data;
                },
            },
            {
                path: "/payment/:id",
                element: (
                    <PrivateRoute>
                        <Payment></Payment>
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/adminDashboard",
        element: <AdminDashboard></AdminDashboard>,
        children: [
            {
                path: "/adminDashboard",
                element:<AdminHome></AdminHome>
            },
            {
                path: "profile",
                element: <AdminProfile></AdminProfile>,
            },
            {
                path: "manageUser",
                element: <ManageUser></ManageUser>,
            },
            {
                path: "addMeal",
                element: <AddMeal></AddMeal>,
            },
            {
                path: "allMeal",
                element: <AllMeals></AllMeals>,
            },
            {
                path: "allReview",
                element: <AllReview></AllReview>,
            },
            {
                path: "serveMeal",
                element: <MealRequests></MealRequests>,
            },
            {
                path: "upcomingMeal",
                element: <UpcomingMealsAdmin></UpcomingMealsAdmin>,
            },
        ],
    },
]);

export default router;
