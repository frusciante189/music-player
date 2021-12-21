import React, { useState, useContext, useRef, createContext } from "react";
import data from "../Components/SongData";

const newContext = createContext({});

const Context = ({ children }) => {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [mute, setMute] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animatePercentage: 0,
    volume: 0,
  });

  const audioRef = useRef(null);
  const ref = useRef(null);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animatePercentage: animation,
      volume: e.target.volume,
    });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((activeSong) => {
      if (activeSong.id === nextPrev.id) {
        return {
          ...activeSong,
          active: true,
        };
      } else {
        return {
          ...activeSong,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  return (
    <newContext.Provider
      value={{
        songs,
        setSongs,
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        songInfo,
        setSongInfo,
        audioRef,
        isLibraryOpen,
        setIsLibraryOpen,
        ref,
        activeLibraryHandler,
        mute,
        setMute,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
      ></audio>
    </newContext.Provider>
  );
};
export function useToggle() {
  return useContext(newContext);
}

export default Context;
