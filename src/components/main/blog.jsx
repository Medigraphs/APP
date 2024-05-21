import React, { useEffect, useState } from "react";
import "./blog.css";
import Loader from "../loading/loader"
const Main = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulate a delay, such as fetching data
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(delay);
    }, []);
    return (

        <>
            {
                isLoading ?
                    <Loader />
                    :
                    <div className="not-found-supreme-container">
                        <div className="not-found-container">
                            <h1 className="not-found-h1">Welcome to MediGraphs</h1>
                        </div>
                    </div>
            }
        </>
    )
}

export default Main;
