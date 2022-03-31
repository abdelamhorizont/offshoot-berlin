import * as React from 'react'
// import { Link, useStaticQuery, graphql } from 'gatsby'

import WorkTitle from '../../components/workTitle/workTitle'

// import {
//     container,
//     div,
// } from './vorlage.module.scss'


const Work = ({ children }) => {
    // const data = useStaticQuery(graphql`
    // query {
    //     site {
    //       siteMetadata {
    //         title
    //       }
    //     }
    //   }
    // `)

    const works = [
        ["48 Grams", " BEAUTY REINVENTED", 2021],
        ["Finja Messer", "BOOTYCALL", 2020],
        ["MONKYMAN", "How I Feel", 2020],
        ["Juno Francis", "Alejandro Moli", 2019],
        ["Telekom Electronic Beats", "20th anniversary Reinvented ", 2020],
        ["Schmyt", "Liebe verloren", 2022]
    ]

    return (
        <div>
            <ul>
                {
                    works.map(work => (
                        // <Link to={`/${edge.node.uri}`}>

                        <li>                

                        <WorkTitle
                            client={work[0]}
                            project={work[1]}
                            year={work[2]}
                        />

                        </li>

                        // </Link>
                    ))
                }

                <WorkTitle />
            </ul>
        </div>
    )
}

export default Work