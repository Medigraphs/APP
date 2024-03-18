import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./blog.css";

const Main = () => {

    const [blog, setBlog] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const fetchBlog = async () => {
        await fetch("https://blog-zo8s.vercel.app/app/v2/getArticles").then((res) => {
            res.json().then((res) => {
                console.log(res);
                //Updating data in useState.
                setBlog(res.article);
                setLoaded(true);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchBlog()
    }, []);



    return <div className="main">
        {loaded ? blog.map((data) => (
            <div className="main-container">
                <div className="image-container">
                    <img className='image' src={data.articleImage} alt="" />
                </div>
                <div className="blog-detail-container">
                    <h4 className="blog-name">{data.title}</h4>
                    <h6>{data.createdAt}</h6>
                </div>
                <p className="blog-description">{data.description.slice(0,150)}...</p>
            </div>
        )) : <h1>Loading ...</h1>}
    </div>
}

export default Main;