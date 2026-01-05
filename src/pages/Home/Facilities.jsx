import FacilityCard from "../../components/FacilityCard";

import bed from "../../assets/facilities/bed.jpg";
import dining from "../../assets/facilities/dining.jpg";
import gym from "../../assets/facilities/gym.jpg";
import reading from "../../assets/facilities/reading.jpg";
import sports from "../../assets/facilities/sports.jpg";
import lobby from "../../assets/facilities/lobby.jpg";

const Facilities = () => {
    // Data Array for cleaner code management
    const facilitiesData = [
        {
            id: 1,
            title: "Multi-functional Bed & Locker",
            img: bed,
        },
        {
            id: 2,
            title: "Serene Reading Room",
            img: reading,
        },
        {
            id: 3,
            title: "Healthy 3-Course Meals",
            img: dining,
        },
        {
            id: 4,
            title: "Recreational Playing Zone",
            img: sports,
        },
        {
            id: 5,
            title: "Modern Equipped Gym",
            img: gym,
        },
        {
            id: 6,
            title: "Luxurious Waiting Lobby",
            img: lobby,
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-[#f4fbf4] to-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                        Premium{" "}
                        <span className="text-[#5fbf54]">Facilities</span>
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg">
                        We provide top-notch amenities to ensure a comfortable,
                        safe, and engaging environment for your loved ones.
                    </p>
                    {/* Decorative Line */}
                    <div className="w-24 h-1 bg-[#5fbf54] mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Facilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    {facilitiesData.map((item) => (
                        <FacilityCard
                            key={item.id}
                            title={item.title}
                            img={item.img}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Facilities;
