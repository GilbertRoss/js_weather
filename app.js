window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(lat);
            console.log(long);
            const locApi = 'https://api.opencagedata.com/geocode/v1/json?key=0436b9cf8d8f43b2b380a8475454752d&q=' + lat + '%2C+' + long + '&pretty=1&no_annotations=1';
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = proxy + "https://api.darksky.net/forecast/37c53c277cfd91db0496877661bf2e87/" + lat + "," + long + "?units=auto&lang=it";
            //console.log(api);
            console.log(locApi)

            fetch(locApi)
                .then(loc_response => {
                    return loc_response.json();
                })
                .then(loc => {
                    console.log(loc);
                    const lo = loc.results;
                    const { components } = lo[0];
                    const { city, country } = components;
                    console.log(components);
                    locationTimezone.textContent = country + '/' + city;

                });

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    //set Icons
                    setIcons(icon, document.querySelector('.icon'));


                });

        });


    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});