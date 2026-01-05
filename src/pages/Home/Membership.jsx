import { useEffect, useState } from "react";
import MembershipCard from "../../components/MembershipCard";

const Membership = () => {
    const [membership, setMembership] = useState([]);
    const [loading, setLoading] = useState(true); // লোডিং স্টেট যোগ করা হয়েছে

    useEffect(() => {
        fetch("https://gurdian-care-server.vercel.app/memberships")
            .then((res) => res.json())
            .then((data) => {
                setMembership(data);
                setLoading(false); // ডাটা লোড হলে লোডিং বন্ধ হবে
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h6 className="text-[#5fbf54] font-bold tracking-wider uppercase text-sm mb-2">
                        Pricing Plans
                    </h6>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                        Elevate Your Experience with{" "}
                        <span className="text-[#5fbf54]">Membership</span>
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Choose the perfect plan that fits your needs. Get
                        exclusive access to premium facilities and dedicated
                        care.
                    </p>
                </div>

                {/* Content Section */}
                {loading ? (
                    // Simple Tailwind Loading Spinner
                    <div className="flex justify-center items-center h-60">
                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#5fbf54]"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {membership?.map((item) => (
                            <div key={item.membershipId} className="h-full">
                                {/* Wrapping in a div to ensure height consistency if supported by card */}
                                <MembershipCard data={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Membership;
