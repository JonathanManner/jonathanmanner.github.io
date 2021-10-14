// complete data from lisö (59 lat 18 lon)
// https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18/lat/59/data.json
//
//windDataHolder["timeSeries"][0]["parameters"]["3"]

const requestBtn = document.getElementById("current-wind-btn");
const apiOutput = document.getElementById("json-output");
const fetchSpinner = document.getElementById("fetch-spinner");
let windDataHolder;
// TODO <-- Remove when going live.
// fetchSpinner.style.visibility = "visible";

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
  apiOutput.innerHTML = `Wind direction(degrees): ${windDataHolder["timeSeries"][0]["parameters"]["3"]["values"]["0"]}`;
  clearTimeout(time);
  fetchSpinner.style.visibility = "hidden";
};

let btnClick = requestBtn.addEventListener("click", fetchData);