import React from "react";
import Title from "./Title";

const Video = () => {
  return (
    <div className="my-8 block">
      {/* Phần tiêu đề */}
      <div className="text-center text-4xl mb-5 text-black">
        <Title title1="About" title2="OdinClub" />
      </div>

      {/* Phần video */}
      <div className="flex justify-center">
        <iframe
          className="w-full h-[400px] md:w-[60%] md:h-[600px] rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/13q4FVmqXXE?si=yUCynY2Olww97uIC"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
