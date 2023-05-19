let lat;
let long;
let API_key = '23ed0618bce9cce7114923c8382c9a04';
let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimeZone = document.querySelector('.location-timezone');
let icon = document.getElementById('icon');
let degreeSection = document.querySelector('.degree-section');
let degreeSection_span = document.querySelector('.degree-section span');

if (navigator.geolocation) {
    navigator
        .geolocation
        .getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_key}`;
            console.log(api)

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    let temperature = data
                        .weather[0]
                        .description;
                    let summary = data.main.temp - 273.15;
                    let cityName = data.name;
                    let iconImg = "http://openweathermap.org/img/w/" + data
                        .weather[0]
                        .icon + ".png";

                    temperatureDescription.textContent = temperature;
                    temperatureDegree.textContent = summary.toFixed(2);
                    locationTimeZone.textContent = cityName;
                    icon.setAttribute("src", iconImg);
                    icon.setAttribure("width", 200);
                    icon.setAttribure("height", 200);
                    icon.setAttribure("alt", "날씨 아이콘");

                    degreeSection.addEventListener('click', () => {
                        if (degreeSection_span.textContent === "ºC") {
                            degreeSection_span.textContent = "ºF";
                            summary = (summary * 9 / 5) + 32;
                            temperatureDegree.textContent = summary.toFixed(3);
                        } else {
                            degreeSection_span.textContent = "ºC";
                            summary = (summary - 32) * 5 / 9;
                            temperatureDegree.textContent = summary.toFixed(2);
                        }
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        })
}