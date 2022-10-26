import ReactPlayer from "react-player";

export const Publicity = () => {
  return (
    <div className="bg-green-100 flex-1 overflow-hidden">
      <ReactPlayer
        playing={true}
        url="https://www.youtube.com/embed/hyjO0Un20cc"
        width="100%"
        height="100%"
        loop={true}
        muted={true}
      />
    </div>
  );
};
