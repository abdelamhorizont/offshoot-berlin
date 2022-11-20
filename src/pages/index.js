import React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { CookieNotice } from "gatsby-cookie-notice";

import Layout from '../components/layout/layout'
// import Work from '../components/work/work'
import ProjectList from '../components/projectList/projectList'

import '../styles/reset.scss'
import '../styles/global.scss'
import '../styles/typo.module.scss'
import '../styles/cookies.module.scss'

export default function Home({ location }) {
  const data = useStaticQuery(graphql`
  query {
    allContentfulAsset(filter: {title: {eq: "background"}}) {
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

  const [mobile, setMobile] = React.useState()

  React.useEffect(() => {
    const isBrowser = () => typeof window !== "undefined"
    setMobile(isBrowser() && window.screen.width < 720)
  }, []);


  const background = data.allContentfulAsset.nodes[0]

  return (
    <div>
      <Layout path={location.pathname}>
        <ProjectList />

        {background &&
          <div className={!mobile ? "background" : "mobile-background"}>
            <video muted autoPlay loop webkit-playsinline="true" playsInline>
              <source src={background.file.url} type="video/mp4" />
            </video>
          </div>
        }

        <div className="cookies" style={{ position: "fixed", bottom: "8vh", display: "inline-flex", justifyContent: "center" }}>
          <CookieNotice
            personalizeButtonClasses={"my-btn-classes"}
            personalizeButtonText={"I want to choose my cookies !"}
            acceptButtonText={"OK"}
            declineButton={false}
            personalizeButtonEnable={false}
            cookies={[
              { name: 'necessary', editable: false, default: true, title: 'Essentiel', text: 'Essential cookies are necessary for the proper functioning of the site. The site cannot function properly without them.' },
              // { name: 'gatsby-gdpr-google-analytics', editable: true, default: true, title: 'Google Analytics', text: 'Google Analytics is a statistical tool of Google allowing to measure the audience of the website.' }
            ]}>
            {/* <h4>This websites uses cookies.</h4> */}
            <p>This website uses essential cookies</p>
          </CookieNotice>
        </div>
      </Layout>
    </div>
  )
}
