const MyReviews = () => {
    return (
        <div>
            <h1>My Reviews</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Meal Title</th>
                            <th>Review</th>
                            <th>Like</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <td>Title</td>
                            <td>Review</td>
                            <td>Likes</td>
                            <td className="flex gap-2">
                                <button className="btn bg-[#5fbf54] btn-sm text-white border-none">
                                    Edit
                                </button>
                                <button className="btn btn-error btn-sm text-white border-none">
                                    Delete
                                </button>
                                <button className="btn btn-success btn-sm text-white border-none">
                                    View Meal
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyReviews;
