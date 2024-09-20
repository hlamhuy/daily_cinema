import Player from './components/Player';

const App = () => {
  const str = 'Hello World!';

  return (
    <div>
      <Player source={str}></Player>
    </div>
  );
};

export default App;
