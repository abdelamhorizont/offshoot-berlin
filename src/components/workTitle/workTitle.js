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

const mobile = isBrowser() && window.screen.width < 620 ? true : false
const macBook = isBrowser() && window.screen.width > 1400 ? true : false
const monitor = isBrowser() && window.screen.width > 2000 ? true : false

export default function WorkTitle(props) {

    const isBrowser = () => typeof window !== "undefined"
    var path = isBrowser() && window.location.pathname;
    // var page = path.split("/").pop();
    var page = "";

    const mobile = isBrowser() && window.screen.width < 620 ? true : false
    const marginClient = React.useMemo(() => randomNumber(0, 13), [])
    const marginTitle = React.useMemo(() => randomNumber(-6, 6), [])
    const marginYear = React.useMemo(() => monitor ? randomNumber(10, 30) : randomNumber(3, 8), [])
    const marginMobile = React.useMemo(() => randomNumber(-40, 40), [])


    if (mobile) {
        return (
            <div className={page == "" ? animated : workTitle}>
                <h2 style={{ marginLeft: 0 + "vw" }}>{props.path.client}</h2>
                <h1 style={{ marginLeft: 0 + "vw" }}>{props.path.title}</h1>
                <h3 style={{ marginLeft: marginMobile + "vw" }}>{props.path.year}</h3>
            </div>
        )
    } else {
        return (
            <div className={page == "" ? animated : workTitle}  >
                <h2 style={props.marg === true ? { marginLeft: marginClient + "rem" } : { marginLeft: 3 + "vw" }}>{props.path.client}</h2>
                <h1 style={props.marg === true ? { marginLeft: marginTitle + "rem" } : { marginLeft: 0 + "vw" }}>{props.path.title}</h1>
                {props.marg ?
                    <h3 style={props.isShown === true ? { marginRight: marginYear + "rem" } : { marginRight: marginClient + "rem" }}>{props.path.year}</h3>
                    :
                    <h3 style={{ marginRight: 3 + "vw" }}>{props.path.year}</h3>
                }
            </div>
        )
    }

}

