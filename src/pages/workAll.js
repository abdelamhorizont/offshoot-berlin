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

  return (
    <Layout>
      <div className={workContainer}>
        <div className={work}>
          <ul style={{marginTop: "00vh", marginBottom: "10vh"}}>
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
        </div>
      </div>

    </Layout>
  )
}