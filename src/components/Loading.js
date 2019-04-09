import React from "react";
import popcornIcon from "../images/popcorn.svg";

const Loading = () => (
    <div className="loading">
        <div className="loading-content">
            <img src={popcornIcon} alt="popcorn" />
            <p>Fetching Movies</p>
        </div>
    </div>
);

export default Loading;