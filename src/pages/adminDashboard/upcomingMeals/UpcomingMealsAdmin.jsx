import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UpcomingMealsAdmin = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetch("https://gurdian-care-server.vercel.app/upcomingMeals")
            .then((res) => res.json())
            .then((data) => {
                setMeals(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const handleAddUpcomingMeal = (e) => {
        e.preventDefault();

        const form = e.target;

        const title = form.title.value;
        const category = form.category.value;
        const image = form.image.value;
        const ingredients = form.ingredients.value
            .split(",")
            .map((item) => item.trim());
        const description = form.description.value;
        const price = parseFloat(form.price.value);
        const likeCount = 0;
        const reviewCount = 0;
        const postTime = new Date().toISOString();

        const newUpMeal = {
            title,
            category,
            image,
            ingredients,
            description,
            price,
            likeCount,
            reviewCount,
            postTime,
        };

        fetch("https://gurdian-care-server.vercel.app/upcomingMeals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUpMeal),
        })
            .then((res) => res.json())
            .then((data) => {
                setMeals((prevMeals) => [...prevMeals, data]);
                Swal.fire({
                    icon: "success",
                    title: "Meal Added Successfully",
                    text: `${data.title} has been added to Upcoming Meals.`,
                });
                document.getElementById("my_modal_1").close();
            })
            .catch((error) => {
                console.error("Error while adding meal:", error);
            });
    };

    const handlePublishMeal = (id) => {
        fetch(`https://gurdian-care-server.vercel.app/upcomingMeals/${id}`)
            .then((res) => res.json())
            .then((meal) => {
                const { _id, ...mealData } = meal;

                axios
                    .post(
                        "https://gurdian-care-server.vercel.app/meals",
                        mealData
                    )
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Meal Published Successfully",
                            text: `${meal.title} has been published.`,
                        });

                        setMeals((prevMeals) =>
                            prevMeals.filter((m) => m._id !== id)
                        );

                        return fetch(
                            `https://gurdian-care-server.vercel.app/upcomingMeals/${id}`,
                            {
                                method: "DELETE",
                            }
                        );
                    })
                    .catch((error) => {
                        console.error("Error while publishing meal:", error);
                    });
            })
            .catch((error) => {
                console.error("Error while fetching meal:", error);
            });
    };

    return (
        <div className="text-center">
            <h1 className="text-center text-3xl font-bold mb-5">
                Upcoming Meals
            </h1>
            <button
                onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                }
                className="btn bg-[#5fbf54] text-white border-none"
            >
                Add Upcoming Meal
            </button>
            <div>
                <div className="overflow-x-auto border mt-5">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Serial No</th>
                                <th>Meal Title</th>
                                <th>Price</th>
                                <th>Like Count</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meals.map((meal, index) => (
                                <tr key={meal._id}>
                                    <th>{index + 1}</th>
                                    <td>{meal?.title}</td>
                                    <td>{meal?.price}$</td>
                                    <td>{meal?.likeCount || 0}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handlePublishMeal(meal._id)
                                            }
                                            className="btn btn-sm bg-[#5fbf54] text-white border-none"
                                        >
                                            Publish
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h1 className="text-3xl font-bold text-center">
                        Add Upcoming Meal
                    </h1>
                    <div className="modal-action flex-col">
                        <div className="card bg-base-100 w-full max-w-3xl mx-auto shrink-0 shadow-2xl">
                            <form
                                onSubmit={handleAddUpcomingMeal}
                                className="card-body grid grid-cols-1 md:grid-cols-2"
                            >
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Meal Title
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Enter meal title"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Category
                                        </span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        name="category"
                                        required
                                    >
                                        <option disabled selected>
                                            Choose a category
                                        </option>
                                        <option>Breakfast</option>
                                        <option>Lunch</option>
                                        <option>Dinner</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Choose Meal Image
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="image"
                                        className="input input-bordered"
                                        placeholder="Enter image link"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Ingredients
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="ingredients"
                                        placeholder="Enter ingredients e.g. rice, beans, etc"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Description
                                        </span>
                                    </label>
                                    <textarea
                                        name="description"
                                        placeholder="Enter description"
                                        className="textarea textarea-bordered"
                                        required
                                        rows={1}
                                    ></textarea>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Price
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Enter price"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control mt-6 md:col-span-2">
                                    <button className="btn bg-[#5fbf54] text-white border-none">
                                        Add Meal
                                    </button>
                                </div>
                            </form>
                        </div>
                        <form method="dialog">
                            <button className="btn mt-4 w-full btn-error text-white border-none">
                                Cancel
                            </button>
                        </form>
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

export default UpcomingMealsAdmin;
