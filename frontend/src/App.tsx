import VideoPlayer from './components/Player';

const App = () => {
  const getFormattedDate = (): string => {
    const date = new Date();
    const year = String(date.getFullYear()).slice(-2); // Last 2 digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const videoUrl = `../${getFormattedDate()}.mp4`;
  const subUrl = `../${getFormattedDate()}.en.vtt`;

  return (
    <div>
      <VideoPlayer videoUrl={videoUrl} subUrl={subUrl}></VideoPlayer>
    </div>
  );
};

export default App;
