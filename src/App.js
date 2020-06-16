import React, { useState } from 'react';
import './App.css';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai'

const particlesOptions = require('./particle');

const app = new Clarifai.App({
  apiKey: '8d12c11d62e74cdc87611c86424f5b6d'
});

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);


  const calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = box => {
    setBox(box);
  }

  const onInputChange = e => {
    setInput(e.target.value);
  }

  const onButtonSubmit = () => {
    setImageUrl(input);

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        input)
      .then(response => displayFaceBox(calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <Particles className="particles"
        params={particlesOptions}
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home'
        ? <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition
            imageUrl={imageUrl}
            box={box}
          />
        </div>
        : (
          route === 'signin'
            ? <SignIn onRouteChange={onRouteChange} />
            : <Register onRouteChange={onRouteChange} />
        )
      }
    </div>
  );
}

export default App;
