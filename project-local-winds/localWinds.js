// complete data from lisö (59 lat 18 lon)
// https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18/lat/59/data.json
//
//windDataHolder["timeSeries"][0]["parameters"]["13"]["values"]["0"] === wind direction(degrees)
//windDataHolder["timeSeries"][0]["parameters"]["10"]["values"]["0"] === temperature(celcius)
//windDataHolder["timeSeries"][0]["parameters"]["14"]["values"]["0"] === wind speed (m/s)
//windDataHolder["timeSeries"][0]["parameters"]["11"]["values"]["0"] === air pressure (hPa)


const requestBtn = document.getElementById("current-wind-btn");
const windDirOutput = document.getElementById("json-output-1");
const windSpeedOutput = document.getElementById("json-output-2");
const tempOutput = document.getElementById("json-output-3");
const airPressureOutput = document.getElementById("json-output-4");
const fetchSpinner = document.getElementById("fetch-spinner");
const windArrow = document.getElementById("arrowAnim");

let isStarted = false;
// const latestForecastRoot = '${tempWeatherData["timeSeries"][0]["parameters"]';

const animateArrow = () => {
  //add +90 to wind degrees to compensate for animation :)
  //and add 180 degrees to point the arrow to where the wind blows. Not to where it comes from.
  windArrow.style.transform = `rotate(${
    tempWeatherData["timeSeries"][0]["parameters"][3]["values"][0] + 270
  }deg)`;
  windArrow.style.visibility = "visible";
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

//a way to get correct value regardless of order?
// getCorrectValue('t');
// const getCorrectValue = (parameter) => {
//   let temperature = tempWeatherData["timeSeries"][0]["parameters"].filter(x => x.name.includes(parameter));
//   return temperature;
// }

const renderResponse = tempWeatherData => {
  windDirOutput.innerHTML = `Wind direction: ${formattedWeatherData["wd"]["values"][0]} degrees.`;
  windSpeedOutput.innerHTML = `Wind speed: ${formattedWeatherData["ws"]["values"][0]} m/s.`;
  tempOutput.innerHTML = `Outdoor temperature: ${formattedWeatherData["t"]["values"][0]} degrees.`;
  airPressureOutput.innerHTML = `Air pressure: ${formattedWeatherData["msl"]["values"][0]} hPa`;
};

let formattedWeatherData;

// Fetch weather data from SMHI
const fetchData = async () => {
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
      const response = await fetch(
        "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18/lat/59/data.json"
      );
      if (response.ok) {
        tempWeatherData = await response.json(); //extract JSON from the http response
        // console.log(tempWeatherData)
        formattedWeatherData = formatData(tempWeatherData["timeSeries"][0]["parameters"]);
        // console.log(formattedWeatherData);
        renderResponse(tempWeatherData);
        animateArrow();
        clearTimeout(time);
        fetchSpinner.style.visibility = "hidden";
      }
    } catch (error) {
      console.log(error);
    }
  }
};

let btnClick = requestBtn.addEventListener("click", fetchData);
