import React from "react";

const FAQ = () => {
    // Data Array for easy management
    const faqData = [
        {
            question: "What is Guardian Care?",
            answer: "Guardian Care is a platform that provides meal plans, memberships, and caregiving services for individuals who need regular assistance. It offers easy booking, secure payment via Stripe, and a user-friendly experience.",
        },
        {
            question: "Who can use Guardian Care?",
            answer: "Anyone who needs professional caregiving services, meal plans, or health-related memberships can use Guardian Care. It is especially useful for elderly individuals, people with disabilities, and those recovering from illness.",
        },
        {
            question: "How do I choose the right membership?",
            answer: "You can select a membership based on the services you need. Each membership package offers different levels of care and meal options. Details about each plan are available on the pricing page.",
        },
        {
            question: "Is the food customizable for dietary restrictions?",
            answer: "Yes! We offer customizable meal plans suitable for diabetics, heart patients, and other dietary requirements. You can select your preferences while booking.",
        },
        {
            question: "How secure is the payment process?",
            answer: "We use Stripe for all transactions, ensuring that your payment details are encrypted and 100% secure. We do not store your card information.",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h6 className="text-[#5fbf54] font-bold tracking-wider uppercase text-sm mb-2">
                        Common Questions
                    </h6>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                        Frequently Asked{" "}
                        <span className="text-[#5fbf54]">Questions</span>
                    </h2>
                    <p className="text-gray-500">
                        Find answers to the most common questions about our
                        services, membership, and care plans.
                    </p>
                </div>

                {/* Accordion Container */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="collapse collapse-plus bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                        >
                            {/* Radio Input for Accordion Logic */}
                            <input
                                type="radio"
                                name="my-accordion-3"
                                defaultChecked={index === 0}
                            />

                            <div className="collapse-title text-lg md:text-xl font-semibold text-gray-700 group-focus-within:text-[#5fbf54] group-focus-within:bg-green-50/50">
                                <span className="mr-2 text-[#5fbf54] opacity-70">
                                    {index + 1}.
                                </span>
                                {item.question}
                            </div>

                            <div className="collapse-content text-gray-600 leading-relaxed">
                                <p className="pt-2 pb-4 border-t border-gray-100 mt-2">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-600">
                        Still have questions?{" "}
                        <a
                            href="/contact"
                            className="text-[#5fbf54] font-bold hover:underline cursor-pointer"
                        >
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
