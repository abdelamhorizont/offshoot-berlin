import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'

import Layout from '../../components/layout/layout'

export default function Post({ data }) {

  return (
    <Layout>
      <p>{data.wpPost.author.node.name}</p>
      <p>{data.wpPost.date}</p>
      <h1>{data.wpPost.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.wpPost.content }} />

      {/* <p>{data.wpPost.content}</p> */}
    </Layout>
  )
}

export const query = graphql`
query ($id: String) {
  wpPost(id: {eq: $id}) {
    id
    title
    content
    date(formatString: "MMMM D, YYYY")
    author {
      node {
        name
      }
    }
    excerpt
    slug
  }
}
`