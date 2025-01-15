import FacilityCard from "../../components/FacilityCard";

import bed from "../../assets/facilities/bed.jpg";
import dining from "../../assets/facilities/dining.jpg";
import gym from "../../assets/facilities/gym.jpg";
import reading from "../../assets/facilities/reading.jpg";
import sports from "../../assets/facilities/sports.jpg";
import lobby from "../../assets/facilities/lobby.jpg";

const Facilities = () => {
    return (
        <div className="bg-[#eef8ef] p-5 md:p-10 mt-10">
            <h1 className="text-center font-bold text-3xl py-4 mb-10">
                Our Facilities
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <FacilityCard
                    title={"Multi-functional Bed with personal locker"}
                    img={bed}
                ></FacilityCard>
                <FacilityCard
                    title={"Reading Room"}
                    img={reading}
                ></FacilityCard>
                <FacilityCard
                    title={"3 Times Meal"}
                    img={dining}
                ></FacilityCard>
                <FacilityCard
                    title={"Playing Zone"}
                    img={sports}
                ></FacilityCard>
                <FacilityCard title={"Gym"} img={gym}></FacilityCard>
                <FacilityCard
                    title={"Luxarious Lobby"}
                    img={lobby}
                ></FacilityCard>
            </div>
        </div>
    );
};

export default Facilities;
