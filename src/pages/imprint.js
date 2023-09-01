import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout/layout'

import { imprint } from '../styles/about.module.scss'

export default function Imprint() {

  const data = useStaticQuery(graphql`
    query {
      allContentfulImprint {
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

  const text = data.allContentfulImprint.nodes[0].text

  return (
    <Layout>
      <div className={imprint} >
        <div dangerouslySetInnerHTML={{ __html: text && text.childMarkdownRemark.html }} />
      </div>
    </Layout>
  )
}