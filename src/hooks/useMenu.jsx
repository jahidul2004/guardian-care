import { useEffect, useState } from "react";

const useMenu = () => {
    const [menu, setMenu] = useState([]);
    console.log(menu);

    useEffect(() => {
        fetch("meals.json")
            .then((res) => res.json())
            .then((data) => setMenu(data));
    }, []);

    return [menu];
};

export default useMenu;
