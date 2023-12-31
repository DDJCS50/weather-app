import tempType from "./log";

const main = document.querySelector("main");

const home = () => {
  function callServer(city, type) {
    const display = document.querySelector("p");
    const myKey = "bc3ae431310649bdaf2155956230508";
    async function getTemp() {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${myKey}&q=${city}`,
          { mode: "cors" }
        );
        const tempData = await response.json();
        console.log(tempData);
        if (type === "c") {
          display.innerText = `${tempData.current.temp_c}\xB0 Celsius in ${tempData.location.name}, ${tempData.location.region}, ${tempData.location.country}`;
        } else {
          display.innerText = `${tempData.current.temp_f}\xB0 Fahrenheit in ${tempData.location.name}, ${tempData.location.region}, ${tempData.location.country}`;
        }
        if (tempData.current.temp_f > 70) {
          main.style.backgroundColor = "coral";
        } else {
          main.style.backgroundColor = "darkcyan";
        }
      } catch (error) {
        display.innerText = "Location Not Found";
        console.log(error);
      }
    }

    getTemp();
  }

  function makePage() {
    const newContainer = document.createElement("div");
    const promptUser = document.createElement("h3");
    promptUser.innerText = "Enter a City Location here:";
    newContainer.classList = "holder";
    const cityInput = document.createElement("input");
    cityInput.placeholder = "City";
    const tempDropdown = document.createElement("select");
    const optionF = document.createElement("option");
    optionF.value = "Fahrenheit";
    optionF.innerText = "Fahrenheit";
    const optionC = document.createElement("option");
    optionC.value = "Celsius";
    optionC.innerText = "Celsius";
    const searchBtn = document.createElement("button");
    const searchForm = document.createElement("form");
    searchForm.method = "#";
    searchForm.action = "#";
    searchBtn.innerText = "Search";
    cityInput.type = "search";
    const newDisplay = document.createElement("p");

    tempDropdown.appendChild(optionC);
    tempDropdown.appendChild(optionF);
    searchForm.appendChild(tempDropdown);
    searchForm.appendChild(cityInput);
    searchForm.appendChild(searchBtn);
    newContainer.appendChild(promptUser);
    newContainer.appendChild(searchForm);
    newContainer.appendChild(newDisplay);
    main.appendChild(newContainer);

    searchBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let citySelect = "";
      if (cityInput.value.match(/^[a-zA-Z ]*$/)) {
        citySelect = cityInput.value;
        callServer(citySelect, tempType(tempDropdown.value));
      }
    });
  }

  return {
    callServer,
    makePage,
  };
};
const homeModule = home();
export default homeModule;
