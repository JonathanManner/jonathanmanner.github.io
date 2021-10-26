// complete data from lisö (59 lat 18 lon)
// https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18/lat/59/data.json
// complete data from Falun (60 lat 15lon)
// https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/15/lat/60/data.json
//windDataHolder["timeSeries"][0]["parameters"]["13"]["values"]["0"] === wind direction(degrees)
//windDataHolder["timeSeries"][0]["parameters"]["10"]["values"]["0"] === temperature(celcius)
//windDataHolder["timeSeries"][0]["parameters"]["14"]["values"]["0"] === wind speed (m/s)
//windDataHolder["timeSeries"][0]["parameters"]["11"]["values"]["0"] === air pressure (hPa)


const lisoRequestBtn = document.getElementById("liso-wind-btn");
const falunRequestBtn = document.getElementById("falun-wind-btn");
const windDirOutput = document.getElementById("json-output-1");
const windSpeedOutput = document.getElementById("json-output-2");
const tempOutput = document.getElementById("json-output-3");
const airPressureOutput = document.getElementById("json-output-4");
const WindDirFalun = document.getElementById("json-output-5");
const WindSpeedFalun = document.getElementById("json-output-6");
const TempFalun = document.getElementById("json-output-7");
const airPressureFalun = document.getElementById("json-output-8");
const fetchSpinner = document.getElementById("fetch-spinner");
const lisoWindArrow = document.getElementById("lisoArrowAnim");
const falunWindArrow = document.getElementById("falunArrowAnim");
const lisoUrl = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18/lat/59/data.json";
const falunUrl = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/15/lat/60/data.json";

let isStarted = false;
// const latestForecastRoot = '${tempWeatherData["timeSeries"][0]["parameters"]';

const animateArrow = (location, formattedWeatherData) => {
  //add +90 to wind degrees to compensate for animation :)
  //and add 180 degrees to point the arrow to where the wind blows. Not to where it comes from.
  if (location === 'liso') {
  lisoWindArrow.style.transform = `rotate(${
    formattedWeatherData["wd"]["values"][0] + 270
  }deg)`;
  lisoWindArrow.style.visibility = "visible";
  } else if (location === 'falun') {

    // -->TODO<-- Refactor weatherData to show correct data.
    // -->TODO<-- make sure the arrow works for FALUN

    falunWindArrow.style.transform = `rotate(${
      formattedWeatherData["wd"]["values"][0] + 270
    }deg)`;
    falunWindArrow.style.visibility = "visible";
  }
};

const formatData = (data) => {
  const weatherObject = {};
  for(let i = 0; i < data.length; i++) {
    weatherObject[data[i].name] = data[i];
  }
  return weatherObject;
}

const throttleReqest = () => {
  isStarted = true;
  setTimeout(() => {
    isStarted = false;
  }, 2000); //Mitigate unnecessary requests.
};

const renderResponse = (location, latestForecastParameters) => {
  if (location === 'liso') {
  windDirOutput.innerHTML = `Wind direction: ${latestForecastParameters["wd"]["values"][0]} degrees.`;
  windSpeedOutput.innerHTML = `Wind speed: ${latestForecastParameters["ws"]["values"][0]} m/s.`;
  tempOutput.innerHTML = `Outdoor temperature: ${latestForecastParameters["t"]["values"][0]} degrees.`;
  airPressureOutput.innerHTML = `Air pressure: ${latestForecastParameters["msl"]["values"][0]} hPa`;
  } else if (location === 'falun') {
  WindDirFalun.innerHTML = `Wind direction: ${latestForecastParameters["wd"]["values"][0]} degrees.`;
  WindSpeedFalun.innerHTML = `Wind speed: ${latestForecastParameters["ws"]["values"][0]} m/s.`;
  TempFalun.innerHTML = `Outdoor temperature: ${latestForecastParameters["t"]["values"][0]} degrees.`;
  airPressureFalun.innerHTML = `Air pressure: ${latestForecastParameters["msl"]["values"][0]} hPa`;
  }
};

// let formattedWeatherData;

// Fetch weather data from SMHI
const fetchData = async (url, location) => {
  if (isStarted) {
    return;
  } else if (isStarted === false) {
    throttleReqest();
    // if the request takes longer than 80ms, show a spinner, otherwise, don't.
    let time = setTimeout(() => {
      fetchSpinner.style.visibility = "visible";
      apiOutputOne.innerHTML = "Loading...";
      apiOutputTwo.innerHTML = " ";
    }, 80);
    try {
      const response = await fetch(url);
      if (response.ok) {
        tempWeatherData = await response.json(); //extract JSON from the http response
        const formattedWeatherData = formatData(tempWeatherData["timeSeries"][0]["parameters"]);
        renderResponse(location, formattedWeatherData);
        animateArrow(location, formattedWeatherData);
        clearTimeout(time);
        fetchSpinner.style.visibility = "hidden";
      }
    } catch (error) {
      console.log(error);
    }
  }
};

let lisoBtnClick = lisoRequestBtn.addEventListener("click", () => {
  return fetchData(lisoUrl, 'liso');
});

let falunBtnClick = falunRequestBtn.addEventListener("click", () => {
  return fetchData(falunUrl, 'falun');
});
