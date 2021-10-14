// complete data from lisö (59 lat 18 lon)
// https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18/lat/59/data.json
//
//windDataHolder["timeSeries"][0]["parameters"]["3"]

const requestBtn = document.getElementById("current-wind-btn");
const apiOutput = document.getElementById("json-output");
const fetchSpinner = document.getElementById("fetch-spinner");
const windArrow = document.getElementById("arrowAnim");
let windDataHolder;
// TODO <-- Remove when going live.
// fetchSpinner.style.visibility = "visible";
const animateArrow = () => {
    // windDataHolder["timeSeries"][0]["parameters"]["13"]["values"]["0"] += 90;
    windArrow.style.transform = `rotate(${windDataHolder["timeSeries"][0]["parameters"]["13"]["values"]["0"] + 90}deg)`;
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
  apiOutput.innerHTML = `Wind direction: ${windDataHolder["timeSeries"][0]["parameters"]["13"]["values"]["0"]} degrees at ${windDataHolder["timeSeries"][0]["parameters"]["14"]["values"]["0"]} m/s`;
  animateArrow();
  clearTimeout(time);
  fetchSpinner.style.visibility = "hidden";
};

let btnClick = requestBtn.addEventListener("click", fetchData);
