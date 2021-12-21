import {
  FaPlay,
  FaAngleLeft,
  FaAngleRight,
  FaPause,
  FaVolumeUp,
} from "react-icons/fa";
import { useToggle } from "../Provider/Context";

const Player = () => {
  const {
    isPlaying,
    setIsPlaying,
    songInfo,
    setSongInfo,
    audioRef,
    songs,
    currentSong,
    setCurrentSong,
    activeLibraryHandler,
  } = useToggle();

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);

        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animatePercentage}%)`,
  };

  const changeVolume = (e) => {
    let value = e.target.value;
    audioRef.current.volume = value;
    setSongInfo({ ...songInfo, volume: value });
  };

  return (
    // Player Container
    <div className="min-h-[20vh] flex flex-col items-center justify-between">
      {/* time control */}
      <div className="flex md:w-1/2 w-11/12 items-center">
        <span className="p-4 text-slate-700 dark:text-slate-200 select-none">
          {getTime(songInfo.currentTime)}
        </span>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
        >
          <input
            type="range"
            className="w-full focus:outline-none appearance-none bg-transparent cursor-pointer"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div className={`animate-track bg-slate-300`} style={trackAnim}></div>
        </div>
        <span className="p-4 text-slate-700 dark:text-slate-200 select-none">
          {songInfo.duration ? getTime(songInfo.duration) : "0:00"}
        </span>
      </div>
      {/* play control  */}
      <div className="flex lg:flex-row flex-col items-center md:w-1/2 w-3/5 p-4">
        <div className="flex justify-between items-center w-3/4">
          <FaAngleLeft
            size={24}
            className="cursor-pointer fill-slate-700 dark:fill-slate-200"
            onClick={() => skipTrackHandler("back")}
          />
          {isPlaying ? (
            <FaPause
              size={24}
              className="cursor-pointer fill-slate-700 dark:fill-slate-200"
              onClick={playSongHandler}
            />
          ) : (
            <FaPlay
              size={24}
              className="cursor-pointer fill-slate-700 dark:fill-slate-200"
              onClick={playSongHandler}
            />
          )}
          <FaAngleRight
            size={24}
            className="cursor-pointer fill-slate-700 dark:fill-slate-200"
            onClick={() => skipTrackHandler("forward")}
          />
        </div>
        <div className="w-1/4 flex items-center justify-center space-x-4 mt-10 lg:mt-0">
          <FaVolumeUp
            size={24}
            className="cursor-pointer fill-slate-700 dark:fill-slate-200"
          />
          <input
            type="range"
            max="1"
            min="0"
            step="0.01"
            className="volume focus:outline-none appearance-none bg-transparent cursor-pointer"
            value={songInfo.volume}
            onChange={changeVolume}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
