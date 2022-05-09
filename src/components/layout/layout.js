import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Div100vh from 'react-div-100vh'

import { top, bottom, logo, animatedLogo, aboutLogo, ulWrapper } from './layout.module.scss'

// import logoFile from '../../assets/logo rot.mp4'

const Layout = ( props ) => {
    const data = useStaticQuery(graphql`
    query {
          allContentfulAsset{
            nodes {
              title
              file {
                url
                fileName
              }
            }
          }
    } 
    `)

    // const logoFile = data.allContentfulAsset.nodes[0].file.url
    const logoFile = data.allContentfulAsset.nodes.filter(node => node.title == "logo")[0].file.url
    const logoImg = data.allContentfulAsset.nodes.filter(node => node.title == "logoImage")[0].file.url
  
    const isBrowser = () => typeof window !== "undefined"
    const path = isBrowser() && window.location.pathname;
    const pageName = props.path? props.path : ""

    return (
        <Div100vh>
        <div>
            <header>
                <nav>
                    <div className={ulWrapper}>
                        <ul className={top}>
                            <li key="archive"><Link to="/workAll">Archive</Link></li>
                            <li key="logo" className={pageName == "/" ? animatedLogo  : logo }><Link to="/">
                                <video muted autoPlay loop webkit-playsinline="true" playsInline poster={logoImg}>
                                    <source src={logoFile} type="video/mp4" />
                                </video>
                            </Link></li>
                            <li key="about"><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main>
                {props.children}
            </main>

            <footer>
                <ul className={bottom}>
                    <li key="contact"><Link to="/contact">Contact</Link></li>
                    <li key="imprint"><Link to="/imprint">Imprint</Link></li>
                    {/* <li><Link to="/contact">DSVGO</Link></li> */}
                    <li key="agb"><Link to="/agb">AGB</Link></li>
                </ul>
            </footer>
        </div>
        </Div100vh>
    )
}

export default Layout