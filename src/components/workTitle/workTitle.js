import * as React from 'react'
import { useMemo } from "react";

import {
    workTitle,
    animated
} from './workTitle.module.scss'

function randomNumber(min, max) { // min and max included
    return (
        Math.floor(Math.random() * (max - min + 1) + min)
    )
}

const isBrowser = () => typeof window !== "undefined"
var path = isBrowser() && window.location.pathname;

const mobile = isBrowser() && window.screen.width < 720 ? true : false
const macBook = isBrowser() && window.screen.width > 1400 ? true : false
const monitor = isBrowser() && window.screen.width > 2000 ? true : false

export default function WorkTitle(props) {

    const isBrowser = () => typeof window !== "undefined"
    var path = isBrowser() && window.location.pathname;
    // var page = path.split("/").pop();
    var page = "";

    const mobile = isBrowser() && window.screen.width < 720 ? true : false
    const marginClient = React.useMemo(() => randomNumber(0, 13), [])
    const marginTitle = React.useMemo(() => randomNumber(-6, 6), [])
    const marginYear = React.useMemo(() => monitor ? randomNumber(1, 30) : randomNumber(1, 18), [])
    const marginMobile = React.useMemo(() => randomNumber(-40, 40), [])


    if (mobile) {
        return (
            <div className={page == "" ? animated : workTitle}>
                <h2 style={{ marginLeft: 0 + "vw" }}>{props.path.client}</h2>
                <h1 style={{ marginLeft: 0 + "vw" }}>{props.path.title}</h1>
                <h3 style={{ marginLeft: marginMobile + "vw", opacity: props.isShown ? "1" : "1" }}>{props.path.year}</h3>
            </div>
        )
    } else {
        return (
            <div className={page == "" ? animated : workTitle}>
                <h2 style={props.marg === true ? { marginLeft: marginClient + "rem" } : { marginLeft: 0.2 + "vw" }}>{props.path.client}</h2>
                <h1 style={props.marg === true ? { marginLeft: marginTitle + "rem" } : { marginLeft: 0 + "vw" }}>{props.path.title}</h1>
                {props.marg ?
                    <h3 style={{opacity: props.isShown && !mobile? "1"  :  "1", marginRight: marginYear + "rem" }}>{props.path.year}</h3>
                    :
                    <h3 style={{ marginRight: 0.5 + "vw" }}>{props.path.year}</h3>
                }
            </div>
        )
    }
}

