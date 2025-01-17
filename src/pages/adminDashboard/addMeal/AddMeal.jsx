const AddMeal = () => {
    return (
        <div className="bg-[#f1f1f1] p-4 md:p-10 w-full md:w-3/4">
            <h1 className="text-center font-bold text-3xl py-4 mb-10">
                Add Meal
            </h1>
            <div className="card bg-base-100 w-full max-w-3xl mx-auto shrink-0 shadow-2xl">
                <form className="card-body grid grid-cols-1 md:grid-cols-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Meal Title</span>
                        </label>
                        <input
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
                        <select className="select select-bordered w-full">
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
                            type="file"
                            className="file:bg-[#5fbf54] file:text-white file:border-none border-[#5fbf54] file-input file-input-bordered file-input-primary w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Ingredients</span>
                        </label>
                        <input
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
