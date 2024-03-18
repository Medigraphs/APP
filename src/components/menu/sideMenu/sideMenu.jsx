import React, { useState } from "react";
import "./sideMenu.css";

const SideMenu = () =>{

    const [food, setFood] = useState(true);
    const [travel, setTravel] = useState(true);
    const [politics, setPolitics] = useState(true);
    const [technology, setTechnology] = useState(true);

    const isChange = (data) =>{
        if(data === "Food"){
            if(food === true){
                console.log("Food");
            }
            setFood(!food);
        }
        if(data === "Travel"){
            if(travel === true){
                console.log("Travel");
            }
            setTravel(!travel);
        }
        if(data === "Politics"){
            if(politics === true){
                console.log("Politics");
            }
            setPolitics(!politics);
        }
        if(data === "Technology"){
            if(technology === true){
                console.log("Technology");
            }
            setTechnology(!technology);
        }
    }

    const changeValue = (e)=>{
        console.log(e.target.value);
    }

    return <div className="sideMenu">
        <div className="filter-form-container">
            <form action="#" method="get" className="sideMenu-form" >
                <h3>Filters</h3>
                <label htmlFor="Recent-blog">
                <input type="radio" name="toggle" id="Recent-blog" value = "Recent-blog" onChange={changeValue}/>Recent blog</label>
                <label htmlFor="trending-blog">
                <input type="radio" name="toggle" id="trending-blog" value="trending-blog" onChange={changeValue}/>Trending blog</label>
                <h3>Categories</h3>
                <label htmlFor="food">
                <input type="checkbox" name="checkbox" id="category" value={food} onChange={()=> isChange("Food")}/>
                Food
                </label>
                <label>
                <input type="checkbox" name="checkbox" id="category" value={travel} onChange={()=> isChange("Travel")}/>
                Travel
                </label>
                <label>
                <input type="checkbox" name="checkbox" id="category" value={politics} onChange={()=> isChange("Politics")}/>
                Politics
                </label>
                <label>
                <input type="checkbox" name="checkbox" id="category" value={technology} onChange={()=> isChange("Technology")}/>
                Technology
                </label>
            </form>
        </div>
    </div>
}

export default SideMenu;