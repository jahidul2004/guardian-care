import { useContext, useEffect, useState } from "react";
import Banner from "../../components/Banner";
import Facilities from "./Facilities";
import MealsBy from "./MealsBy";
import Membership from "./Membership";
import AuthContext from "../../context/AuthContext/AuthContext";
import axios from "axios";
import NewsLetter from "./NewsLetter";
import Partner from "./Partner";
import Reviews from "./Reviews";

const Home = () => {
    const [givenBadge, setGivenBadge] = useState("");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://gurdian-care-server.vercel.app/transactions/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                const maxAmountObject = data.reduce((max, current) => {
                    return current.amount > max.amount ? current : max;
                }, data[0]);

                if (maxAmountObject?.membershipId === "S001") {
                    setGivenBadge("silver");
                } else if (maxAmountObject?.membershipId === "G001") {
                    setGivenBadge("gold");
                } else if (maxAmountObject?.membershipId === "P001") {
                    setGivenBadge("platinum");
                } else {
                    setGivenBadge("bronze");
                }
            });
    }, [user]);

    axios
        .patch(`https://gurdian-care-server.vercel.app/users/badge/${user?.email}`, {
            badge: givenBadge,
        })
        .then((res) => {
            // console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

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

            {/* Meet our partner */}
            <Partner></Partner>
            {/* Meet our partner end */}

            {/* Newsletter */}
            <NewsLetter></NewsLetter>
            {/* Newsletter end */}

            {/* Reviews */}
            <Reviews></Reviews>
            {/* Reviews end */}
        </div>
    );
};

export default Home;
