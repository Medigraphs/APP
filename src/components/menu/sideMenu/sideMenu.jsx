import React from "react";
import "./sideMenu.css";

const sideMenu = () => {

    const changeValue = (e)=>{
        console.log(e.target.value);
    }

    const chechBoxInput = (e) =>{
        console.log(e.target.value);
    }
    
    return <div className="sideMenu">
        <div className="filter-form-container">
            <form action="#" method="get"className="sideMenu-form" >
                <h3>Filters</h3>
                <label htmlFor="Recent-blog">
                <input type="radio" name="toggle" id="Recent-blog" value = "Recent-blog" onChange={changeValue}/>Recent blog</label>
                <label htmlFor="trending-blog">
                <input type="radio" name="toggle" id="trending-blog" value="trending-blog" onChange={changeValue}/>Trending blog</label>
                <h3>Categories</h3>
                <label htmlFor="food">
                <input type="checkbox" name="checkbox" id="category" value="Food" onChange={chechBoxInput} />
                Food
                </label>
                <label>
                <input type="checkbox" name="checkbox" id="category" value="Travel" onChange={chechBoxInput}/>
                Travel
                </label>
                <label>
                <input type="checkbox" name="checkbox" id="category" value="Politics" onChange={chechBoxInput}/>
                Politics
                </label>
                <label>
                <input type="checkbox" name="checkbox" id="category" value="Technology" onChange={chechBoxInput}/>
                Technology
                </label>
            </form>
        </div>
    </div>
}

export default sideMenu;