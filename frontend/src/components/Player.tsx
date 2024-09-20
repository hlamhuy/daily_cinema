import ReactPlayer from 'react-player';
import { PlayerProps } from '../types';

const Player = (props: PlayerProps) => {
  return (
    <div>
      {props.source}
      <div className='videoplayer'>
        <ReactPlayer
          url='../2036.Nexus.Dawn.2017.1080p.BluRay.DD2.0.x264-decibeL.mkv'
          controls={true}
          volume={1}
          muted={false}
          width='25%'
          height='25%'
        />
      </div>
    </div>
  );
};

export default Player;
