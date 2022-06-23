import React from 'react';
import './App.css';


function Gif({fetchedObject}) {
  // paramater should be an object sent by giphy api
return (
  <div id='gifDiv'>
      <img alt='the gif that was loaded' src={fetchedObject.data.images.original.url}/>
    </div>
  )
}


function App() {
  const [searchTerm, setSearchTerm] = React.useState('tokyo');
  const [response, setResponse] = React.useState(() => {
    fetchApi().then(result => setResponse(result))
  })
  
  React.useEffect(() => {
    console.log('effect', response)
    
  }, [response])

  function submitHandler(e) {
    e.preventDefault();
    fetchApi().then(result => setResponse(result));
  }

  return (
    <div className="App">
      <h1>Hey ho</h1>
      <form onSubmit={submitHandler}>
        <input id='text' type='text' onChange={(e) => setSearchTerm(e.target.value)}/>
        <input id='sbtn' type='submit' />
      </form>
      {response ? <Gif fetchedObject={response}/> : null}
    </div>
  );
  
async function fetchApi() {    
  const giphyApi = `https://api.giphy.com/v1/gifs/translate?api_key=rpbWQ0CSEoOJ4QMjk94L3bhXndUqX44E&s=${searchTerm}`;

  const geoCodingApi = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=ba447610937f7d0cb764ec8662d02a38`;

  // const currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=ba447610937f7d0cb764ec8662d02a38`

  const fetchCoordinates = await fetch(geoCodingApi, {mode: 'cors'});
  const fCoordJson = await fetchCoordinates.json();
  console.log(fCoordJson[0])
  // have to use the coordinates here to get the actual weather data
  
  const fetchResponse = await fetch(giphyApi, {mode: 'cors'});
  const responseJson = await fetchResponse.json();
  return responseJson;
}
}

export default App;
