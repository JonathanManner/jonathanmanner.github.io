// complete data from lisö (59 lat 18 lon)
// https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18/lat/59/data.json
//
//windDataHolder["timeSeries"][0]["parameters"]["13"]["values"]["0"] === wind direction(degrees)
//windDataHolder["timeSeries"][0]["parameters"]["10"]["values"]["0"] === temperature(celcius)
//windDataHolder["timeSeries"][0]["parameters"]["14"]["values"]["0"] === wind speed (m/s)
//windDataHolder["timeSeries"][0]["parameters"]["11"]["values"]["0"] === air pressure (hPa)

const requestBtn = document.getElementById("current-wind-btn");
const apiOutputOne = document.getElementById("json-output-1");
const apiOutputTwo = document.getElementById("json-output-2");
const fetchSpinner = document.getElementById("fetch-spinner");
const windArrow = document.getElementById("arrowAnim");
let windDataHolder;
// TODO <-- Remove when going live.
// fetchSpinner.style.visibility = "visible";
const animateArrow = () => {
    //add +90 to wind degrees to compensate for animation :)
    //and add 180 degrees to point the arrow to where the wind blows. Not to where it comes from.
    windArrow.style.transform = `rotate(${windDataHolder["timeSeries"][0]["parameters"]["13"]["values"]["0"] + 270}deg)`;
    windArrow.style.visibility = "visible";
}

// Fetch weather data from SMHI
const fetchData = async () => {
  // if the request takes longer than 80ms, show a spinner, otherwise, don't.
  let time = setTimeout(() => {
    fetchSpinner.style.visibility = "visible";
    apiOutput.innerHTML = "Loading...";
  }, 80);
  const response = await fetch(
    "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18/lat/59/data.json"
  );
  windDataHolder = await response.json(); //extract JSON from the http response
  apiOutputOne.innerHTML = `Wind direction: ${windDataHolder["timeSeries"][0]["parameters"]["13"]["values"]["0"]} degrees at ${windDataHolder["timeSeries"][0]["parameters"]["14"]["values"]["0"]} m/s`;
  apiOutputTwo.innerHTML = `Outdoor temperature: ${windDataHolder["timeSeries"][0]["parameters"]["10"]["values"]["0"]} degrees. Air pressure: ${windDataHolder["timeSeries"][0]["parameters"]["11"]["values"]["0"]} hPa`;
  animateArrow();
  clearTimeout(time);
  fetchSpinner.style.visibility = "hidden";
};

let btnClick = requestBtn.addEventListener("click", fetchData);
