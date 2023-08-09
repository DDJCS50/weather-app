const main = document.querySelector("main");

const home = () => {
  const newContainer = document.createElement("div");
  const cityInput = document.createElement("input");
  const searchBtn = document.createElement("button");
  searchBtn.innerText = "Search";
  cityInput.type = "text";
  const newDisplay = document.createElement("p");

  newContainer.appendChild(cityInput);
  newContainer.appendChild(searchBtn);
  newContainer.appendChild(newDisplay);
  main.appendChild(newContainer);

  function callServer(city) {
    const display = document.querySelector("p");
    const myKey = "bc3ae431310649bdaf2155956230508";
    async function getTemp() {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${myKey}&q=${city}`,
        { mode: "cors" }
      );
      const tempData = await response.json();
      console.log(tempData);
      display.innerText = `${tempData.current.temp_f} Degrees Fahrenheit in ${tempData.location.name}, ${tempData.location.region}, ${tempData.location.country}`;
    }

    getTemp();
  }

  searchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    let citySelect = "";
    if (cityInput.value.match(/^[a-zA-Z ]*$/)) {
      citySelect = cityInput.value;
      callServer(citySelect);
    }
  });

  return {
    callServer,
  };
};
export default home;
