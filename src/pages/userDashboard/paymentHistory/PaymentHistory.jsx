import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch(`https://gurdian-care-server.vercel.app/transactions/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setTransactions(data);
                // console.log(data);
            })
            .catch((error) =>
                console.error("Failed to fetch transactions:", error)
            );
    }, []);
    return (
        <div>
            <h1 className="text-3xl font-bold text-center">Payment History</h1>

            <div className="overflow-x-auto border mt-5">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Membership</th>
                            <th>Code</th>
                            <th>Transaction Id</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr>
                                <th>{index + 1}</th>
                                <td>{transaction?.userName}</td>
                                <td>{transaction?.userEmail}</td>
                                <td>{transaction?.amount}</td>
                                <td>
                                    {transaction?.membershipId === "S001"
                                        ? "Silver"
                                        : transaction?.membershipId === "G001"
                                        ? "Gold"
                                        : transaction?.membershipId === "P001"
                                        ? "Platinum"
                                        : "N/A"}
                                </td>
                                <td>{transaction?.membershipId}</td>
                                <td>{transaction?.transactionId}</td>
                                <td>{transaction?.paymentTime}</td>
                                <td
                                    className={
                                        transaction?.status === "succeeded"
                                            ? "text-success"
                                            : "text-error"
                                    }
                                >
                                    {transaction?.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
