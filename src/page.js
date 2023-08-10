const main = document.querySelector("main");

const home = () => {
  function callServer(city) {
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
        display.innerText = `${tempData.current.temp_f}\xB0 Fahrenheit, ${tempData.current.temp_c}\xB0 Celsius in ${tempData.location.name}, ${tempData.location.region}, ${tempData.location.country}`;
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
    newContainer.classList = "holder";
    const cityInput = document.createElement("input");
    const searchBtn = document.createElement("button");
    const searchForm = document.createElement("form");
    searchForm.method = "#";
    searchForm.action = "#";
    searchBtn.innerText = "Search";
    cityInput.type = "search";
    const newDisplay = document.createElement("p");

    searchForm.appendChild(cityInput);
    searchForm.appendChild(searchBtn);
    newContainer.appendChild(searchForm);
    newContainer.appendChild(newDisplay);
    main.appendChild(newContainer);

    searchBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let citySelect = "";
      if (cityInput.value.match(/^[a-zA-Z ]*$/)) {
        citySelect = cityInput.value;
        callServer(citySelect);
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
