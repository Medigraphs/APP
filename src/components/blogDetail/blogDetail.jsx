import React, { useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleBlog } from "../../store/singleBlogSlice";

const BlogDetail = () => {
    const dispatch = useDispatch();
    const { _id } = useParams();
    const state = useSelector((state)=> state.singleBlog);
    const [fetchBlog, setFetchBlog] = useState(state);

    useEffect(() => {
        dispatch(fetchSingleBlog(_id));
    }, [_id, dispatch]);

    useEffect(()=>{
        setFetchBlog(state);
    },[state]);

    console.log("singleBlog", fetchBlog);

    if (state.isLoading) {
        return <h1>Loading ...</h1>
    }

    return (
        <div>
            <h1>Blog Detail</h1>
            <p>id: {_id}</p>
        </div>
    );
};

export default BlogDetail;