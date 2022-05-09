import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout/layout'

import { agb } from '../styles/about.module.scss'

export default function AGB() {
  const data = useStaticQuery(graphql`
    query {
      allContentfulAgb {
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

  const text = data.allContentfulAgb.nodes[0].text

  return (
    <Layout>
      <div className={agb} >
        <div dangerouslySetInnerHTML={{ __html: text && text.childMarkdownRemark.html }} />
      </div>
    </Layout>
  )
}