import Banner from "../../components/Banner";
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
        </div>
    );
};

export default Home;
