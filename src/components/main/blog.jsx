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
    //Getting state from blogSlice.js
    const state = useSelector((state) => state.blog);
    const [fetchBlog, setFetchBlog] = useState(state);

    //Getting state from filterBlogsSlice.js
    const filterResult = useSelector((state) => state.filterBlogs);
    const [filterFetchBlogs, setFilterFetchBlogs] = useState(filterResult);

    /* initial rendering */
    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    /* setting up states */
    useEffect(() => {
        setFetchBlog(state);
        setFilterFetchBlogs(filterResult);
    }, [state, filterResult]);


    /* conditional rendering */
    useEffect(() => {
        if (filterFetchBlogs?.data) {
            setFetchBlog(null);
        }
    }, [fetchBlogs, filterFetchBlogs]);

    // console.log("fetchBlogs", fetchBlog?.data?.success);
    // console.log("filter records ", filterFetchBlogs.data?.success);


    //Pagination(Start)
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 8;
    const lastIndex = currentPage * blogsPerPage;
    const firstIndex = lastIndex - blogsPerPage;
    const article = fetchBlog?.data?.article || filterFetchBlogs?.data?.article;
    const records = article?.slice(firstIndex, lastIndex);
    const recordsLength = article?.length;
    const numberOfPages = Math.ceil(recordsLength / blogsPerPage);

    const [isPrevButtonDisabled, setPrevButtonDisabled] = useState(false);
    const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);

    // useEffect(() => {
    //     console.log(records);
    // }, []);

    //Handling corner cases for buttons(Started)
    useEffect(() => {
        if (currentPage <= 1) {
            setPrevButtonDisabled(true);
        } else {
            setPrevButtonDisabled(false);
        }
    }, [currentPage]);

    useEffect(() => {
        if (currentPage > numberOfPages) {
            setCurrentPage(1);
        }
        if (currentPage >= numberOfPages || isNaN(numberOfPages)) {
            setNextButtonDisabled(true);
        } else {
            setNextButtonDisabled(false);
        }
    }, [currentPage, numberOfPages]);

    const prevPages = () => {
        setCurrentPage(currentPage - 1);
    }

    const nextPages = () => {
        setCurrentPage(currentPage + 1);
    }
    //Handling corner cases for buttons(Ended)

    //Pagination(End)

    // Loading effect(Started)
    if (fetchBlog?.isLoading || filterFetchBlogs?.isLoading) {
        return <Loader />
    }
    // Loading effect(Ended)

    // Conditionally data not found(Started)
    if ((!fetchBlog?.data?.success || !filterFetchBlogs?.data?.success) && !records) {
        return <div className="not-found-supreme-container">
            <div className="not-found-container">
                <h1 className="not-found-h1">Oops, blogs not found !</h1>
                <p className="not-found-para">please try again ...</p>
            </div>
        </div>;
    } 
    // Conditionally data not found(Ended)

    return <div className={`container`}>
        <SideMenu />
        <div className="main">
            {records && records.length > 0 && records.map((data) => (
                <div className="main-container" key={data._id}>
                    <div className="image-container">
                        <img className="image" src={data.articleImage[0]} alt="" />
                    </div>
                    <div className="blog-detail-container">
                        <h4 className="blog-name">{data.title}</h4>
                        <h6>{data.createdAt.slice(0, 10)}</h6>
                    </div>
                    <p className="blog-description">{data.description.slice(0, 150)} ...</p>
                    <Link className="blog-link" to={`/blogDetail/${encodeURIComponent(data?.title)}`}>
                        Read more
                    </Link>
                </div>
            ))
            }
        </div>
        {filterFetchBlogs && (
            <div className="pages-button-container">
                <button
                    className="blog-previous-button"
                    onClick={prevPages}
                    disabled={isPrevButtonDisabled}
                >
                    Previous
                </button>
                <p className="blog-index-para">
                    {currentPage} out of {numberOfPages}
                </p>
                <button
                    className="blog-next-button"
                    onClick={nextPages}
                    disabled={isNextButtonDisabled}
                >
                    Next
                </button>
            </div>
        )
        }
    </div >
}

export default Main;
