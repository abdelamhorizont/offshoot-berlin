import * as React from 'react'
// import { Link, useStaticQuery, graphql } from 'gatsby'

// import {
//     container,
//     div,
// } from './vorlage.module.scss'


const WorkTitle = ( props ) => {
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
            <h2>{props.client}</h2>
            <h1>{props.project}</h1>
            <h3>{props.year}</h3>
        </div>
    )
}

export default WorkTitle