import * as React from "react"
import { useState, useRef, useEffect } from "react";

import { graphql } from 'gatsby'

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ReactPlayer from 'react-player/vimeo'
import parse, { domToReact, attributesToProps } from 'html-react-parser';

import Layout from '../components/layout/layout'
import WorkTitle from '../components/workTitle/workTitle'
// import Work from '../components/work/work'
import ProjectList from '../components/projectList/projectList'

import { project, text, player, controls, controlsContainer, playerContainer, projectText, projectTeam } from '../styles/project.module.scss'

import PlayIcon from '../assets/play.svg';
import PauseIcon from '../assets/pause.svg';
import MuteIcon from '../assets/mute.svg';
import UnmuteIcon from '../assets/unmute.svg';
import FullScreenIcon from '../assets/fullScreen.svg';
import ExitFullScreenIcon from '../assets/exitFullScreen.svg';

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

function randomNumber(min, max) { // min and max included
  return (
    Math.floor(Math.random() * (max - min + 1) + min)
  )
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
  const [mouseMoved, setMouseMoved] = useState(false)
  const handle = useFullScreenHandle();

  useEffect(() => {
    window.addEventListener("keydown", handlePauseKey)
  }, [handlePauseKey]);

  // useEffect(() => {
  //   window.addEventListener("keydown", handleFullScreenKey)
  // }, [handleFullScreenKey]);

  useEffect(() => {
    window.addEventListener("keydown", handleFullScreenExitKey)
    handle.active ? setFullScreen(true) : setFullScreen(false)
  }, [handleFullScreenExitKey]);

  function handleMouseMove() {
    setMouseMoved(true)
    setTimeout(() => setMouseMoved(false), 4000);
  }

  function handlePauseKey(e) {
    if (played > 0 && e.code.includes("Space")) {
      setPaused(!paused)
    }
  }

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

  function handleProgress() {
    setPlayed(videoPlayer.current.getCurrentTime())
    // setPlayed(obj.playedSeconds)
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

  function handleFullScreen() {
    handle.enter()
    setFullScreen(true)
  }

  function fullScreenSwitch() {
    setFullScreen(!fullScreen)
  }

  function handleFullScreenKey(e) {
    if (e.code.includes("KeyF")) {
      handle.enter()
      setFullScreen(true)
    }
  }

  function handleFullScreenExit() {
    handle.exit()
    setFullScreen(false)
  }

  function handleFullScreenExitKey(e) {
    if (e.code.includes("Escape")) {
      setFullScreen(false)
    }
  }



  const isBrowser = () => typeof window !== "undefined"
  var path = isBrowser() && window.location.pathname;

  const mobile = isBrowser() && window.screen.width > 620 ? true : false
  const macBook = isBrowser() && window.screen.width > 920 ? true : false
  const fullhd = isBrowser() && window.screen.width > 1700 ? true : false
  const monitor = isBrowser() && window.screen.width > 2000 ? true : false

  const [index, setIndex] = useState(0)
  // const [marginClient, setMarginClient] = useState([])  
  // const index = 0  
  useEffect(() => {
    setIndex(document.getElementsByTagName("table") && document.getElementsByTagName("table")[0].children[1].children.length)
  }, [])

  const marginClient = React.useMemo(() => [...Array(100)].map(() => randomNumber(1, 10)), [])
  const marginMobile = React.useMemo(() => [...Array(100)].map(() => randomNumber(0, 30)), [])

  return (
    <Layout>
      {/* <div className={project} > */}
      <div className={project} style={{ cursor: fullScreen && mouseMoved ? "auto" : fullScreen ? "none" : "auto" }}>
        {
          videoSrc.includes('vimeo') ?
            <div className={player} onMouseMove={handleMouseMove}>
              <FullScreen handle={handle}>
                <div className={playerContainer} onClick={() => setPaused(!paused)} key="1" >
                  {/* <div className={playerContainer} onClick={(e) => console.log("works")} key="1" style={{height: fullScreen ? "100vh" : "100%" }}> */}
                  <ReactPlayer
                    config={{
                      vimeo: {
                        responsive: "true"
                      }
                    }}
                    ref={videoPlayer}
                    url={videoSrc}
                    controls="false"
                    playing={paused}
                    volume={volume}
                    onDuration={handleDuration}
                    onProgress={() => setInterval(handleProgress(), 1)}
                    onEnded={() => {
                      videoPlayer.current.seekTo(0)
                      handlePlayerPause()
                    }}
                    style={{cursor: mouseMoved ? "auto" : "none"}}
                    width="100%"
                    height={fullScreen ? "100vh" : monitor ? "82vh" : fullhd ? "78vh" : macBook ? "71vh" : mobile ? "50vh" : "25vh"}
                  />
                  <button onClick={() => setPaused(!paused)} style={{ opacity: paused ? "0" : "1" }}> <PlayIcon /> </button>
                </div>

                <div className={controlsContainer} onMouseEnter={handleMouseMove} style={{ position: fullScreen ? "absolute" : "relative", bottom: fullScreen && "0", opacity: fullScreen && mouseMoved ? "1" : fullScreen ? "0" : "1" }}>
                  <div className={controls} style={{ width: fullScreen ? "100vw" : "calc(100vw - 2rem)" }}>
                    <button onClick={handlePlayerPlay} style={{ display: paused ? "none" : "inline" }}> <PlayIcon /> </button>
                    <button onClick={handlePlayerPause} style={{ display: !paused ? "none" : "inline" }}> <PauseIcon /></button>

                    <p>{format(Math.round(played))} / {format(duration)}</p>

                    <input
                      type='range' min={0} max={0.999999} step='0.00001'
                      value={played / duration}
                      onMouseDown={handleSeekMouseDown}
                      onChange={handleSeekChange}
                      onMouseUp={handleSeekMouseUp}
                    />

                    <button onClick={() => handleVolume(0)} style={{ display: volume == 1 ? "inline" : "none" }}><UnmuteIcon /></button>
                    <button onClick={() => handleVolume(1)} style={{ display: volume == 0 ? "inline" : "none" }}><MuteIcon /></button>

                    <button onClick={handleFullScreen} style={{ display: fullScreen ? "none" : "inline" }}><FullScreenIcon /></button>
                    <button onClick={handleFullScreenExit} style={{ display: !fullScreen ? "none" : "inline" }}><ExitFullScreenIcon /></button>
                  </div>
                  <WorkTitle marg={false} path={data.contentfulProject} />
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
          <div className={projectTeam}>
            {data.contentfulProject.team && data.contentfulProject.team.childMarkdownRemark.html &&
              parse(data.contentfulProject.team.childMarkdownRemark.html, {
                replace: (domNode) => {
                  if (domNode.name && domNode.name.includes("tr")) {
                    return (
                      <tr>
                        <td>{domNode.children[1].children[0] && domNode.children[1].children[0].data}</td>
                        {/* <td style={{ paddingLeft: marginClient[domNode.parent.children.indexOf(domNode)] + "vw"  }}>{domNode.children[3].children[0] && domNode.children[3].children[0].data}</td> */}
                        <td style={{ paddingLeft: !mobile ? marginMobile[domNode.parent.children.indexOf(domNode)] + "vw" : marginClient[domNode.parent.children.indexOf(domNode)] + "vw" }}>{domNode.children[3].children[0] && domNode.children[3].children[0].data}</td>
                      </tr>
                    )
                  }
                }
              })
            }
          </div>

          {/* <div dangerouslySetInnerHTML={{ __html: data.contentfulProject.team && data.contentfulProject.team.childMarkdownRemark.html }} /> */}
          <div className={projectText} dangerouslySetInnerHTML={{ __html: data.contentfulProject.text && data.contentfulProject.text.childMarkdownRemark.html }} />

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