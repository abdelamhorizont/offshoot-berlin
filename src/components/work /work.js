import * as React from 'react'
import { useState } from "react";

import { Link, useStaticQuery, graphql } from 'gatsby'
import _ from "lodash";

import WorkTitle from '../workTitle/workTitle'

import { work, workContainer, youtubeContainer } from './work.module.scss'

function videoUrl(url) {
    if (url.includes('youtu')) {
        url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        const id = (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
        return "https://www.youtube-nocookie.com/embed/" + id + "?&showinfo=0&autohide=1&autoplay=1&mute=1&controls=0&loop=1&playlist=" + id
    }

    if (url.includes('vimeo')) {
        const id = /vimeo.*\/(\d+)/i.exec(url);
        if (id) {
            return 'https://player.vimeo.com/video/' + id[1] + '?&muted=1&autoplay=1&controls=0&pip=0'
        }
    }
}

export default function Work() {
    const data = useStaticQuery(graphql`
query {
    allContentfulProject {
        nodes {
          title
          year
          client
          videoUrl
        }
      }
} 
`)

    const [index, setIndex] = useState(0);
    const [isShown, setIsShown] = useState(false);

    return (
        <div className={workContainer}>
            <div className={work}>
                <ul>
                    {
                        data.allContentfulProject.nodes.map(node => (
                            <Link to={`/${_.kebabCase(node.title)}`}>

                                <li
                                    onMouseEnter={() => {
                                        setIndex(data.allContentfulProject.nodes.indexOf(node))
                                        setIsShown(true)
                                    }}
                                    onMouseLeave={() => setIsShown(false)}
                                >
                                    <WorkTitle marg={true} path={node} />

                                </li>

                            </Link>
                        ))
                    }
                </ul>

                <div style={{ marginRight: isShown ? "0vw" : "0vw" }} class={youtubeContainer}>
                    <iframe
                        src={videoUrl(data.allContentfulProject.nodes[index].videoUrl)}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                        allowfullscreen>
                    </iframe>
                </div>


            </div>
        </div>
    )
}

