import Banner from "../../components/Banner";
import Facilities from "./Facilities";
import MealsBy from "./MealsBy";
import Membership from "./Membership";

const Home = () => {
    return (
        <div>
            {/* Banner */}
            <Banner></Banner>
            {/* Banner end */}

            {/* Meals By Category */}
            <MealsBy></MealsBy>
            {/* Meals By Category end */}

            {/* Facilities */}
            <Facilities></Facilities>
            {/* Facilities end */}

            {/* Membership */}
            <Membership></Membership>
            {/* Membership end */}
        </div>
    );
};

export default Home;
