import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Partner = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        centerMode: true,
        centerPadding: "0",
    };

    return (
        <div className="w-[95%] mx-auto rounded py-16 bg-gray-100 text-center">
            <h1 className="text-4xl font-semibold mb-8">Meet Our Partners</h1>
            <div className="max-w-6xl mx-auto mt-5">
                <Slider {...settings}>
                    <div className="flex justify-center items-center h-32">
                        <img
                            src="https://i.ibb.co.com/FLbMSbZJ/logo.png"
                            alt="Partner 1"
                            className="h-24 w-auto object-contain"
                        />
                    </div>
                    <div className="flex justify-center items-center h-32">
                        <img
                            src="https://i.ibb.co/kVJvJ4CF/Morogram-of-Dhaka-Medical-College-svg.png"
                            alt="Partner 2"
                            className="h-24 w-auto object-contain"
                        />
                    </div>
                    <div className="flex justify-center items-center h-32">
                        <img
                            src="https://i.ibb.co/h1X6XXqn/logoBIRN.png"
                            alt="Partner 3"
                            className="h-24 w-auto object-contain"
                        />
                    </div>
                    <div className="flex justify-center items-center h-32">
                        <img
                            src="https://i.ibb.co.com/YTQ06c09/Dhaka-City-College-Seal-svg.png"
                            alt="Partner 4"
                            className="h-24 w-auto object-contain"
                        />
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default Partner;
