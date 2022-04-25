import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import _ from "lodash";

import WorkTitle from '../components/workTitle/workTitle'
import Layout from '../components/layout/layout'

import { work, workContainer, youtubeContainer } from '../components/projectList/projectList.module.scss'


export default function WorkAll() {
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

  return (
    <Layout>
      <div className={workContainer}>
        <div  className={work}>
          <ul>
            {
              data.allContentfulProject.nodes.map(node => (
                <Link to={`/${_.kebabCase(node.title)}`}>

                  <li>
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