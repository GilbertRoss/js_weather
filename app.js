window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let day1 = document.querySelector('.day1');
    let day2 = document.querySelector('.day2');
    let day3 = document.querySelector('.day3');
    let day4 = document.querySelector('.day4');
    let timeArray = [];
    let iconArray = [];



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const locApi = 'https://api.opencagedata.com/geocode/v1/json?key=0436b9cf8d8f43b2b380a8475454752d&q=' + lat + '%2C+' + long + '&pretty=1&no_annotations=1';
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = proxy + "https://api.darksky.net/forecast/37c53c277cfd91db0496877661bf2e87/" + lat + "," + long + "?units=auto&lang=it";



            fetch(locApi)
                .then(loc_response => {
                    return loc_response.json();
                })
                .then(loc => {
                    const lo = loc.results;
                    const { components } = lo[0];
                    const { city } = components;
                    locationTimezone.textContent = city;

                });

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(list => {
                    const { temperature, summary, icon } = list.currently;
                    const { data } = list.daily;
                    for (let i = 1; i < data.length; i++) {
                        const { time } = data[i];
                        const { icon } = data[i];

                        timeArray.push(timeConverter(time));
                        iconArray.push(icon);
                    }

                    //Set date forecast
                    console.log(timeArray);
                    day1.textContent = timeArray[0];
                    day2.textContent = timeArray[1];
                    day3.textContent = timeArray[2];
                    day4.textContent = timeArray[3];
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    //set Icon
                    setIcons(icon, document.querySelector('.icon'));
                    //set forecastIcons
                    setIcons(iconArray[0], document.querySelector('.icon1'));
                    setIcons(iconArray[1], document.querySelector('.icon2'));
                    setIcons(iconArray[2], document.querySelector('.icon3'));
                    setIcons(iconArray[3], document.querySelector('.icon4'));



                });

        });


    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function timeConverter(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);
        let month = a.getMonth() + 1;
        let date = a.getDate();

        let time = date + '/' + month;
        return time;
    }
});