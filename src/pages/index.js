import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout/layout'
import Section from '../components/section/section'
import ArticleTitle from '../components/articleTitle/articleTitle'
import ArticleBody from '../components/articleBody/articleBody'

const Homepage = () => {

  return (
    <Layout>

      <Section title="About">
        <ArticleBody />
      </Section>

      <Section title="News">
        <ArticleTitle />
        <ArticleBody />
      </Section>

    </Layout>
  )
}

export default Homepage
