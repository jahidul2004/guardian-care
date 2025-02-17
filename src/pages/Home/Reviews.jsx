import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = () => {
    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        centerMode: true,
        centerPadding: "0",
        slidesToShow: 3, // Default for large screens

        responsive: [
            {
                breakpoint: 1024, // Large devices (lg)
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768, // Medium devices (md)
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480, // Small devices (sm)
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const reviews = [
        {
            id: 1,
            name: "John Doe",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            rating: 5,
            text: "Great experience! Highly recommended.",
        },
        {
            id: 2,
            name: "Jane Smith",
            image: "https://randomuser.me/api/portraits/women/2.jpg",
            rating: 4,
            text: "Very professional and efficient service.",
        },
        {
            id: 3,
            name: "Michael Johnson",
            image: "https://randomuser.me/api/portraits/men/3.jpg",
            rating: 5,
            text: "Excellent service and friendly staff!",
        },
        {
            id: 4,
            name: "Emily Brown",
            image: "https://randomuser.me/api/portraits/women/4.jpg",
            rating: 4,
            text: "Good quality, but room for improvement.",
        },
        {
            id: 5,
            name: "David Wilson",
            image: "https://randomuser.me/api/portraits/men/5.jpg",
            rating: 5,
            text: "Absolutely loved the experience!",
        },
    ];

    return (
        <div className="w-[95%] my-10 mx-auto rounded py-16 bg-[#eef8ef] text-center">
            <h1 className="text-4xl font-semibold mb-8">Customer Reviews</h1>
            <div className="max-w-6xl mx-auto mt-5">
                <Slider {...settings}>
                    {reviews.map((review) => (
                        <div key={review.id} className="p-4">
                            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-4"
                                />
                                <h2 className="text-xl font-semibold">
                                    {review.name}
                                </h2>
                                <div className="flex justify-center mt-2">
                                    {"★".repeat(review.rating)}
                                    {"☆".repeat(5 - review.rating)}
                                </div>
                                <p className="mt-2 text-gray-600">
                                    {review.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Reviews;
