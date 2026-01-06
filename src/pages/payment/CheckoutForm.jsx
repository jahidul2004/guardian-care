import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext/AuthContext";
import { FaLock, FaCreditCard } from "react-icons/fa";

const CheckoutForm = () => {
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { id } = useParams();

    // State
    const [clientSecret, setClientSecret] = useState("");
    const [price, setPrice] = useState(0);
    const [membershipId, setMembershipId] = useState("");
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState("");

    // 1. Fetch Price & Membership Info
    useEffect(() => {
        fetch(`https://gurdian-care-server.vercel.app/membership/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPrice(data.price);
                setMembershipId(data.membershipId);
            })
            .catch((error) => console.error("Failed to fetch price:", error));
    }, [id]);

    // 2. Create Payment Intent
    useEffect(() => {
        if (price > 0) {
            axios
                .post(
                    "https://gurdian-care-server.vercel.app/create-payment-intent",
                    { price }
                )
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch((error) =>
                    console.error("Error creating payment intent:", error)
                );
        }
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        setProcessing(true); // Start loading state
        setCardError("");

        // 3. Create Payment Method (Check for card validation errors)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: card,
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
            setProcessing(false);
            return;
        }

        // 4. Confirm Card Payment
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "anonymous",
                        email: user?.email || "anonymous",
                    },
                },
            });

        if (confirmError) {
            console.log(confirmError);
            setCardError(confirmError.message);
            setProcessing(false);
            Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: confirmError.message,
            });
        } else {
            if (paymentIntent.status === "succeeded") {
                // 5. Save Transaction to Database
                const newTransaction = {
                    userName: user?.displayName || "anonymous",
                    userEmail: user?.email || "anonymous",
                    amount: paymentIntent.amount / 100,
                    transactionId: paymentIntent.id,
                    status: paymentIntent.status,
                    paymentTime: new Date(), // Use JS Date for consistency
                    membershipId: membershipId,
                };

                axios
                    .post(
                        "https://gurdian-care-server.vercel.app/transactions",
                        newTransaction
                    )
                    .then((res) => {
                        setProcessing(false);
                        Swal.fire({
                            icon: "success",
                            title: "Payment Successful!",
                            text: `Transaction ID: ${paymentIntent.id}`,
                            confirmButtonColor: "#5fbf54",
                        }).then(() => {
                            navigate("/dashboard/user/paymentHistory"); // Redirect to history
                        });
                    })
                    .catch((error) => {
                        console.error("Failed to save transaction:", error);
                        setProcessing(false);
                    });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FaLock className="h-6 w-6 text-[#5fbf54]" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Secure Payment
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Complete your membership purchase securely.
                    </p>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center border border-gray-200">
                    <span className="text-gray-600 font-medium">
                        Total Amount
                    </span>
                    <span className="text-3xl font-bold text-[#5fbf54]">
                        ${price}
                    </span>
                </div>

                {/* Payment Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Details
                        </label>
                        <div className="border border-gray-300 rounded-lg p-4 bg-white focus-within:ring-2 focus-within:ring-[#5fbf54] focus-within:border-[#5fbf54] transition-all">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "16px",
                                            color: "#424770",
                                            fontFamily: "sans-serif",
                                            "::placeholder": {
                                                color: "#aab7c4",
                                            },
                                            iconColor: "#5fbf54",
                                        },
                                        invalid: {
                                            color: "#ef4444",
                                        },
                                    },
                                }}
                            />
                        </div>
                        {/* Error Message Display */}
                        {cardError && (
                            <p className="text-red-500 text-sm mt-2 font-medium">
                                {cardError}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!stripe || !clientSecret || processing}
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white transition-all duration-200
                            ${
                                processing
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#5fbf54] hover:bg-[#4da043] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5fbf54]"
                            }`}
                    >
                        {processing ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <FaCreditCard /> Pay ${price}
                            </span>
                        )}
                    </button>

                    <div className="flex justify-center items-center gap-2 text-xs text-gray-400 mt-4">
                        <FaLock size={10} />
                        <span>
                            Your transaction is secured with SSL encryption.
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;
