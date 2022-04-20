import React from "react"
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout/layout'
import Work from '../components/work/work'

import '../styles/reset.scss'
import '../styles/global.scss'
import '../styles/typo.module.scss'

export default function Home() {
  const data = useStaticQuery(graphql`
    query {
      contentfulProject {
        title
      }
        } 
    `)

  return (
    <div>
      <Layout>
        <Work />
      </Layout>
    </div>
  )
}
