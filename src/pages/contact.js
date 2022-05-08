import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout/layout'

import { contact } from '../styles/about.module.scss'

export default function Contact() {
  const data = useStaticQuery(graphql`
    query {
      allContentfulContact {
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

  const text = data.allContentfulContact.nodes[0].text

  return (
    <Layout>
      <div className={contact} >
        <div dangerouslySetInnerHTML={{ __html: text && text.childMarkdownRemark.html }} />
      </div>
    </Layout>
  )
}