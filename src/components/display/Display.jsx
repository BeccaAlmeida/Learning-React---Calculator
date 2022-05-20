import React from "react";
import './display.css';

export default function Display(props) {
    return(
        <div className="displayContent">
            {props.value}
        </div>
    )
}
