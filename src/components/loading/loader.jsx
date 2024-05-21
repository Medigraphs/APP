import React from "react";
import './loader.css';

const Loading = ({ height }) => {
    return (
        <div className="loader" style={height && {
            height: height
        }}>
        </div>
    )
}

export default Loading;