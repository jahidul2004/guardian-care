const FAQ = () => {
    return (
        <div className="w-[95%] mx-auto my-10 flex flex-col items-center gap-2 bg-[#eef8ef] p-5 rounded">
            <h1 className="text-center text-3xl font-bold my-5 md:my-10">
                Frequently Asked Question
            </h1>
            <div className="collapse collapse-plus bg-white">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    1. What is Guardian Care?
                </div>
                <div className="collapse-content">
                    <p>
                        Guardian Care is a platform that provides meal plans,
                        memberships, and caregiving services for individuals who
                        need regular assistance. It offers easy booking, secure
                        payment via Stripe, and a user-friendly experience.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-white">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    2. Who can use Guardian Care?
                </div>
                <div className="collapse-content">
                    <p>
                        Anyone who needs professional caregiving services, meal
                        plans, or health-related memberships can use Guardian
                        Care. It is especially useful for elderly individuals,
                        people with disabilities, and those recovering from
                        illness.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-white">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    5. How do I choose the right membership?
                </div>
                <div className="collapse-content">
                    <p>
                        You can select a membership based on the services you
                        need. Each membership package offers different levels of
                        care and meal options. Details about each plan are
                        available on the website.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
