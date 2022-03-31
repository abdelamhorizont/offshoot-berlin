import * as React from "react"
// import { Link, useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout/layout'
import Work from '../components/work/work'

const Homepage = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     allWpPost(    
  //       edges {
  //         node {
  //           id
  //         }
  //       }
  //     }
  //   }
  //   `)

  return (
    <Layout>
      <Work />
    </Layout>
  )
}

export default Homepage
