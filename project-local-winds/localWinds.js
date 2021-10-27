// wd = wind direction(degrees)
// t = temperature(celcius)
// ws = wind speed (m/s)
// msl = air pressure (hPa)

const lisoOutput = document.getElementById("liso-output");
const falunOutput = document.getElementById("falun-output");
const savsjoOutput = document.getElementById("savsjo-output");
const fetchSpinner = document.getElementById("fetch-spinner");
const lisoWindArrow = document.getElementById("lisoArrowAnim");
const falunWindArrow = document.getElementById("falunArrowAnim");
const savsjoWindArrow = document.getElementById("savsjoArrowAnim");
const lisoUrl = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/17.45/lat/58.55/data.json";
const falunUrl = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/15.37/lat/60.36/data.json";
const savsjoUrl = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/14.39/lat/57.24/data.json";

const animateArrow = (location, formattedWeatherData) => {
  //add +90 to wind degrees to compensate for animation :)
  //and add 180 degrees to point the arrow to where the wind blows. Not to where it comes from.
  if (location === 'liso') {
  lisoWindArrow.style.transform = `rotate(${
    formattedWeatherData["wd"]["values"][0] + 270
  }deg)`;
  lisoWindArrow.style.visibility = "visible";
  } else if (location === 'falun') {
    falunWindArrow.style.transform = `rotate(${
      formattedWeatherData["wd"]["values"][0] + 270
    }deg)`;
    falunWindArrow.style.visibility = "visible";
  } else if (location === 'savsjo') {
    savsjoWindArrow.style.transform = `rotate(${
      formattedWeatherData["wd"]["values"][0] + 270
    }deg)`;
    savsjoWindArrow.style.visibility = "visible";
  }
};

const formatData = (data) => {
  const weatherObject = {};
  for(let i = 0; i < data.length; i++) {
    weatherObject[data[i].name] = data[i];
  }
  return weatherObject;
}

const renderResponse = (location, latestForecastParameters) => {
  if (location === 'liso') {
    lisoOutput.innerHTML = `
      <p> Wind direction: ${latestForecastParameters["wd"]["values"][0]} degrees. </p>
      <p> Wind speed: ${latestForecastParameters["ws"]["values"][0]} m/s. </p>
      <p> Outdoor temperature: ${latestForecastParameters["t"]["values"][0]} degrees. </p>
      <p> Air pressure: ${latestForecastParameters["msl"]["values"][0]} hPa </p>
      `;
  } else if (location === 'falun') {
    falunOutput.innerHTML = `
      <p> Wind direction: ${latestForecastParameters["wd"]["values"][0]} degrees. </p>
      <p> Wind speed: ${latestForecastParameters["ws"]["values"][0]} m/s. </p>
      <p> Outdoor temperature: ${latestForecastParameters["t"]["values"][0]} degrees. </p>
      <p> Air pressure: ${latestForecastParameters["msl"]["values"][0]} hPa </p>
      `;
  } else if (location === 'savsjo') {
    savsjoOutput.innerHTML = `
    <p> Wind direction: ${latestForecastParameters["wd"]["values"][0]} degrees. </p>
    <p> Wind speed: ${latestForecastParameters["ws"]["values"][0]} m/s. </p>
    <p> Outdoor temperature: ${latestForecastParameters["t"]["values"][0]} degrees. </p>
    <p> Air pressure: ${latestForecastParameters["msl"]["values"][0]} hPa </p>
    `;
  }
};

// Fetch weather data from SMHI
const fetchData = async (url, location) => {
    // if the request takes longer than 80ms, show a spinner, otherwise, don't.
    let time = setTimeout(() => {
      fetchSpinner.style.visibility = "visible";
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
};

fetchData(lisoUrl, 'liso');
fetchData(falunUrl, 'falun');
fetchData(savsjoUrl, 'savsjo');