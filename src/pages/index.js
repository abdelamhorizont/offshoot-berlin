import React from "react"
// import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout/layout'
// import Work from '../components/work/work'
import ProjectList from '../components/projectList/projectList'

import '../styles/reset.scss'
import '../styles/global.scss'
import '../styles/typo.module.scss'

export default function Home({location}) {
  console.log(location.pathname)

  return (
    <div>
      <Layout path={location.pathname}>
        {/* <Work /> */}
        <ProjectList />
      </Layout>
    </div>
  )
}
