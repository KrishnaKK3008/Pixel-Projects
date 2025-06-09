let countryList = [];
async function fetchCountries() {
  try {
    let res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,currencies,flag"
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await res.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
}

// fetchCountries();
async function options() {
  const fromSelect = document.getElementById("from");
  const toSelect = document.getElementById("to");
  const countryList = await fetchCountries();
  if (countryList) {
    countryList.forEach((country) => {
      let option = document.createElement("option");
      option.value = Object.keys(country.currencies)[0];
      option.innerText = `${Object.keys(country.currencies)[0]}-${
        country.currencies?.[Object.keys(country.currencies)[0]]?.name
      }`;
      fromSelect.appendChild(option);
    });
    countryList.forEach((country) => {
      let option = document.createElement("option");
      option.value = Object.keys(country.currencies)[0];
      option.innerText = `${Object.keys(country.currencies)[0]}-${
        country.currencies?.[Object.keys(country.currencies)[0]]?.name
      }`;
      toSelect.appendChild(option);
    });
  }
}

options();

const button = document.getElementById("convert");
button.addEventListener("click", async function () {
  const fromValue = document.getElementById("from").value;
  const toValue = document.getElementById("to").value;
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/c136442d8c076c8b14471a70/latest/${fromValue}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    let convRate = data["conversion_rates"][toValue];
    let amount = document.getElementById("amount").value;
    let convertedAmount = amount * convRate;
    if (isNaN(convertedAmount)) {
      throw new Error("Invalid amount entered");
    }
    let result = document.getElementById("result");
    result.innerText = `${amount} ${fromValue} = ${convertedAmount.toFixed(
      2
    )} ${toValue}`;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    let result = document.getElementById("result");
    result.innerText = "Error: " + error.message;
    result.style.color = "red";
    return null;
  }
});