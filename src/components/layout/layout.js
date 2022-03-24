import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

// import {
//     container,
//     navLinks,
//     navLinkItem,
//     navLinkText,
// } from './layout.module.scss'


const Layout = ({ pageTitle, children }) => {
    // const data = useStaticQuery(graphql`
    // query {
    //     site {
    //       siteMetadata {
    //         title
    //       }
    //     }
    //   }
    // `)

    // const logo = useRef();

    return (
        <div>
            {/* <title>{pageTitle} | {data.site.siteMetadata.title}</title> */}
            <header>
                <nav>
                    <div>
                        Melton Prior Institute
                    </div>
                    <ul>
                        <li><Link to="/About">About</Link></li>
                        <li><Link to="/Contact">Contact</Link></li>
                        <div>
                            <button>DE</button>
                            <button>EN</button>
                        </div>
                    </ul>
                    <ul>
                        <li><Link to="/features">Features</Link></li>
                        <li><Link to="/pictorials">Pictorials</Link></li>
                        <li><Link to="/collections">Collections</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                {/* <h1 className={heading}>{pageTitle}</h1> */}
                {children}
            </main>
        </div>
    )
}

export default Layout