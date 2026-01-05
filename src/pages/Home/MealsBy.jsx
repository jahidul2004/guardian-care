import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useMenu from "../../hooks/useMenu";
import MealCard from "../../components/MealCard";

const MealsBy = () => {
    // Tab Index state (optional here since react-tabs handles it, but good for control)
    const [tabIndex, setTabIndex] = useState(0);
    const [menu] = useMenu();

    // Filtering Data
    const breakfast = menu.filter((item) => item.category === "Breakfast");
    const lunch = menu.filter((item) => item.category === "Launch"); // DB typo 'Launch' handled
    const dinner = menu.filter((item) => item.category === "Dinner");
    const allMeals = menu;

    return (
        <section className="py-16 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Our Delicious{" "}
                        <span className="text-[#5fbf54]">Menu</span>
                    </h2>
                    <p className="text-gray-500">
                        Explore our wide range of nutritious and tasty meals
                        curated specially for you. Choose from breakfast, lunch,
                        or dinner options.
                    </p>
                </div>

                {/* Tabs Component */}
                <Tabs
                    selectedIndex={tabIndex}
                    onSelect={(index) => setTabIndex(index)}
                    className="w-full"
                    selectedTabClassName="bg-[#5fbf54] text-white shadow-lg scale-105 border-transparent"
                >
                    {/* Custom Tab List Design */}
                    <TabList className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12 border-none p-0">
                        {["Breakfast", "Lunch", "Dinner", "All Meals"].map(
                            (tabName, index) => (
                                <Tab
                                    key={index}
                                    className={`px-6 py-3 rounded-full text-sm md:text-base font-semibold cursor-pointer transition-all duration-300 border border-gray-200 outline-none
                                ${
                                    tabIndex !== index
                                        ? "bg-white text-gray-600 hover:text-[#5fbf54] hover:border-[#5fbf54]"
                                        : ""
                                }`}
                                >
                                    {tabName}
                                </Tab>
                            )
                        )}
                    </TabList>

                    {/* Content Panels */}
                    <div className="min-h-[400px]">
                        <TabPanel>
                            <MealGrid items={breakfast} />
                        </TabPanel>

                        <TabPanel>
                            <MealGrid items={lunch} />
                        </TabPanel>

                        <TabPanel>
                            <MealGrid items={dinner} />
                        </TabPanel>

                        <TabPanel>
                            <MealGrid items={allMeals} />
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        </section>
    );
};

// Reusable Grid Component to keep code clean
const MealGrid = ({ items }) => {
    if (!items || items.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-400 text-lg">
                    No meals available in this category.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((item) => (
                <MealCard key={item._id} data={item} />
            ))}
        </div>
    );
};

export default MealsBy;
