import Banner from "../../components/Banner";
import Facilities from "./Facilities";
import MealsBy from "./MealsBy";

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
        </div>
    );
};

export default Home;
