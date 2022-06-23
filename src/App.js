import React from 'react';
import './App.css';


function Gif({fetchedObject}) {
  // paramater should be an object sent by giphy api
  // i dont understand anymore maybe ill come back when i know more abt react and promises
  let obj; 
  fetchedObject.then(r => {
    obj = r.json
  });
  console.log(obj)
return (
  <div id='gifDiv'>
      <img alt='the gif that was loaded' />
    </div>
  )
}


function App() {
  const [searchTerm, setSearchTerm] = React.useState('tokyo');
  const [[wProm, gProm], setWpromGprom] = React.useState(() => {
    // no api fetch on page load to avoid exceeding the limit of the weather api
    // fetchApi().then(result => setResponse(result));
    return ''
  })
  
  React.useEffect(() => {
    console.log('effect', [wProm, gProm])
    
  }, [wProm, gProm])

  function submitHandler(e) {
    e.preventDefault();
    fetchApi().then(result => setWpromGprom(result));
  }

  return (
    <div className="App">
      <h1>Hey ho search:{searchTerm}</h1>
      <form onSubmit={submitHandler}>
        <input id='text' type='text' onChange={(e) => setSearchTerm(e.target.value)}/>
        <input id='sbtn' type='submit' />
      </form>
      {gProm ? <Gif fetchedObject={gProm}/> : null}
    </div>
  );
  
  async function fetchApi() {
    const fetchCoordinates = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=ba447610937f7d0cb764ec8662d02a38`, {mode: 'cors'});
    const fCoordJson = await fetchCoordinates.json();
    const {lat, lon} = fCoordJson[0];


    const fetchWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ba447610937f7d0cb764ec8662d02a38`, {mode: 'cors'});
    
    const fetchGif = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=rpbWQ0CSEoOJ4QMjk94L3bhXndUqX44E&s=${searchTerm}`, {mode: 'cors'});

    
    const allProm = await Promise.all([fetchWeather, fetchGif]);
    const  allPromArray = allProm.map(r => r.json())
    
    return allPromArray;      
  }
}

export default App;
