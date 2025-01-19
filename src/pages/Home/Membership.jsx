import { useEffect, useState } from "react";
import MembershipCard from "../../components/MembershipCard";

const Membership = () => {
    const [membership, setMembership] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/memberships")
            .then((res) => res.json())
            .then((data) => setMembership(data));
    }, []);
    return (
        <div className="p-5 md:p-10">
            <h1 className="text-center font-bold text-3xl py-4 mb-10">
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
