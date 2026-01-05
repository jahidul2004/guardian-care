import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaQuoteLeft } from "react-icons/fa"; // react-icons প্যাকেজটি থাকতে হবে

const Reviews = () => {
    const settings = {
        dots: true, // নিচে ডট নেভিগেশন যোগ করেছি
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,

        // Responsive settings
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
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
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5,
            text: "Guardian Care provided exceptional service for my father. The staff is incredibly professional and kind.",
        },
        {
            id: 2,
            name: "Jane Smith",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 4,
            text: "Very clean environment and healthy meals. I really appreciate their dedication to hygiene.",
        },
        {
            id: 3,
            name: "Michael Johnson",
            image: "https://randomuser.me/api/portraits/men/46.jpg",
            rating: 5,
            text: "I was worried about moving here, but the friendly community made me feel at home instantly.",
        },
        {
            id: 4,
            name: "Emily Brown",
            image: "https://randomuser.me/api/portraits/women/65.jpg",
            rating: 5,
            text: "The medical facilities are top-notch. I feel safe knowing there is care available 24/7.",
        },
        {
            id: 5,
            name: "David Wilson",
            image: "https://randomuser.me/api/portraits/men/85.jpg",
            rating: 5,
            text: "Absolutely loved the experience! The gym and reading room are my favorite places.",
        },
    ];

    // Star rendering helper
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <FaStar
                key={i}
                className={i < rating ? "text-[#5fbf54]" : "text-gray-300"}
            />
        ));
    };

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h6 className="text-[#5fbf54] font-bold tracking-wider uppercase text-sm mb-2">
                        Testimonials
                    </h6>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
                        What Our Members Say
                    </h2>
                    <div className="w-20 h-1 bg-[#5fbf54] mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Slider Wrapper */}
                <div className="max-w-7xl mx-auto">
                    <Slider {...settings} className="pb-10">
                        {reviews.map((review) => (
                            <div key={review.id} className="px-4 py-4">
                                {" "}
                                {/* Padding for gap */}
                                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col relative">
                                    {/* Quote Icon */}
                                    <FaQuoteLeft className="text-4xl text-[#5fbf54] opacity-20 absolute top-6 left-6" />

                                    {/* Content */}
                                    <div className="flex flex-col items-center text-center mt-4">
                                        <div className="relative">
                                            <img
                                                src={review.image}
                                                alt={review.name}
                                                className="w-20 h-20 rounded-full object-cover border-4 border-green-50 shadow-md mb-4"
                                            />
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-800">
                                            {review.name}
                                        </h3>

                                        {/* Stars */}
                                        <div className="flex gap-1 my-3 text-lg">
                                            {renderStars(review.rating)}
                                        </div>

                                        <p className="text-gray-500 leading-relaxed italic">
                                            "{review.text}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
