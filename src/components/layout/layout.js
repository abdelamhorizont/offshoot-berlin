import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import { top, bottom, logo, animatedLogo, aboutLogo, ulWrapper } from './layout.module.scss'

// import logoFile from '../../assets/logo rot.mp4'

const Layout = ({ children, props }) => {
    const data = useStaticQuery(graphql`
    query {
          allContentfulAsset(filter: {title: {eq: "logo"}}) {
            nodes {
              file {
                url
                fileName
              }
            }
          }
    } 
    `)

    const logoFile = data.allContentfulAsset.nodes[0].file.url
  
    const isBrowser = () => typeof window !== "undefined"
    var path = isBrowser() && window.location.pathname;
    var pageName = path.split("/").pop();

    return (
        <div>
            <header>
                <nav>
                    <div className={ulWrapper}>
                        <ul className={top}>
                            <li><Link to="/workAll">Archive</Link></li>
                            <li className={pageName == "" ? animatedLogo  : logo  && pageName == "about" ? logo : logo }><Link to="/">
                                <video muted autoPlay loop>
                                    <source src={logoFile} type="video/mp4" />
                                </video>
                            </Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main>
                {children}
            </main>

            <footer>
                <ul className={bottom}>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/imprint">Imprint</Link></li>
                    {/* <li><Link to="/contact">DSVGO</Link></li> */}
                    <li><Link to="/agb">AGB</Link></li>
                </ul>
            </footer>
        </div>
    )
}

export default Layout