import { useEffect, useState } from "react";
import MembershipCard from "../../components/MembershipCard";

const Membership = () => {
    const [membership, setMembership] = useState([]);
    console.log(membership);
    useEffect(() => {
        fetch("membership.json")
            .then((res) => res.json())
            .then((data) => setMembership(data));
    }, []);
    return (
        <div className="px-5 md:px-10">
            <h1 className="text-center font-bold text-3xl py-4 mt-10">
                Elevate Your Experience with Membership
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {membership?.map((item) => (
                    <MembershipCard
                        key={item.membershipId}
                        data={item}
                    ></MembershipCard>
                ))}
            </div>
        </div>
    );
};

export default Membership;
