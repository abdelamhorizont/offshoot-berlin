import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import { top, bottom, logo, animatedLogo, aboutLogo, ulWrapper } from './layout.module.scss'

// import logoFile from '../../assets/logo rot.mp4'

const Layout = ( props ) => {
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
    const path = isBrowser() && window.location.pathname;
    const pageName = props.path? props.path : ""

    return (
        <div>
            <header>
                <nav>
                    <div className={ulWrapper}>
                        <ul className={top}>
                            <li><Link to="/workAll">Archive</Link></li>
                            <li className={pageName == "/" ? animatedLogo  : logo }><Link to="/">
                                <video muted autoplay loop webkit-playsinline playsinline src={logoFile}>
                                    <source src={logoFile} type="video/mp4" />
                                </video>
                            </Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main>
                {props.children}
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