import * as React from 'react'

import {
    workTitle,
    animated
} from './workTitle.module.scss'

export default function WorkTitle(props) {

    const isBrowser = () => typeof window !== "undefined"
    var path = isBrowser() && window.location.pathname;
    // var page = path.split("/").pop();
    var page = "";

    const mobile = isBrowser() && window.screen.width < 620 ? true : false

    function randomNumber(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // const [randomMargin, setRandomMargin] = useState(randomNumber(0, 15) + "rem");

    // React.useEffect(() => {
    //    window.addEventListener('load', setRandomMargin(randomNumber(0, 15)))
    //  }, []);

    if (mobile) {
        return (
            <div className={page == "" ? animated : workTitle}>
                <h2>{props.path.client}</h2>
                <h1 style={{ marginLeft: randomNumber(0, 14) + "rem" }}>{props.path.title}</h1>
                <h3 style={{ marginLeft: randomNumber(0, 18) + "rem" }}>{props.path.year}</h3>
            </div>
        )
    } else {
        return (
            <div className={page == "" ? animated : workTitle} >
                <h2 style={props.marg === true ? { marginLeft: randomNumber(0, 15) + "rem" } : { marginLeft: 2 + "vw" }}>{props.path.client}</h2>
                <h1>{props.path.title}</h1>
                <h3 style={props.marg === true ? { marginRight: randomNumber(0, 15) + "rem" } : { marginRight: 2 + "vw" }}>{props.path.year}</h3>
            </div>
        )
    }

}

