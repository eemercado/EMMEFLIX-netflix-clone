import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";

const videoSources = [
  "/videos/batman3.mp4",
  "/videos/joker1.mp4",
  "/videos/joker2.mp4",
  "/videos/batman1.mp4",
  "/videos/joker3.mp4",
  "/videos/batman4.mp4",
  "/videos/joker4.mp4",
  "/videos/batman2.mp4",
];

const HomePage = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const nextVideoIndex = (currentVideoIndex + 1) % videoSources.length;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);


  const handleVideoEnd = () => {
    setCurrentVideoIndex(nextVideoIndex);
    // Swap videos
    if (videoRef.current && nextVideoRef.current) {
      videoRef.current.src = nextVideoRef.current.src;
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  useEffect(() => {
    // Preload the next video
    if (nextVideoRef.current) {
      nextVideoRef.current.src = videoSources[nextVideoIndex];
      nextVideoRef.current.load();
    }
  }, [nextVideoIndex]);

  return (
    <div style={{ height: '100vh', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: '100%' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '15%',
          backgroundImage: 'linear-gradient(to bottom, #000, transparent)',
          zIndex: 1,
        }} />
        
        <video
          ref={videoRef}
          autoPlay
          loop={false}
          muted
          onEnded={handleVideoEnd}
          style={{
            position: 'absolute',
            width: '100%',
            left: '50%',
            top: '50%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
          }}
        >
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
        </video>

        <video
          ref={nextVideoRef}
          style={{ display: 'none' }} // Hide the video element
        >
          <source src={videoSources[nextVideoIndex]} type="video/mp4" />
        </video>

  
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '15%',
          backgroundImage: 'linear-gradient(to top, #000, transparent)',
          zIndex: 1,
        }} />
      </div>
  
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '92%',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 2,
        marginTop: '12px'
      }}>
        <a href="https://github.com/eemercado/EMMEFLIX-netflix-clone/blob/main/README.md" style={{ color: 'white', textDecoration: 'none' }}>
          READ ME
        </a>
        <div> 
          <Link href="/auth">SIGN UP</Link>
          <span style={{ margin: '0 8px' }}></span>
          <Link href="/auth">LOGIN</Link>
        </div>
      </div>

  
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translateY(-50%)', 
        zIndex: 2,
      }}>
        <img src="/Mercado.png" alt="EmmeFlix" style={{ width: '80vw', height: 'auto' }} />
      </div>

      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: 0,
        right: 0,
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        gap: '24px', 
        marginBottom: '24px'
      }}>
        <a href="https://www.linkedin.com/in/emmanuel-jr-mercado-289b101a7/" className="text-2xl"> 
          <FaLinkedin />
        </a>
        <a href="https://github.com/eemercado" className="text-2xl"> 
          <FaGithub />
        </a>
        <a href="https://emmemercado.vercel.app/" className="text-2xl"> 
          <IoLogoVercel />
        </a>
      </div>
    </div>
  );
  
};

export default HomePage;
