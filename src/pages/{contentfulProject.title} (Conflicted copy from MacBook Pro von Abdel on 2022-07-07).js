import * as React from "react"
import { useState, useRef, useCallback } from "react";

import { graphql } from 'gatsby'

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ReactPlayer from 'react-player/vimeo'

import Layout from '../components/layout/layout'
import WorkTitle from '../components/workTitle/workTitle'
// import Work from '../components/work/work'
import ProjectList from '../components/projectList/projectList'

import { project, text, player, controls } from '../styles/project.module.scss'

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

function format(seconds) {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}

function pad(string) {
  return ('0' + string).slice(-2)
}

const Post = ({ data }) => {

  const videoSrc = videoUrl(data.contentfulProject.videoUrl)
  const [paused, setPaused] = useState(false)
  const [volume, setVolume] = useState(1)
  const [duration, setDuration] = useState(0)
  const [played, setPlayed] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const videoPlayer = useRef(null);
  const [fullScreen, setFullScreen] = useState(false)
  const handle = useFullScreenHandle();

  function handlePlayerPause() {
    setPaused(false)
  }

  function handlePlayerPlay() {
    setPaused(true)
  }

  function handleVolume(vol) {
    setVolume(vol)
  }

  function handleDuration(duration) {
    setDuration(duration)
  }

  function handleProgress(obj) {
    setPlayed(obj.playedSeconds)
  }

  function handleSeekChange(e) {
    setPlayed(parseFloat(e.target.value) * duration)
  }

  function handleSeekMouseDown() {
    setSeeking(true)
  }

  function handleSeekMouseUp(e) {
    setSeeking(false)
    videoPlayer.current.seekTo(parseFloat(e.target.value))
  }

  function handleFullScreen(){
    handle.enter() 
    setFullScreen(true)
  }

  function handleFullScreenExit(){
    handle.exit() 
    setFullScreen(false)
  }

  return (
    <Layout>
      <div className={project}>
        <WorkTitle marg={false} path={data.contentfulProject} />

        {
          videoSrc.includes('vimeo') ?
            <div className={player}>
              <FullScreen handle={handle}>
                <ReactPlayer
                  ref={videoPlayer}
                  url={videoSrc}
                  controls="false"
                  playing={paused}
                  volume={volume}
                  onDuration={handleDuration}
                  onProgress={handleProgress}
                  width="100%"
                  height="87vh"
                />
                <div className={controls}>
                  <button onClick={handlePlayerPlay} style={{display: paused? "none" : "inline"}}>play</button>
                  <button onClick={handlePlayerPause} style={{display: !paused? "none" : "inline"}}>pause</button>

                  <p>{format(Math.round(played))} / {format(duration)}</p>

                  <input
                    type='range' min={0} max={0.999999} step='any'
                    value={played / duration}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                  />

                  <button onClick={() => handleVolume(0)} style={{display: volume==1? "inline" : "none"}}>mute</button>
                  <button onClick={() => handleVolume(1)} style={{display: volume==0? "inline" : "none"}}>unmute</button>

                  <button onClick={handleFullScreen} style={{display: fullScreen? "none" : "inline"}}>fullScreen</button>
                  <button onClick={handleFullScreenExit} style={{display: !fullScreen? "none" : "inline"}}>exit fullScreen</button>
                </div>
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