import { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { PlayerProps } from '../types';
import Player from 'video.js/dist/types/player';

const VideoPlayer = (props: PlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    // Initialize the Video.js player if it hasn't been initialized already
    if (!playerRef.current && videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        fluid: true,
        preload: 'auto',
        textTrackSettings: false,
        controlBar: {
          pictureInPictureToggle: false,
        },
      });
    }

    // Cleanup when the component unmounts
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoRef} className='video-js'>
          <source src={props.videoUrl} type='video/mp4' />
          <track
            kind='subtitles'
            src={props.subUrl}
            srcLang='en'
            label='english'
            default
          />
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
