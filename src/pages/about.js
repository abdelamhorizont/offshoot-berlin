import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout/layout'

import { about } from '../styles/about.module.scss'

export default function About({location}) {

  const data = useStaticQuery(graphql`
    query {
      allContentfulAbout {
        nodes {
          text {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    `)

  const text = data.allContentfulAbout.nodes[0].text

  return (
    <Layout path={location.pathname}>
      <div className={about} >
        <div dangerouslySetInnerHTML={{ __html: text && text.childMarkdownRemark.html }} />
      </div>
    </Layout>
  )
}