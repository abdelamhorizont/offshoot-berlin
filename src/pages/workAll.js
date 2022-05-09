import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import { useState, useRef } from "react";

import _ from "lodash";

import WorkTitle from '../components/workTitle/workTitle'
import Layout from '../components/layout/layout'

import { work, workContainer, youtubeContainer } from '../components/projectList/projectList.module.scss'

export default function WorkAll() {
  const data = useStaticQuery(graphql`
  query {
    allContentfulProject(filter: {category: {ne: "hidden"}}) {
      nodes {
            title
            year
            client
            videoUrl
            id
          }
        }
        allContentfulAsset(filter: {title: {eq: "showreel"}}) {
          nodes {
            file {
              url
            }
            title
          }
        }   
  } 
  `)

  const [isShown, setIsShown] = useState(false);
  const [videoHeight, setVideoHeight] = useState("10vw");
  const ulContainer = useRef(null);


  React.useEffect(() => {
    const isBrowser = () => typeof window !== "undefined"
    isBrowser() && window.addEventListener('load', handleLoad())
  }, []);


  const handleLoad = () => {
    setVideoHeight(ulContainer.current.offsetHeight + "px")
  }

  return (
    <Layout>
      <div className={workContainer}>
        <div className={work}
          onMouseEnter={() => {
            setIsShown(true)
            setVideoHeight(ulContainer.current.offsetHeight + "px")
          }}
          onMouseLeave={() => setIsShown(false)}
        >
          <ul ref={ulContainer}>
            {
              data.allContentfulProject.nodes.map(node => (
                <Link to={`/${_.kebabCase(node.title)}`}>

                  <li key={node.id}>
                    <WorkTitle marg={true} path={node} />
                  </li>

                </Link>
              ))
            }
          </ul>

          <div style={{ marginRight: isShown ? "-200vw" : "-200vw", maxHeight: "90px" }} className={youtubeContainer}>
            <video muted autoPlay loop webkit-playsinline="true" playsInline>
              <source src={data.allContentfulAsset.nodes[0].file.url} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

    </Layout>
  )
}