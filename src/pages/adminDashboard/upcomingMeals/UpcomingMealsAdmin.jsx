import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaPlus, FaRocket, FaHeart, FaUtensils, FaTimes } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";

const UpcomingMealsAdmin = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMeals();
    }, []);

    const fetchMeals = () => {
        axios
            .get("https://gurdian-care-server.vercel.app/upcomingMeals")
            .then((res) => {
                setMeals(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching meals:", error);
                setLoading(false);
            });
    };

    const handleAddUpcomingMeal = (e) => {
        e.preventDefault();
        const form = e.target;

        const newUpMeal = {
            title: form.title.value,
            category: form.category.value,
            image: form.image.value,
            ingredients: form.ingredients.value
                .split(",")
                .map((item) => item.trim()),
            description: form.description.value,
            price: parseFloat(form.price.value),
            likeCount: 0,
            reviewCount: 0,
            postTime: new Date().toISOString(),
        };

        axios
            .post(
                "https://gurdian-care-server.vercel.app/upcomingMeals",
                newUpMeal
            )
            .then((res) => {
                if (res.data.insertedId) {
                    setMeals((prevMeals) => [
                        ...prevMeals,
                        { ...newUpMeal, _id: res.data.insertedId },
                    ]);
                    Swal.fire({
                        icon: "success",
                        title: "Added!",
                        text: "Meal added to upcoming list.",
                        confirmButtonColor: "#5fbf54",
                    });
                    document.getElementById("add_upcoming_modal").close();
                    form.reset();
                }
            })
            .catch((error) => {
                Swal.fire("Error", "Failed to add meal", "error");
                console.error(error);
            });
    };

    const handlePublishMeal = async (meal) => {
        Swal.fire({
            title: "Ready to Publish?",
            text: `This will move "${meal.title}" to the main menu.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#5fbf54",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Publish it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // 1. Prepare data (remove _id to avoid conflict)
                    const { _id, ...mealData } = meal;

                    // 2. Add to Main Meals Collection
                    const postRes = await axios.post(
                        "https://gurdian-care-server.vercel.app/meals",
                        mealData
                    );

                    if (postRes.data.insertedId) {
                        // 3. Delete from Upcoming Meals
                        await axios.delete(
                            `https://gurdian-care-server.vercel.app/upcomingMeals/${_id}`
                        );

                        // 4. Update UI
                        setMeals((prevMeals) =>
                            prevMeals.filter((m) => m._id !== _id)
                        );

                        Swal.fire({
                            icon: "success",
                            title: "Published!",
                            text: "The meal is now live on the menu.",
                            confirmButtonColor: "#5fbf54",
                        });
                    }
                } catch (error) {
                    console.error("Publishing error:", error);
                    Swal.fire("Error", "Failed to publish meal.", "error");
                }
            }
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <MdOutlineFastfood className="text-[#5fbf54]" />
                        Upcoming Meals Pipeline
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage meals that are coming soon to the menu.
                    </p>
                </div>
                <button
                    onClick={() =>
                        document
                            .getElementById("add_upcoming_modal")
                            .showModal()
                    }
                    className="btn bg-[#5fbf54] hover:bg-[#4da043] text-white border-none shadow-md gap-2"
                >
                    <FaPlus /> Add New Item
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#5fbf54]/5">
                        <tr className="text-gray-600 uppercase text-xs tracking-wider">
                            <th className="p-4 font-bold border-b border-gray-100">
                                Meal Info
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100">
                                Category
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-center">
                                Price
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-center">
                                Popularity
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-right">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="p-8 text-center">
                                    <span className="loading loading-spinner text-[#5fbf54]"></span>
                                </td>
                            </tr>
                        ) : meals.length > 0 ? (
                            meals.map((meal) => (
                                <tr
                                    key={meal._id}
                                    className="hover:bg-gray-50 transition-colors group"
                                >
                                    {/* Meal Info */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                                                <img
                                                    src={meal?.image}
                                                    alt={meal?.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="font-bold text-gray-800">
                                                {meal?.title}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold">
                                            {meal?.category || "General"}
                                        </span>
                                    </td>

                                    {/* Price */}
                                    <td className="p-4 text-center font-bold text-gray-700">
                                        ${meal?.price}
                                    </td>

                                    {/* Likes */}
                                    <td className="p-4 text-center">
                                        <div className="inline-flex items-center gap-1 text-pink-500 bg-pink-50 px-3 py-1 rounded-full font-bold text-xs">
                                            <FaHeart /> {meal?.likeCount || 0}
                                        </div>
                                    </td>

                                    {/* Publish Button */}
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() =>
                                                handlePublishMeal(meal)
                                            }
                                            className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none shadow-sm gap-2 normal-case font-medium"
                                            title="Publish to Main Menu"
                                        >
                                            <FaRocket /> Publish
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="p-12 text-center text-gray-500"
                                >
                                    No upcoming meals found. Add one to get
                                    started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination (Static) */}
            <div className="flex justify-end mt-6">
                <div className="join border border-gray-200 rounded-lg shadow-sm">
                    <button className="join-item btn btn-sm bg-white border-none hover:bg-gray-100">
                        «
                    </button>
                    <button className="join-item btn btn-sm bg-[#5fbf54] text-white border-none">
                        1
                    </button>
                    <button className="join-item btn btn-sm bg-white border-none hover:bg-gray-100">
                        »
                    </button>
                </div>
            </div>

            {/* Modal */}
            <dialog
                id="add_upcoming_modal"
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box w-11/12 max-w-3xl bg-white p-0 overflow-hidden">
                    <div className="bg-[#5fbf54] px-6 py-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <FaUtensils />
                            <h3 className="font-bold text-lg">
                                Draft New Upcoming Meal
                            </h3>
                        </div>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost text-white">
                                <FaTimes />
                            </button>
                        </form>
                    </div>

                    <form
                        onSubmit={handleAddUpcomingMeal}
                        className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div className="form-control">
                            <label className="label-text font-bold mb-1">
                                Meal Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Ex: Special Beef Curry"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label-text font-bold mb-1">
                                Category
                            </label>
                            <select
                                name="category"
                                className="select select-bordered w-full"
                                defaultValue=""
                                required
                            >
                                <option disabled value="">
                                    Choose Category
                                </option>
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label-text font-bold mb-1">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                placeholder="0.00"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label-text font-bold mb-1">
                                Image URL
                            </label>
                            <input
                                type="url"
                                name="image"
                                placeholder="https://..."
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control md:col-span-2">
                            <label className="label-text font-bold mb-1">
                                Ingredients
                            </label>
                            <input
                                type="text"
                                name="ingredients"
                                placeholder="Comma separated (e.g. Rice, Beef, Chili)"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control md:col-span-2">
                            <label className="label-text font-bold mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Short description..."
                                className="textarea textarea-bordered w-full"
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() =>
                                    document
                                        .getElementById("add_upcoming_modal")
                                        .close()
                                }
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn bg-[#5fbf54] text-white hover:bg-[#4da043] gap-2"
                            >
                                <FaPlus /> Add to Upcoming
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default UpcomingMealsAdmin;
