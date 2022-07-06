import * as React from "react"
import { useState, useRef, useCallback } from "react";

import { graphql } from 'gatsby'

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Vimeo from '@u-wave/react-vimeo';
import Player from '@vimeo/player';

import Layout from '../components/layout/layout'
import WorkTitle from '../components/workTitle/workTitle'
// import Work from '../components/work/work'
import ProjectList from '../components/projectList/projectList'

import { project, text } from '../styles/project.module.scss'

function videoUrl(url) {
  if (url.includes('youtu')) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    const id = (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    return "https://www.youtube-nocookie.com/embed/" + id + "?showinfo=0&rel=0&showinfo=0&autohide=1&modestbranding=1&controls=1"
  }

  if (url.includes('vimeo')) {
    const id = /vimeo.*\/(\d+)/i.exec(url);
    if (id) {
      return 'https://player.vimeo.com/video/' + id[1]
    }
  }
}

const Post = ({ data }) => {

  const videoSrc = videoUrl(data.contentfulProject.videoUrl)
  const [paused, setPaused] = useState(true)
  const [volume, setVolume] = useState(1)
  const [time, setTime] = useState(0)
  const videoPlayer = useRef();
  const handle = useFullScreenHandle();

  function handlePlayerPause() {
    setPaused(true)
  }

  function handlePlayerPlay() {
    setPaused(false)
    // const videoPlayer = document.getElementById("videoPlayer")
    console.log(videoPlayer)
  }

  function handleVolume(vol) {
    setVolume(vol)
  }

  function handelTime(e) {
    setTime(parseFloat(e.target.value))
    console.log(time)
  }

  // const player = new Player('handstick', {
  //   id: 562817173,
  //   // url: videoSrc,
  //   width: 640
  // });


  return (
    <Layout>
      <div className={project}>
        <WorkTitle marg={false} path={data.contentfulProject} />

        {
          videoSrc.includes('vimeo') ?
            <div>
              <FullScreen handle={handle}>
                <Vimeo
                  ref={videoPlayer}
                  start={time}
                  video={videoSrc}
                  paused={paused}
                  volume={volume}
                // onTimeUpdate={time}
                />
                {/* <button onClick={handlePlayerPlay}>play</button>
                <button onClick={handlePlayerPause}>pause</button>

                <button onClick={() => handleVolume(0)}>mute</button>
                <button onClick={() => handleVolume(1)}>unmute</button>

                <input
                  type="range"
                  value={time}
                  min={0}
                  max={10}
                  step={0.01}
                  onChange={handelTime}
                />

                <button onClick={handle.enter}>fullScreen</button>
                <button onClick={handle.exit}>exit fullScreen</button> */}
              </FullScreen>
            </div>
            :
            <iframe
              src={videoSrc}
              title="project"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
        }


        <div className={text}>
          <div dangerouslySetInnerHTML={{ __html: data.contentfulProject.team && data.contentfulProject.team.childMarkdownRemark.html }} />
          <div dangerouslySetInnerHTML={{ __html: data.contentfulProject.text && data.contentfulProject.text.childMarkdownRemark.html }} />
        </div>
      </div>
      {/* <Work /> */}
      <ProjectList />
    </Layout>
  )
}

export default Post


export const query = graphql`
query ($id: String) {
  contentfulProject(id: {eq: $id}) {
    id
    title
    year
    client
    videoUrl
    team {
      childMarkdownRemark {
        html
      }
    }
    text {
      childMarkdownRemark {
        html
      }
    }
  }
}
`