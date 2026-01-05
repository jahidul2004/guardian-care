import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext/AuthContext";

const CheckoutForm = () => {
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const [price, setPrice] = useState(0);
    const [membershipId, setMembershipId] = useState("");

    const navigate = useNavigate();

    const id = useParams().id;

    // Fetch price
    useEffect(() => {
        fetch(`https://gurdian-care-server.vercel.app/membership/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPrice(data.price);
                setMembershipId(data.membershipId);
            })
            .catch((error) => console.error("Failed to fetch price:", error));
    }, [id]);

    // Create payment intent
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

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: card,
        });

        if (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Payment successful",
            });
        }

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
            Swal.fire({
                icon: "error",
                title: "Error",
                text: confirmError.message,
            });
        } else {
            const newTransaction = {
                userName: user?.displayName || "anonymous",
                userEmail: user?.email || "anonymous",
                amount: paymentIntent.amount / 100,
                transactionId: paymentIntent.id,
                status: paymentIntent.status,
                paymentTime: new Date(paymentIntent.created * 1000),
                membershipId: membershipId,
            };

            if (paymentIntent.status === "succeeded") {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Payment successful",
                });
            }

            axios
                .post(
                    "https://gurdian-care-server.vercel.app/transactions",
                    newTransaction
                )
                .then((res) => {
                    // console.log("Transaction saved:");
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Failed to save transaction:", error);
                });
        }
    };

    return (
        <form className="border m-5 p-5 rounded-lg" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <button
                className="btn bg-[#5fbf54] text-white border-none my-4"
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                Pay {price}$
            </button>
        </form>
    );
};

export default CheckoutForm;
