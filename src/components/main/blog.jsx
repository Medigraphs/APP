import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./blog.css";
import { fetchBlogs } from "../../store/blogsSlice";
import SideMenu from '../sideMenu/sideMenu';
import Loader from "../loading/loader";

const Main = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [fetchBlog, setFetchBlog] = useState(state);

    useEffect(() => {
            dispatch(fetchBlogs());
    }, []);

    useEffect(() => {
        setFetchBlog(state);
    }, [state]);

    console.log(fetchBlog.blog.data?.article);


    return <div className='container'>
        <SideMenu />
        <div className="main">
            {fetchBlog.blog.data?.article.map((data) => (
                <div className="main-container" key={data._id}>
                    <div className="image-container">
                        <img className='image' src={data.articleImage[0]} alt="" />
                    </div>
                    <div className="blog-detail-container">
                        <h4 className="blog-name">{data.title}</h4>
                        <h6>{data.createdAt.slice(0, 10)}</h6>
                    </div>
                    <p className="blog-description">{data.description.slice(0, 150)} ...</p>
                    <Link className="blog-link" to={`/blogDetail/${data._id}`}>Read more</Link>
                </div>
            ))}
        </div>
    </div>
}

export default Main;
