import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
    FaEdit,
    FaTrash,
    FaEye,
    FaSearch,
    FaStar,
    FaUtensils,
} from "react-icons/fa";
import { AiFillLike, AiFillMessage } from "react-icons/ai";

const AllMeals = () => {
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Update Form State
    const [updatedData, setUpdatedData] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
        ingredients: "",
    });

    useEffect(() => {
        fetch("https://gurdian-care-server.vercel.app/meals")
            .then((res) => res.json())
            .then((data) => {
                setMeals(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(
                        `https://gurdian-care-server.vercel.app/meals/${id}`
                    )
                    .then((res) => {
                        if (res.status === 200) {
                            setMeals((prevMeals) =>
                                prevMeals.filter((meal) => meal._id !== id)
                            );
                            Swal.fire(
                                "Deleted!",
                                "Meal has been deleted.",
                                "success"
                            );
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        Swal.fire("Error", "Something went wrong", "error");
                    });
            }
        });
    };

    const openUpdateModal = (meal) => {
        setSelectedMeal(meal);
        setUpdatedData({
            title: meal.title,
            description: meal.description,
            price: meal.price,
            image: meal.image,
            category: meal.category || "",
            ingredients: meal.ingredients?.join(", ") || "",
        });
        document.getElementById("update_meal_modal").showModal();
    };

    const handleUpdate = (e) => {
        e.preventDefault(); // Prevent page reload
        const updatedMeal = {
            ...updatedData,
            ingredients: updatedData.ingredients
                .split(",")
                .map((ingredient) => ingredient.trim()),
            price: parseFloat(updatedData.price),
        };

        axios
            .put(
                `https://gurdian-care-server.vercel.app/meals/${selectedMeal._id}`,
                updatedMeal
            )
            .then((res) => {
                // Optimistically update UI or fetch updated data. Here assuming res.data sends back acknowledgment
                // Ideally, refetch or manually update state:
                setMeals((prevMeals) =>
                    prevMeals.map((meal) =>
                        meal._id === selectedMeal._id
                            ? { ...meal, ...updatedMeal }
                            : meal
                    )
                );

                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Meal details updated successfully",
                    confirmButtonColor: "#5fbf54",
                });
                document.getElementById("update_meal_modal").close();
            })
            .catch((err) => {
                console.error(err);
                Swal.fire("Error", "Failed to update meal", "error");
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const filteredMeals = meals.filter(
        (meal) =>
            meal?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meal?.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaUtensils className="text-[#5fbf54]" />
                        All Meals Inventory
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Total Meals: {meals.length}
                    </p>
                </div>

                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search title or category..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#5fbf54]/5">
                        <tr className="text-gray-600 uppercase text-xs tracking-wider">
                            <th className="p-4 font-bold border-b border-gray-100">
                                Meal Info
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-center">
                                Engagement
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-center">
                                Rating
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-center">
                                Distributor
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-right">
                                Actions
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
                        ) : filteredMeals.length > 0 ? (
                            filteredMeals.map((meal) => (
                                <tr
                                    key={meal._id}
                                    className="hover:bg-gray-50 transition-colors group"
                                >
                                    {/* Meal Info */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                                <img
                                                    src={meal?.image}
                                                    alt={meal?.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">
                                                    {meal?.title}
                                                </div>
                                                <div className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">
                                                    {meal?.category}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Engagement */}
                                    <td className="p-4">
                                        <div className="flex justify-center gap-3 text-xs font-bold">
                                            <div className="flex items-center gap-1 text-pink-500 bg-pink-50 px-2 py-1 rounded">
                                                <AiFillLike />{" "}
                                                {meal?.likeCount || 0}
                                            </div>
                                            <div className="flex items-center gap-1 text-blue-500 bg-blue-50 px-2 py-1 rounded">
                                                <AiFillMessage />{" "}
                                                {meal?.reviewCount || 0}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Rating */}
                                    <td className="p-4 text-center">
                                        <div className="inline-flex items-center gap-1 text-orange-400 font-bold bg-orange-50 px-2 py-1 rounded">
                                            <FaStar /> {meal?.rating || 0}
                                        </div>
                                    </td>

                                    {/* Distributor */}
                                    <td className="p-4 text-center text-xs text-gray-500">
                                        {meal?.distributorName || "Admin"}
                                    </td>

                                    {/* Actions */}
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`/meals/${meal._id}`}
                                                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#5fbf54] transition-all"
                                                title="View"
                                            >
                                                <FaEye size={16} />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    openUpdateModal(meal)
                                                }
                                                className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-all"
                                                title="Edit"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(meal._id)
                                                }
                                                className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                                                title="Delete"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="p-8 text-center text-gray-500"
                                >
                                    No meals found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Optimized Update Modal */}
            <dialog
                id="update_meal_modal"
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box w-11/12 max-w-3xl bg-white p-0 overflow-hidden">
                    <div className="bg-[#5fbf54] px-6 py-4 flex justify-between items-center text-white">
                        <h3 className="font-bold text-lg">
                            Update Meal Details
                        </h3>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost text-white">
                                ✕
                            </button>
                        </form>
                    </div>

                    <form
                        onSubmit={handleUpdate}
                        className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div className="form-control">
                            <label className="label-text font-bold mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={updatedData.title}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label-text font-bold mb-1">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                value={updatedData.category}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label-text font-bold mb-1">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={updatedData.price}
                                onChange={handleChange}
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
                                value={updatedData.image}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control md:col-span-2">
                            <label className="label-text font-bold mb-1">
                                Ingredients (comma separated)
                            </label>
                            <input
                                type="text"
                                name="ingredients"
                                value={updatedData.ingredients}
                                onChange={handleChange}
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
                                value={updatedData.description}
                                onChange={handleChange}
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
                                        .getElementById("update_meal_modal")
                                        .close()
                                }
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn bg-[#5fbf54] text-white hover:bg-[#4da043]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

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
        </div>
    );
};

export default AllMeals;
