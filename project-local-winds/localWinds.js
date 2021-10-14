// complete data from lisö (59 lat 18 lon)
// https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18/lat/59/data.json
//
//windDataHolder["timeSeries"][0]["parameters"]["13"]["values"]["0"] === wind direction(degrees)
//windDataHolder["timeSeries"][0]["parameters"]["10"]["values"]["0"] === temperature(celcius)
//windDataHolder["timeSeries"][0]["parameters"]["14"]["values"]["0"] === wind speed (m/s)
//windDataHolder["timeSeries"][0]["parameters"]["11"]["values"]["0"] === air pressure (hPa)

const requestBtn = document.getElementById("current-wind-btn");
const apiOutputWindDir = document.getElementById("json-output-1");
const apiOutputWindSpeed = document.getElementById("json-output-2");
const apiOutputTemp = document.getElementById("json-output-3");
const apiOutputAirPressure = document.getElementById("json-output-4");
const fetchSpinner = document.getElementById("fetch-spinner");
const windArrow = document.getElementById("arrowAnim");
let windDataHolder;
let isStarted = false;
// TODO <-- Remove when going live.
// fetchSpinner.style.visibility = "visible";
const animateArrow = () => {
  //add +90 to wind degrees to compensate for animation :)
  //and add 180 degrees to point the arrow to where the wind blows. Not to where it comes from.
  windArrow.style.transform = `rotate(${
    windDataHolder["timeSeries"][0]["parameters"]["13"]["values"]["0"] + 270
  }deg)`;
  windArrow.style.visibility = "visible";
};

const throttleReqest = () => {
    isStarted = true;
    setTimeout(() => {
        isStarted = false;
    }, 36000); //How often the button can fetch from the API
};

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
    const response = await fetch(
      "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18/lat/59/data.json"
    );
    windDataHolder = await response.json(); //extract JSON from the http response
    apiOutputWindDir.innerHTML = `Wind direction: ${windDataHolder["timeSeries"][0]["parameters"]["13"]["values"]["0"]} degrees.`;
    apiOutputWindSpeed.innerHTML = `Wind speed: ${windDataHolder["timeSeries"][0]["parameters"]["14"]["values"]["0"]} m/s.`;
    apiOutputTemp.innerHTML = `Outdoor temperature: ${windDataHolder["timeSeries"][0]["parameters"]["10"]["values"]["0"]} degrees.`;
    apiOutputAirPressure.innerHTML = `Air pressure: ${windDataHolder["timeSeries"][0]["parameters"]["11"]["values"]["0"]} hPa`;
    animateArrow();
    clearTimeout(time);
    fetchSpinner.style.visibility = "hidden";
  } else {
      console.log('error');
  }
};

let btnClick = requestBtn.addEventListener("click", fetchData);
