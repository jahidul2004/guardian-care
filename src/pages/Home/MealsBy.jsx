import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const MealsBy = () => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-max nx-auto">
                <Tabs
                    defaultIndex={tabIndex}
                    onSelect={(index) => setTabIndex(index)}
                >
                    <TabList className="text-[#5fbf54] md:text-xl font-semibold bg-[#5fbf54] bg-opacity-10 p-2 rounded">
                        <Tab>Breakfast</Tab>
                        <Tab>Lunch</Tab>
                        <Tab>Dinner</Tab>
                        <Tab>All Meals</Tab>
                    </TabList>

                    <TabPanel>Breakfast</TabPanel>
                    <TabPanel>Lunch</TabPanel>
                    <TabPanel>Dinner</TabPanel>
                    <TabPanel>All Meals</TabPanel>
                </Tabs>
            </div>

            <div></div>
        </div>
    );
};

export default MealsBy;
