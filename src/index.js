import './style.css';

const div = document.createElement('div');
div.id = 'root';
document.body.appendChild(div);

async function fetchApi(searchTerm) {
  const fetchCoordinates = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=ba447610937f7d0cb764ec8662d02a38`, { mode: 'cors' });
  const fCoord = await fetchCoordinates.json();
  const { lat, lon } = fCoord[0];

  const fetchWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=ba447610937f7d0cb764ec8662d02a38`, { mode: 'cors' });

  const fetchGif = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=rpbWQ0CSEoOJ4QMjk94L3bhXndUqX44E&s=${searchTerm}`, { mode: 'cors' });

  const respArray = await Promise.all([fetchGif, fetchWeather]);

  const [gResp, wResp] = respArray;

  const gObj = await gResp.json();
  const wObj = await wResp.json();

  return [gObj, wObj];
}

fetchApi('tokyo').then((data) => data.forEach(((prop) => {
  console.log(prop);
})));
