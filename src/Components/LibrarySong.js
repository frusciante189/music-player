import React from "react";
import { useToggle } from "../Provider/Context";

const LibrarySong = ({ song, id }) => {
  const { setCurrentSong, audioRef, isPlaying, setIsPlaying, songs, setSongs } =
    useToggle();

  const songSelectHandler = async () => {
    await setCurrentSong(song);

    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);

    if (isPlaying) {
      audioRef.current.play();
    } else {
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  return (
    <div
      className={`py-5 flex items-center justify-start hover:bg-pink-200 rounded-tr-lg rounded-br-lg pl-4 space-y-2 cursor-pointer transition-colors transform duration-400  anim ${
        song.active ? "bg-pink-400" : ""
      } text-slate-700 `}
      onClick={songSelectHandler}
    >
      <img src={song.cover} className="w-1/5 rounded-full" alt={song.name} />
      <div className="pl-4">
        <h2 className="font-medium text-lg pb-1">{song.name}</h2>
        <h3>{song.artist}</h3>
      </div>
    </div>
  );
};

export default LibrarySong;
