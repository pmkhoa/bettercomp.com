'use client';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const VideoPlayer = ({ src = '', className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const fadeInVideo = () => {
    if (videoRef && videoRef.current) {
      const elmt = videoRef.current;
      gsap.to(elmt, {
        scrollTrigger: elmt,
        autoAlpha: 1,
        duration: 1,
        delay: 0.3,
      });
    }
  };

  const triggerVideoPlay = () => {
    const video = videoRef.current;
    if (video) {
      gsap.timeline({
        scrollTrigger: {
          // Markers: { startColor: 'green', endColor: 'red', fontSize: '12px' },
          trigger: video,
          scrub: true,
          start: 'top 70%',
          end: 'bottom 0%',
          onToggle: ({ isActive }) => {
            if (isActive) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    // Console.log('play safely');
                  })
                  .catch((error) => {
                    console.log(error);
                    // Console.log(error);
                    // Auto-play was prevented
                    // Show paused UI.
                  });
              }
            } else {
              video.pause();
            }
          },
        },
        ease: 'none',
      });
    }
  };

  useEffect(() => {
    triggerVideoPlay();
    fadeInVideo();
  }, []);

  return (
    <div className={`${className} absolute w-full h-full left-0 items-center flex`}>
      <video
        ref={videoRef}
        muted
        autoPlay
        loop
        playsInline
        controls={false}
        style={{ opacity: 0 }}
        className="object-cover w-full h-full"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
