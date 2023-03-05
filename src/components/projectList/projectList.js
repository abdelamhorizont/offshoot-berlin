import * as React from 'react'
import { useState, useRef } from "react";

import { Link, useStaticQuery, graphql } from 'gatsby'
import _ from "lodash";

import WorkTitle from '../workTitle/workTitle'

import { work, workContainer, youtubeContainer } from './projectList.module.scss'

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
    const [videoHeight, setVideoHeight] = useState("3vw");
    const videoContainer = useRef(null);
    const ulContainer = useRef(null);


    React.useEffect(() => {
        const isBrowser = () => typeof window !== "undefined"
        isBrowser() && window.addEventListener('load', handleLoad())
        window.addEventListener('popstate', function () {
            setIsShown(false)
            console.log('location changed!');
        });
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
                                    onClick={() => {
                                        setIsShown(false)
                                    }}
                                >
                                    <WorkTitle marg={true} path={node} isShown={isShown} />
                                </li>
                            </Link>
                        ))
                    }
                </ul>

                {data.allContentfulProject.nodes[index].videoPreview &&
                    // <div key={index} style={{ marginRight: isShown ? "0rem" : "0rem", maxHeight: "videoHeight", width : videoWidth }} className={youtubeContainer}>
                    <div key={index} style={{ opacity: isShown ? "1" : "0"}} className={youtubeContainer}>
                        <video key={data.allContentfulProject.nodes[index].videoPreview.file.url} ref={videoContainer} muted autoPlay loop webkit-playsinline="true" playsInline>
                            <source src={data.allContentfulProject.nodes[index].videoPreview.file.url} type="video/mp4" />
                        </video>
                    </div>
                 }

            </div>
        </div>
    )
}

