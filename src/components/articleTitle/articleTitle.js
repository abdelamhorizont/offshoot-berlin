import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

// import {
//     container,
//     div,
// } from './vorlage.module.scss'


const ArticleTitle = () => {
    // const data = useStaticQuery(graphql`
    // query {
    //     site {
    //       siteMetadata {
    //         title
    //       }
    //     }
    //   }
    // `)

    return (
        <div>
            <p>Author</p>
            <p>Date</p>
            <h1>Article Title</h1>
        </div>
    )
}

export default ArticleTitle