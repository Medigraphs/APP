import React, { useState } from "react";
import "./sideMenu.css";

const SideMenu = () => {

    const [food, setFood] = useState(true);
    const [travel, setTravel] = useState(true);
    const [politics, setPolitics] = useState(true);
    const [technology, setTechnology] = useState(true);

    const isChange = (data) => {
        if (data === "Food") {
            if (food === true) {
                console.log("Food");
            }
            setFood(!food);
        }
        if (data === "Travel") {
            if (travel === true) {
                console.log("Travel");
            }
            setTravel(!travel);
        }
        if (data === "Politics") {
            if (politics === true) {
                console.log("Politics");
            }
            setPolitics(!politics);
        }
        if (data === "Technology") {
            if (technology === true) {
                console.log("Technology");
            }
            setTechnology(!technology);
        }
    }

    const changeValue = (e) => {
        console.log(e.target.value);
    }

    return <div className="sideMenu">
            <form action="#" method="get" className="sideMenu-form" >
                <div className="container1">
                    <h3>Filters</h3>
                    <div className="container1-sub">
                        <label htmlFor="Recent-blog">
                            <input type="radio" name="toggle" id="Recent-blog" value="Recent-blog" onChange={changeValue} />Recent blog</label>
                        <label htmlFor="trending-blog">
                            <input type="radio" name="toggle" id="trending-blog" value="trending-blog" onChange={changeValue} />Trending blog</label>
                    </div>
                </div>
                <div className="container2">
                    <h3>Categories</h3>
                    <div className="container2-sub">
                        <label htmlFor="food">
                            <input type="checkbox" name="checkbox" id="category" value={food} onChange={() => isChange("Food")} />
                            Food
                        </label>
                        <label>
                            <input type="checkbox" name="checkbox" id="category" value={travel} onChange={() => isChange("Travel")} />
                            Travel
                        </label>
                        <label>
                            <input type="checkbox" name="checkbox" id="category" value={politics} onChange={() => isChange("Politics")} />
                            Politics
                        </label>
                        <label>
                            <input type="checkbox" name="checkbox" id="category" value={technology} onChange={() => isChange("Technology")} />
                            Technology
                        </label>
                    </div>
                </div>
            </form>
        </div>
}

export default SideMenu;