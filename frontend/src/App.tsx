import VideoPlayer from './components/Player';
import './styles/App.css';
const App = () => {
  const getFormattedDate = (): string => {
    const date = new Date();
    const year = String(date.getFullYear()).slice(-2); // Last 2 digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const videoUrl = `./${getFormattedDate()}.mp4`;
  const subUrl = `./${getFormattedDate()}.en.vtt`;

  return (
    <div className='app'>
      <div className='content'>
        <div className='player'>
          <div className='videoplayer'>
            <VideoPlayer videoUrl={videoUrl} subUrl={subUrl} />
          </div>
        </div>
        <video controls width='250'>
          <source src={videoUrl} type='video/mp4' />
        </video>
      </div>
      <div className='disclaimer'>
        <p>
          <b>Disclaimer:</b> This project is intended solely for educational
          purposes. All media displayed on this site is used in good faith for
          learning and demonstration. No copyright infringement is intended, and
          users are advised to comply with applicable copyright laws.
        </p>
      </div>
    </div>
  );
};

export default App;
