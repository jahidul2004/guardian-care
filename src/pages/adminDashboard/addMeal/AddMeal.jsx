import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import {
    FaUtensils,
    FaImage,
    FaListUl,
    FaDollarSign,
    FaUserTie,
} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MdDescription } from "react-icons/md";

const AddMeal = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleAddMeal = (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const image = form.image.value;
        const ingredients = form.ingredients.value
            .split(",")
            .map((i) => i.trim()); // Trim whitespace
        const description = form.description.value;
        const price = parseFloat(form.price.value);
        const distributorName = user?.displayName;
        const distributorEmail = user?.email;

        const newMeal = {
            title,
            image,
            rating: 0,
            price,
            description,
            category,
            distributorName,
            distributorEmail,
            ingredients,
            postTime: new Date().toISOString(),
            likeCount: 0,
            reviews: 0,
        };

        axios
            .post("https://gurdian-care-server.vercel.app/meals", newMeal)
            .then((res) => {
                Swal.fire({
                    title: "Success!",
                    text: "Meal added successfully!",
                    icon: "success",
                    confirmButtonColor: "#5fbf54",
                });
                form.reset();
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add meal.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
                setLoading(false);
            });
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Add New Meal
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Fill in the details below to add a new meal to the menu.
                    </p>
                </div>

                <form
                    onSubmit={handleAddMeal}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Title */}
                    <div className="form-control">
                        <label className="text-sm font-bold text-gray-700 mb-2 ml-1">
                            Meal Title
                        </label>
                        <div className="relative">
                            <FaUtensils className="absolute top-3.5 left-4 text-gray-400" />
                            <input
                                name="title"
                                type="text"
                                placeholder="Ex: Grilled Chicken Salad"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="form-control">
                        <label className="text-sm font-bold text-gray-700 mb-2 ml-1">
                            Category
                        </label>
                        <div className="relative">
                            <BiCategory className="absolute top-3.5 left-4 text-gray-400 text-lg" />
                            <select
                                name="category"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all appearance-none text-gray-600"
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>
                                    Select Category
                                </option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select>
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="form-control">
                        <label className="text-sm font-bold text-gray-700 mb-2 ml-1">
                            Image URL
                        </label>
                        <div className="relative">
                            <FaImage className="absolute top-3.5 left-4 text-gray-400" />
                            <input
                                name="image"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="form-control">
                        <label className="text-sm font-bold text-gray-700 mb-2 ml-1">
                            Price ($)
                        </label>
                        <div className="relative">
                            <FaDollarSign className="absolute top-3.5 left-4 text-gray-400" />
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div className="form-control md:col-span-2">
                        <label className="text-sm font-bold text-gray-700 mb-2 ml-1">
                            Ingredients
                        </label>
                        <div className="relative">
                            <FaListUl className="absolute top-3.5 left-4 text-gray-400" />
                            <input
                                name="ingredients"
                                type="text"
                                placeholder="Rice, Chicken, Spices (Separate with commas)"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all"
                                required
                            />
                        </div>
                        <label className="text-xs text-gray-400 mt-1 ml-1">
                            Separate multiple ingredients with commas (,)
                        </label>
                    </div>

                    {/* Distributor (Read Only) */}
                    <div className="form-control md:col-span-2">
                        <label className="text-sm font-bold text-gray-700 mb-2 ml-1">
                            Distributor Name
                        </label>
                        <div className="relative">
                            <FaUserTie className="absolute top-3.5 left-4 text-gray-400" />
                            <input
                                type="text"
                                value={user?.displayName || "Admin"}
                                readOnly
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="form-control md:col-span-2">
                        <label className="text-sm font-bold text-gray-700 mb-2 ml-1">
                            Description
                        </label>
                        <div className="relative">
                            <MdDescription className="absolute top-4 left-4 text-gray-400 text-lg" />
                            <textarea
                                name="description"
                                placeholder="Write a detailed description of the meal..."
                                rows="4"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all resize-none"
                                required
                            ></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-4 md:col-span-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn bg-[#5fbf54] hover:bg-[#4da043] text-white border-none rounded-xl py-3 text-lg font-bold shadow-md hover:shadow-lg transition-all"
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Add Meal to Menu"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMeal;
