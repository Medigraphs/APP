import React, { useEffect, useState } from "react";
import "./sideMenu.css";

const SideMenu = () => {

    const [food, setFood] = useState(true);
    const [travel, setTravel] = useState(true);
    const [politics, setPolitics] = useState(true);
    const [technology, setTechnology] = useState(true);
    // const [recentBlogs, setRecentBlog] = useState(true);
    // const [trendingBlogs, setTrendingBlog] = useState(true);
    const [isFormNull, setIsFormNull] = useState(true);

    const [formData, setFormData] = useState({
        // type: null,
        food: null,
        travel: null,
        politics: null,
        technology: null,
    });

    const handleResetFormData = () => {
        setFormData({
        //   type: null,
          food: null,
          travel: null,
          politics: null,
          technology: null,
        });
        setFood(true);
        setTravel(true);
        setPolitics(true);
        setTechnology(true);
      };

      useEffect(()=>{
        let isAllValueNull = Object.values(formData).every((value)=> value === null);
        if (!isAllValueNull) {
            setIsFormNull(false);
        }else{
            setIsFormNull(true);
        }
      },[formData]);

      console.log(isFormNull);

    const isChange = (data) => {
        if (data === "Food") {
            if (food === true) {
                console.log(" selected food");
                setFormData((prevData)=>({
                    ...prevData,
                    food: "Food",
                }))
            } 
            else{
                console.log(" unselected food");
                setFormData((prevData)=>({
                    ...prevData,
                    food: null,
                }))
            }
            setFood(!food);
        }
        if (data === "Travel") {
            if (travel === true) {
                console.log(" selected Travel");
                setFormData((prevData)=>({
                    ...prevData,
                    travel: "Travel",
                }))
            }
            else{
                console.log(" unselected Travel");
                setFormData((prevData)=>({
                    ...prevData,
                    travel: null,
                }))
            }
            setTravel(!travel);
        }
        if (data === "Politics") {
            if (politics === true) {
                console.log(" selected Politics");
                setFormData((prevData)=>({
                    ...prevData,
                    politics: "Politics",
                }))
            }
            else{
                console.log(" unselected Politics");
                setFormData((prevData)=>({
                    ...prevData,
                    politics: null,
                }))
            }
            setPolitics(!politics);
        }
        if (data === "Technology") {
            if (technology === true) {
                console.log(" selected Technology");
                setFormData((prevData)=>({
                    ...prevData,
                    technology: "Technology",
                }))
            }
            else{
                console.log(" unselected Technology");
                setFormData((prevData)=>({
                    ...prevData,
                    technology: null,
                }))
            }
            setTechnology(!technology);
        }
        // if (data === "Recent-Blogs") {
        //     if (recentBlogs === true) {
        //         console.log(" selected Recent-Blogs");
        //         setFormData((prevData)=>({
        //             ...prevData,
        //             type: "Recent-Blogs",
        //         }))
        //     }
        // }
        // if (data === "Trending-Blogs") {
        //     if (trendingBlogs === true) {
        //         console.log(" selected Trending-Blogs");
        //         setFormData((prevData)=>({
        //             ...prevData,
        //             type: "Trending-Blogs",
        //         }))
        //     }
        // }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        // Object.entries(formData).forEach(([key, value])=>{
        //     console.log(key + " " + value);
        // })
        console.log(formData);
    }


    return <div className="sideMenu">
        <form method="get" className="sideMenu-form" onSubmit={handleSubmit}>
            {/* <div className="container1">
                <h3>Filters</h3>
                <div className="container1-sub">
                    <label htmlFor="Recent-blog">
                        <input type="radio" name="toggle" id="Recent-blog" value={recentBlogs} onChange={() => isChange("Recent-Blogs")} />Recent blog</label>
                    <label htmlFor="trending-blog">
                        <input type="radio" name="toggle" id="trending-blog" value={trendingBlogs} onChange={() => isChange("Trending-Blogs")} />Trending blog</label>
                </div>
            </div> */}
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
            <button type="submit" className="filter-submit-button" disabled={isFormNull}>Submit</button>
            <button type="reset" className="filter-reset-button" disabled={isFormNull} onClick={handleResetFormData}>Reset</button>
        </form>
    </div>
}

export default SideMenu;