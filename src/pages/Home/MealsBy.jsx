import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../hooks/useMenu";
import MealCard from "../../components/MealCard";

const MealsBy = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const [menu] = useMenu();

    const breakfast = menu.filter((item) => item.category === "Breakfast");
    const lunch = menu.filter((item) => item.category === "Lunch");
    const dinner = menu.filter((item) => item.category === "Dinner");
    const allMeals = menu;

    return (
        <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-[95%] mx-auto text-center">
                <Tabs
                    defaultIndex={tabIndex}
                    onSelect={(index) => setTabIndex(index)}
                >
                    <TabList className="text-[#5fbf54] md:text-xl font-semibold bg-[#5fbf54] bg-opacity-10 p-2 rounded mb-10">
                        <Tab>Breakfast</Tab>
                        <Tab>Lunch</Tab>
                        <Tab>Dinner</Tab>
                        <Tab>All Meals</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                            {breakfast.map((item) => (
                                <MealCard key={item.id} data={item}></MealCard>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                            {lunch.map((item) => (
                                <MealCard key={item.id} data={item}></MealCard>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                            {dinner.map((item) => (
                                <MealCard key={item.id} data={item}></MealCard>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                            {allMeals.map((item) => (
                                <MealCard key={item.id} data={item}></MealCard>
                            ))}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default MealsBy;
