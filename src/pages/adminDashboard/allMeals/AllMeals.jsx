import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllMeals = () => {
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
        ingredients: "",
    });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("https://gurdian-care-server.vercel.app/meals")
            .then((res) => res.json())
            .then((data) => setMeals(data));
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`https://gurdian-care-server.vercel.app/meals/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    setMeals((prevMeals) =>
                        prevMeals.filter((meal) => meal._id !== id)
                    );

                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Meal deleted successfully",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong",
                });
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
        document.getElementById("my_modal_1").showModal();
    };

    const handleUpdate = () => {
        const updatedMeal = {
            ...updatedData,
            ingredients: updatedData.ingredients
                .split(",")
                .map((ingredient) => ingredient.trim()),
        };

        axios
            .put(
                `https://gurdian-care-server.vercel.app/meals/${selectedMeal._id}`,
                updatedMeal
            )
            .then((res) => {
                if (res.status === 200) {
                    setMeals((prevMeals) =>
                        prevMeals.map((meal) =>
                            meal._id === selectedMeal._id ? res.data : meal
                        )
                    );
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Meal updated successfully",
                    });
                    setSelectedMeal(null);
                    document.getElementById("my_modal_1").close();
                }
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong",
                });
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
        <div className="py-2">
            <h1 className="text-center font-bold text-3xl py-4 mb-10">
                All Meals
            </h1>

            {/* Search input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by title or category"
                    className="input input-bordered w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto border">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMeals.map((meal) => (
                            <tr key={meal._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={meal?.image}
                                                    alt="Meal"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{meal?.title}</td>
                                <td>{meal?.likeCount || 0}</td>
                                <td>{meal?.reviewCount || 0}</td>
                                <td>{meal?.rating}</td>

                                <th className="flex gap-2">
                                    <button
                                        onClick={() => openUpdateModal(meal)}
                                        className="btn btn-sm bg-[#5fbf54] text-white border-none"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(meal._id)}
                                        className="btn btn-sm btn-error text-white border-none"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={`/meals/${meal._id}`}
                                        className="btn btn-sm bg-[#5fbf54] text-white border-none"
                                    >
                                        View Meal
                                    </Link>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Update Meal</h3>
                    <div className="flex flex-col gap-4">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={updatedData.title}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={updatedData.description}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            type="text"
                            name="price"
                            value={updatedData.price}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input
                            type="text"
                            name="image"
                            value={updatedData.image}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={updatedData.category}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                        <label className="label">
                            <span className="label-text">Ingredients</span>
                        </label>
                        <input
                            type="text"
                            name="ingredients"
                            value={updatedData.ingredients}
                            onChange={handleChange}
                            placeholder="Comma separated ingredients"
                            className="input input-bordered"
                        />
                        <button
                            onClick={handleUpdate}
                            className="btn bg-[#5fbf54] text-white border-none mt-4"
                        >
                            Update
                        </button>
                    </div>
                    <div className="modal-action">
                        <button
                            onClick={() =>
                                document.getElementById("my_modal_1").close()
                            }
                            className="btn btn-error text-white border-none"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </dialog>

            <div className="join">
                <button className="join-item btn">«</button>
                <button className="join-item btn">Page 1</button>
                <button className="join-item btn">»</button>
            </div>
        </div>
    );
};

export default AllMeals;
