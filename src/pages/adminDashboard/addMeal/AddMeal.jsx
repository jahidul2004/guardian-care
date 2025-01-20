import { useContext } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const AddMeal = () => {
    const { user } = useContext(AuthContext);

    const handleAddMeal = (e) => {
        e.preventDefault();

        const form = e.target;

        const title = form.title.value;
        const category = form.category.value;
        const image = form.image.value;
        const ingredients = form.ingredients.value.split(",");
        const description = form.description.value;
        const price = form.price.value;
        const distributorName = user?.displayName;

        const newMeal = {
            title,
            image,
            rating: 0,
            price,
            description,
            category,
            distributorName,
            ingredients,
            postTime: new Date().toISOString(),
        };

        axios
            .post("https://gurdian-care-server.vercel.app/meals", newMeal)
            .then((res) => {
                Swal.fire({
                    title: "Success!",
                    text: "Meal added successfully!",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                form.reset();
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Close",
                });
            });
    };
    return (
        <div className="bg-[#f1f1f1] p-4 md:p-10 w-full md:w-3/4">
            <h1 className="text-center font-bold text-3xl py-4 mb-10">
                Add Meal
            </h1>
            <div className="card bg-base-100 w-full max-w-3xl mx-auto shrink-0 shadow-2xl">
                <form
                    onSubmit={handleAddMeal}
                    className="card-body grid grid-cols-1 md:grid-cols-2"
                >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Meal Title</span>
                        </label>
                        <input
                            name="title"
                            type="text"
                            placeholder="Enter meal title"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select
                            name="category"
                            className="select select-bordered w-full"
                        >
                            <option disabled selected>
                                Choose a category
                            </option>
                            <option>Breakfast</option>
                            <option>Launch</option>
                            <option>Dinner</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Chose meal Image</span>
                        </label>
                        <input
                            type="url"
                            className="input input-bordered"
                            required
                            placeholder="Enter image link"
                            name="image"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Ingredients</span>
                        </label>
                        <input
                            name="ingredients"
                            type="text"
                            placeholder="Enter ingredients e.g. rice, beans, etc"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
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
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            name="price"
                            type="number"
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
        </div>
    );
};

export default AddMeal;
