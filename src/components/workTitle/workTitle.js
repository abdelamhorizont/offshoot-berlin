import * as React from 'react'

import {
    workTitle,
    animated
} from './workTitle.module.scss'

export default function WorkTitle(props) {

    var path = window.location.pathname;
    var page = path.split("/").pop();

    function randomNumber(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return (
        <div className={page == "" ? animated : workTitle}>
            <h2 style={ props.marg  === true ? { marginLeft: randomNumber(0, 15) + "rem" } : {marginLeft: 2 + "vw"}}>{props.path.client}</h2>
            <h1>{props.path.title}</h1>
            <h3 style={ props.marg  === true ? { marginRight: randomNumber(0, 15) + "rem" } : {marginRight: 2 + "vw"}}>{props.path.year}</h3>
        </div>
    )
}

