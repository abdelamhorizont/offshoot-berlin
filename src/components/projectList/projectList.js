import * as React from 'react'
import { useState, useRef } from "react";

import { Link, useStaticQuery, graphql } from 'gatsby'
import _ from "lodash";

import WorkTitle from '../workTitle/workTitle'

import { work, workContainer, youtubeContainer } from './projectList.module.scss'

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


export default function ProjectList() {
    const data = useStaticQuery(graphql`
query {
    allContentfulProject(filter: {category: {eq: "selected projects"}}) {
        nodes {
          id
          title
          year
          client
          videoUrl
          videoPreview {
            file {
              url
            }
          }
        }
      }
} 
`)

    const [index, setIndex] = useState(0);
    const [isShown, setIsShown] = useState(false);
    const [videoWidth, setVideoWidth] = useState("0vw");
    const [videoHeight, setVideoHeight] = useState("10vw");
    const videoContainer = useRef(null);
    const ulContainer = useRef(null);


    React.useEffect(() => {
        const isBrowser = () => typeof window !== "undefined"
        isBrowser() && window.addEventListener('load', handleLoad())
    }, []);


    const handleLoad = () => {
        // setVideoWidth("-" + videoContainer.current.clientWidth + "px")
        setVideoHeight(ulContainer.current.offsetHeight + "px")
        setVideoWidth(videoContainer.current.offsetWidth + "px")
    }

    return (
        <div className={workContainer}>
            <div className={work}
                onMouseEnter={() => {
                    setIsShown(true)
                    setVideoHeight(ulContainer.current.offsetHeight + "px")
                    setVideoWidth(videoContainer.current.offsetWidth + "px")
                }}
                onMouseLeave={() => setIsShown(false)}
            >
                <ul ref={ulContainer} >
                    {
                        data.allContentfulProject.nodes.map(node => (
                            <Link to={`/${_.kebabCase(node.title)}`}>
                                <li key={node.title}
                                    onMouseEnter={() => {
                                        setIndex(data.allContentfulProject.nodes.indexOf(node))
                                    }}
                                >
                                    <WorkTitle marg={true} path={node} />
                                </li>
                            </Link>
                        ))
                    }
                </ul>
                

                {data.allContentfulProject.nodes[index].videoPreview ?
                    <div style={{ marginRight: isShown ? "0rem" : "-20rem", maxHeight: videoHeight, width : videoWidth }} className={youtubeContainer}>
                        <video ref={videoContainer} muted autoPlay loop>
                            <source src={data.allContentfulProject.nodes[index].videoPreview.file.url} type="video/mp4" />
                        </video>
                    </div>
                    :
                    <div style={{ marginRight: isShown ? "0vw" : "-35vw", marginLeft: isShown ? "5vw" : "0vw" }} className={youtubeContainer}>
                        {/* <iframe
                            src={videoUrl(data.allContentfulProject.nodes[index].videoUrl)}
                            title="preview"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                            allowfullscreen>
                        </iframe> */}
                    </div>
                }

            </div>
        </div>
    )
}

