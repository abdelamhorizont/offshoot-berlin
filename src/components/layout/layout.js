import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Div100vh from 'react-div-100vh'

import { top, bottom, logo, animatedLogo, aboutLogo, ulWrapper, wrapper, header, footer } from './layout.module.scss'

import LogoFile from '../../assets/offshoot_logo.svg'

const Layout = (props) => {
    const data = useStaticQuery(graphql`
    query {
          allContentfulAsset{
            nodes {
              title
              file {
                url
                fileName
                contentType
              }
            }
          }
    } 
    `)

    // const logoFile = data.allContentfulAsset.nodes[0].file.url
    const logoFile = data.allContentfulAsset.nodes.filter(node => node.title == "logo")[0].file
    const logoImg = data.allContentfulAsset.nodes.filter(node => node.title == "logoImage")[0].file.url

    const isBrowser = () => typeof window !== "undefined"
    const path = isBrowser() && window.location.pathname;
    const pageName = props.path ? props.path : ""

    return (
        <Div100vh>
            <div className={wrapper}>
                <header className={header}>
                    <nav>
                        <div className={ulWrapper}>
                            <ul className={top}>
                                <li key="contact"><Link to="/contact">Contact</Link></li>
                                <li key="logo" className={pageName == "/" ? animatedLogo : logo}><Link to="/">
                                    {
                                        logoFile.contentType == "video/mp4" ?
                                            <video muted autoPlay loop webkit-playsinline="true" playsInline poster={logoImg}>
                                                <source src={logoFile.url} type="video/mp4" />
                                            </video>
                                            :
                                            <img src={logoFile.url} alt="logo" />
                                    }
                                </Link></li>
                                <li key="about"><Link to="/about">About</Link></li>
                            </ul>
                        </div>
                    </nav>
                </header>

                <main>
                    {props.children}
                </main>

                <footer className={footer}>
                    <ul className={bottom}>
                        <li key="archive"><Link to="/workAll">Archive</Link></li>
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