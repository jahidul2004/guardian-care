import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Partner = () => {
    // Data Array for easy management
    const partners = [
        {
            id: 1,
            name: "Partner 1",
            img: "https://i.ibb.co.com/FLbMSbZJ/logo.png",
        },
        {
            id: 2,
            name: "Dhaka Medical",
            img: "https://i.ibb.co/kVJvJ4CF/Morogram-of-Dhaka-Medical-College-svg.png",
        },
        { id: 3, name: "BIRN", img: "https://i.ibb.co/h1X6XXqn/logoBIRN.png" },
        {
            id: 4,
            name: "Dhaka City College",
            img: "https://i.ibb.co.com/YTQ06c09/Dhaka-City-College-Seal-svg.png",
        },
        // Duplicate data to show carousel effect smoothly if items are few
        {
            id: 5,
            name: "Partner 1",
            img: "https://i.ibb.co.com/FLbMSbZJ/logo.png",
        },
        {
            id: 6,
            name: "Dhaka Medical",
            img: "https://i.ibb.co/kVJvJ4CF/Morogram-of-Dhaka-Medical-College-svg.png",
        },
    ];

    const settings = {
        infinite: true,
        speed: 2000, // Smooth continuous scroll
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0, // Continuous effect with cssEase
        cssEase: "linear",
        arrows: false,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 2 }, // Show 2 on mobile looks better than 1
            },
        ],
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <p className="text-[#5fbf54] font-bold uppercase tracking-wider text-sm mb-2">
                        Collaborations
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Trusted Partners
                    </h2>
                </div>

                {/* Slider Container */}
                <div className="max-w-6xl mx-auto">
                    <Slider {...settings} className="partner-slider">
                        {partners.map((partner) => (
                            <div key={partner.id} className="outline-none px-4">
                                <div className="flex justify-center items-center h-32 bg-gray-50 rounded-lg border border-transparent hover:border-gray-100 hover:shadow-sm transition-all duration-300 group">
                                    <img
                                        src={partner.img}
                                        alt={partner.name}
                                        className="h-16 md:h-20 w-auto object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Partner;
