const isGeolocationSupported = "geolocation" in window.navigator;

const getCurrentUsersLocationData = () => {
  if (!isGeolocationSupported) throw new Error("Geolocation API not supported");
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (error) => reject(error)
    );
  });
};

const getWeatherData = async (lat, long) => {
  const URL = `https://api.weatherapi.com/v1/current.json?key=65262a815b944d44ac8164121232610&q=${lat},${long}&aqi=no`;

  const rawResponse = await fetch(URL);
  const finalResult = await rawResponse.json();

  return finalResult;
};

const init = async () => {
  try {
    const locationData = await getCurrentUsersLocationData();
    const weatherData = await getWeatherData(
      locationData.latitude,
      locationData.longitude
    );
    const p = document.getElementById("result");
    console.log("weatherData", weatherData);
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

init();
