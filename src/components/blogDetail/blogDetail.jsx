import React, { useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleBlog } from "../../store/singleBlogSlice";
import './blogDetail.css';
import Loader from "../loading/loader";

const BlogDetail = () => {
    const dispatch = useDispatch();
    const { _id } = useParams();
    const state = useSelector((state)=> state.singleBlog);

    useEffect(() => {
        dispatch(fetchSingleBlog(_id));
    }, [_id, dispatch]);

    if (state.isLoading) {
        return <Loader />
    }

    const showSecondImage = state.data?.article.articleImage.length  < 1;   

    return (
        <div className="main-container-blogDetail">
            <div className="container-blogDetail">
                <h1 className="blogDetail-heading">{state.data?.article.title}</h1>
                <p className="blogDetail-date">Date: {state.data?.article.createdAt.slice(0,10)}</p>
                <img className="blogDetail-image" src={state.data?.article.articleImage[0]} alt="" />
                <p className="blogDetail-para">{state.data?.article.description.slice(0,250)}.</p>
                <img className="blogDetail-image" src={state.data?.article.articleImage[1]} alt="" style={{ display: showSecondImage ? 'block' : 'none' }}/>
                <p className="blogDetail-para" >{state.data?.article.description.slice(250,99999)}</p>
            </div>
        </div>
    );
};

export default BlogDetail;
