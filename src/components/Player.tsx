import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
import "./Player.css";


const Player = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState<string[]>([]);
  const { videosurls } = useStateContext();

  useEffect(() => {

    async function fetchVideos() {
      try {
        const promises = videosurls.map(async (url: { src: string; }) => {
          const response = await axios.get(url.src, { responseType: 'blob' });
          const blob = response.data;
  
          // Store the video data in the cache
          caches.open('video-cache').then(cache => cache.put(url.src, new Response(blob)));
  
          // Create a URL for the video data
          const videoBlobUrl = URL.createObjectURL(blob);
          return videoBlobUrl;
        });
  
        const videos = await Promise.all(promises);
        setVideos(videos);
      } catch (error) {
        console.error(error);
      }
    }
  
    videosurls.forEach((url: { src: string; }) => {
      // Check if the video data is already in the cache
      caches.match(url.src).then(response => {
        if (response) {
          response.blob().then(blob => {
            const videoBlobUrl = URL.createObjectURL(blob);
            setVideos(videos => [...videos, videoBlobUrl]);
          });
        } else {
          fetchVideos();
        }
      });
    });
  }, [videosurls]);

  const handleEnded = () => {
    setCurrentVideoIndex(currentIndex => {
      if (currentIndex + 1 < videos.length) {
        return currentIndex + 1;
      }
      return 0;
    });
  };

  return (
    <div>
      {videos.length > 0 && (
        <video src={videos[currentVideoIndex]} autoPlay onEnded={handleEnded}/>
      )}
      {!videos.length && <p>cargando videos...</p>}
    </div>
  );
}

export default Player;
