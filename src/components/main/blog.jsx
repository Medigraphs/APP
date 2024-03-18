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
        if (!fetchBlog.blog.data) {
            dispatch(fetchBlogs());
        }
    }, [dispatch]);
    
    useEffect(() => {
        setFetchBlog(state);
    }, [state]);
    
    // console.log(fetchBlog.blog.data?.article);


    //Pagination(Start)
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 8;
    const lastIndex = currentPage * blogsPerPage;
    const firstIndex = lastIndex - blogsPerPage;
    const records = fetchBlog.blog.data?.article.slice(firstIndex, lastIndex);
    const numberOfPages = Math.ceil(fetchBlog.blog.data?.article.length / blogsPerPage);

    const [isPrevButtonDisabled, setPrevButtonDisabled] = useState(false);
    const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);

    useEffect(() => {
        console.log(records);
    }, []);

    useEffect(()=>{
        if (currentPage <= 1) {
            setPrevButtonDisabled(true);
        } else{
            setPrevButtonDisabled(false);
        }
    })

    useEffect(()=>{
        if(currentPage >= numberOfPages){
            setNextButtonDisabled(true);
        } else {
            setNextButtonDisabled(false);
        }
    })

    const prevPages = () =>{
            setCurrentPage(currentPage - 1);
    }

    const nextPages = () =>{
            setCurrentPage(currentPage + 1);
    }
    //Pagination(End)


    if (state.blog.isLoading) {
        return <Loader />
    }

    return <div className='container'>
        <SideMenu />
        <div className="main">
            {records && records.map((data) => (
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
        <div className="pages-button-container">
            <button className="blog-previous-button" onClick={prevPages} disabled={isPrevButtonDisabled}>Previous</button>
            <p className="blog-index-para">{currentPage} out of {numberOfPages}</p>
            <button className="blog-next-button" onClick={nextPages} disabled={isNextButtonDisabled}>Next</button>
        </div>
    </div>
}

export default Main;
