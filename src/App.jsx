import Exam from './components/Exam';
import SplashScreen from './components/SplashScreen';
import { useState } from 'react';
import './App.css';
import yellowBlob from './assets/svg/blobs-yellow.png'
import blueBlob from './assets/svg/blobs-blue.png'


function App() {

  const [showScreen, setShowScreen] = useState(true);




  return (
    <div className="App">
      <img src={yellowBlob} className="blobs-yellow" alt="" />
      <div className="main">
        {showScreen ? < SplashScreen setShowScreen={setShowScreen} /> : <Exam setShowScreen={setShowScreen} />}
      </div>
      <img src={blueBlob} className="blobs-blue" alt="" />
    </div >
  );
}

export default App;

