import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import { top, bottom, logo} from './layout.module.scss'

import logoFile from '../../assets/logo rot.mp4'

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
    query {
        allContentfulAsset(filter: {title: {eq: "logo"}}) {
              nodes {
                title
                file {
                  url
                }
                url
              }
          }
      }
    `)

    // const logo = data.allContentfulAsset.nodes.url

    return (
        <div>
            <header>
                <nav>
                    <ul className={top}>
                        <li><Link to="/work">Work</Link></li>
                        {/* <li><Link to="/"> offshoot*berlin</Link></li> */}
                        <li><Link to="/">
                            <video id={logo} muted autoPlay loop>
                                <source src={logoFile} type="video/mp4" />
                            </video>
                        </Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                {children}
            </main>

            <footer>
                <ul className={bottom}>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/imprint">Imprint</Link></li>
                    <li><Link to="/agb">AGB</Link></li>
                </ul>
            </footer>
        </div>
    )
}

export default Layout