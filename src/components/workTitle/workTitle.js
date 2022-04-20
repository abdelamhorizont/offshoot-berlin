import * as React from 'react'

import {
    workTitle,
} from './workTitle.module.scss'

function videoUrl(url) {
    if (url.includes('youtu')) {
        url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        const id = (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
        return "https://www.youtube-nocookie.com/embed/" + id + "?&modestbranding=1&autoplay=1&mute=1&controls=0&loop=1"
    }

    if (url.includes('vimeo')) {
        const id = /vimeo.*\/(\d+)/i.exec(url);
        if (id) {
            return 'https://player.vimeo.com/video/' + id[1]
        }
    }
}

export default function WorkTitle(props) {

    function randomNumber(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return (
        <div className={workTitle}>
            <h2 style={ props.marg  === true ? { marginLeft: randomNumber(0, 15) + "vw" } : {marginLeft: 3 + "vw"}}>{props.path.client}</h2>
            <h1>{props.path.title}</h1>
            <h3 style={ props.marg  === true ? { marginRight: randomNumber(0, 15) + "vw" } : {marginRight: 3 + "vw"}}>{props.path.year}</h3>
        </div>
    )
}

