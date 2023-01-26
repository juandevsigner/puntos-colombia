import React, { useRef, useState } from 'react';

const Player = () => {
  const [currentVideo, setCurrentVideo] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);



  const videos = [
    { src: 'https://j4pro.com/upload/eco/video1.mp4', id: 1 },
    { src: 'https://j4pro.com/upload/eco/video2.mp4', id: 2 },
    { src: 'https://j4pro.com/upload/eco/video3.mp4', id: 3 },
  ];

  const handleEnded = () => {
    if (currentVideo === videos.length) {
      //setCurrentVideo(1);
      window.location.reload();
      //videoRef.current && videoRef.current.play();
    } else {
      setCurrentVideo(currentVideo + 1);
    }
  };

  return (
    <div>
      {videos.map((video) => (
        <video
          ref={videoRef}
          key={video.id}
          src={video.src}
          onEnded={handleEnded}
          autoPlay={video.id === currentVideo}
          style={{ display: video.id === currentVideo ? 'block' : 'none' }}
        />
      ))}
    </div>
  );
}

export default Player;
