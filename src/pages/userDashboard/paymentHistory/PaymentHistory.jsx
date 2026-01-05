import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import { FaFileInvoiceDollar, FaHistory } from "react-icons/fa";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(
            `https://gurdian-care-server.vercel.app/transactions/${user?.email}`
        )
            .then((res) => res.json())
            .then((data) => {
                setTransactions(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch transactions:", error);
                setLoading(false);
            });
    }, [user?.email]);

    // Helper function for Membership Badge Style
    const getMembershipStyle = (id) => {
        switch (id) {
            case "P001":
                return "bg-purple-100 text-purple-600 border-purple-200"; // Platinum
            case "G001":
                return "bg-yellow-100 text-yellow-700 border-yellow-200"; // Gold
            case "S001":
                return "bg-gray-100 text-gray-600 border-gray-200"; // Silver
            default:
                return "bg-blue-50 text-blue-600 border-blue-100";
        }
    };

    const getMembershipName = (id) => {
        const names = { S001: "Silver", G001: "Gold", P001: "Platinum" };
        return names[id] || "Standard";
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaHistory className="text-[#5fbf54]" />
                        Payment History
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Track all your membership purchases and transactions.
                    </p>
                </div>
                <div className="mt-4 md:mt-0 bg-green-50 text-[#5fbf54] px-5 py-2 rounded-full font-bold text-sm shadow-sm">
                    Total Transactions: {transactions.length}
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#5fbf54]/5">
                        <tr className="text-gray-600 uppercase text-xs tracking-wider">
                            <th className="p-4 font-bold border-b border-gray-100">
                                Date & Time
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100">
                                Transaction ID
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100">
                                Membership
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-right">
                                Amount
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-center">
                                Status
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
                        ) : transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <tr
                                    key={transaction._id}
                                    className="hover:bg-gray-50 transition-colors group"
                                >
                                    {/* Date */}
                                    <td className="p-4 text-gray-600 font-medium whitespace-nowrap">
                                        {new Date(
                                            transaction?.paymentTime
                                        ).toLocaleDateString()}
                                        <span className="text-xs text-gray-400 block">
                                            {new Date(
                                                transaction?.paymentTime
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </td>

                                    {/* Transaction ID */}
                                    <td className="p-4 font-mono text-gray-500 text-xs">
                                        <span className="bg-gray-100 px-2 py-1 rounded select-all">
                                            {transaction?.transactionId}
                                        </span>
                                    </td>

                                    {/* Membership Type */}
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold border ${getMembershipStyle(
                                                transaction?.membershipId
                                            )}`}
                                        >
                                            {getMembershipName(
                                                transaction?.membershipId
                                            )}
                                        </span>
                                        <div className="text-[10px] text-gray-400 mt-1 pl-1">
                                            Code: {transaction?.membershipId}
                                        </div>
                                    </td>

                                    {/* Amount */}
                                    <td className="p-4 text-right font-bold text-gray-800">
                                        ${transaction?.amount}
                                    </td>

                                    {/* Status */}
                                    <td className="p-4 text-center">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${
                                                transaction?.status ===
                                                "succeeded"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {transaction?.status === "succeeded"
                                                ? "Paid"
                                                : transaction?.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="p-12 text-center flex flex-col items-center justify-center"
                                >
                                    <div className="bg-gray-100 p-4 rounded-full mb-3">
                                        <FaFileInvoiceDollar className="text-3xl text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 font-medium">
                                        No payment history found.
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
