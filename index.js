const iconPath = "./weather-icons/" 
let lastClass;

function getDateFormat(mainDate) {
    let month = mainDate.getMonth();
    if(month < 9) {
        month += 1;
        month = '0' + month
    } else {
        month += 1;
    }
    let day = mainDate.getDate();
    if(day <= 9) {
        day = '0' + day
    }
    let year = mainDate.getFullYear();
    let finalFormat = year + '-' + month + '-' + day;
    return finalFormat;
}

function dayNameFromDate(dateString) {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let newDate = new Date(dateString);
    return weekday[newDate.getDay()];
}


async function getWeatherData(requestString) { // returns response.days 
    let response = await fetch(requestString)    
    if(response.status == 200) {
        let weatherDays = await response.json();
        return weatherDays;
    }
    if(response.status === 400) {
        throw new Error("Something wrong happened");
    }
    if(response.status === 401) {
        throw new Error("Not authorised for this type of request. Sorry!");
    }
    if(response.status === 404) {
        throw new Error("Wow, you got a 404 error, impressive!");
    }
    if(response.status === 429) {
        throw new Error("Unfortunately, my account exceeded the assigned limit.");
    }
    if(response.status === 500) {
        throw new Error("Internal server error.");
    }
}

const launchApiCall = document.getElementById("load-weather")

let currentArray = [];

const locationInput = document.getElementById("location-input")
const myForm = document.getElementById("my-form")

launchApiCall.addEventListener("click", () => {
    if(locationInput.validity) {
        displaySpinner();
        container.classList.add("blur")
        let currentDate = new Date();
        let lastDate =  new Date(new Date().getTime()+(6*24*60*60*1000));
        let request = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
        let location = document.getElementById("location-input").value;
        location = location.replace(/\s+/g, '%20')
        location = location.replace("^[,]", '%2C')
        let requestString = request + location + '/' + getDateFormat(currentDate) + '/' + getDateFormat(lastDate) + "?unitGroup=metric&key=T9CSJA4PGGK33YTJKDPRJR82D"
        getWeatherData(requestString)
        .then((res) => {
            console.log(res);
            
            currentArray = res.days;
            lastClass = currentArray[0].icon;
            clearWeatherLayout();
            createWeatherLayout();
            document.getElementById("address").textContent = res.resolvedAddress
            document.getElementById("temperature-date").textContent = getDateFormat(currentDate);
            document.getElementById("temperature-hour").textContent = res.currentConditions.datetime;
            document.getElementById("current-temperature").textContent = res.currentConditions.temp + "°C";
            for(let i = 0; i < 7; i++) {
                if(i != 0) {
                    getTitleOfId(i).textContent = dayNameFromDate(currentArray[i].datetime).substring(0, 3);
                }
                getMessageOfId(i).textContent = currentArray[i].conditions;
                getImageOfId(i).src = iconPath + currentArray[i].icon + ".svg";
            }
            container.classList.remove("blur")
            stopSpinner();
        })
        .catch((error) => {
            alert(error + "\n" + "Be sure to check for typos and make sure you're typing a real location.")
            document.getElementById("location-input").value = '';
            container.classList.remove("blur")
            stopSpinner(); 
        })
    }
})

function getTitleOfId(id) {
    const element = document.getElementById(id)
    return element.querySelector(".title")
}

function getMessageOfId(id) {
    const element = document.getElementById(id)
    return element.querySelector(".message")
}

function getImageOfId(id) {
    const element = document.getElementById(id)
    return element.querySelector("img")
}

function dayDetailsForId(id) {
    const dayDisplay = document.getElementById("day-display")
    const min = document.getElementById("min")
    const max = document.getElementById("max")
    const sunrise = document.getElementById("sunrise")
    const sunset = document.getElementById("sunset");
    const dayDescription = document.getElementById("day-description")
    dayDisplay.classList.remove(lastClass);
    min.textContent = currentArray[id].tempmin + "°C";
    max.textContent = currentArray[id].tempmax + "°C";
    sunrise.textContent = currentArray[id].sunrise;
    sunset.textContent = currentArray[id].sunset;
    dayDescription.textContent = currentArray[id].description;
    let currentClass = currentArray[id].icon;
    lastClass = currentClass;
    dayDisplay.classList.add(currentClass);
}


// T9CSJA4PGGK33YTJKDPRJR82D
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=T9CSJA4PGGK33YTJKDPRJR82D
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2020-10-01/2020-12-31?key=YOUR_API_KEY 

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/last30days?key=YOUR_API_KEY&include=days&elements=tempmax,tempmin,temp

// get current date
// API call for interval [date, date+7]
// add each day to array of week days
// add day data for each day

// Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.
                                                                                                            // /date1/date2?
// getWeatherData("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/bistrita/2024-09-23/2024-09-29?unitGroup=metric&key=T9CSJA4PGGK33YTJKDPRJR82D")


// Set up a form that will let users input their location and will fetch the weather info (still just console.log() it).
// Display the information on your webpage!
// Add any styling you like!
// Optional: add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API. Use DevTools to test for low-end devices.
// Push that baby to github and share your solution below!


// Layout part

const container = document.getElementById("container")
const clearDayPath = "./weather-icons/partly-cloudy-day.svg" 

let lastCardClicked;

function clearWeatherLayout() {
    const container = document.getElementById("container")
    while(container.children.length > 1) {
        container.removeChild(container.lastChild);
    }
}

function createWeatherLayout() {
    const weatherBody = document.createElement("div")
    weatherBody.id = "weather-body";
    weatherBody.classList.add("weather-container")
    container.appendChild(weatherBody);

    const dayContainer = document.createElement("div")
    dayContainer.classList.add("day-container")
    container.appendChild(dayContainer);
    
    const addressHolderCard = document.createElement("div")
    addressHolderCard.id = "address-holder"
    const resolvedAddress = document.createElement("h2")
    resolvedAddress.id = "address"
    resolvedAddress.textContent = "Address name will be here"
    addressHolderCard.appendChild(resolvedAddress)

    const header = document.createElement("div")
    header.id = "day-header"
    header.appendChild(addressHolderCard)

    const temperatureHolder = document.createElement("div")
    temperatureHolder.id = "temperature-holder"

    const temperature = document.createElement("p")
    temperature.id = "current-temperature";
    temperature.textContent = "32°C"

    const tempDate = document.createElement("p")
    tempDate.id = "temperature-date"
    tempDate.textContent = "Monday, 30-09-2024"
    temperatureHolder.appendChild(tempDate);
    const tempHour = document.createElement("p")
    tempHour.id = "temperature-hour"
    tempHour.textContent = "19:30"
    temperatureHolder.appendChild(tempHour);
    temperatureHolder.appendChild(temperature);

    header.appendChild(temperatureHolder)

    dayContainer.appendChild(header)

    const dayDisplay = document.createElement("div")
    dayDisplay.id = "day-display";
    dayContainer.appendChild(dayDisplay)
    
    const tempMin = document.createElement("p")
    tempMin.id = "min"
    tempMin.classList.add("temperature")
    tempMin.textContent = "15°C"
    const tempMax = document.createElement("p")
    tempMax.id = "max"
    tempMax.classList.add("temperature")
    tempMax.textContent = "32°C"
    const minMaxHolder = document.createElement("div")
    const minLabel = document.createElement("p")
    const maxLabel = document.createElement("p")
    minLabel.textContent = "min temp."
    maxLabel.textContent = "max temp."
    minMaxHolder.id = "minmax-holder"
    minMaxHolder.appendChild(minLabel)
    minMaxHolder.appendChild(tempMin)
    minMaxHolder.appendChild(maxLabel)
    minMaxHolder.appendChild(tempMax)

    dayDisplay.appendChild(minMaxHolder);

    const setRiseHolder = document.createElement("div")
    setRiseHolder.id = "sunset-sunrise-holder"
    const sunRiseLabel = document.createElement("p")
    sunRiseLabel.textContent = "sunrise hour"
    const sunSetLabel = document.createElement("p")
    sunSetLabel.textContent = "sunset hour"
    const sunsetHour = document.createElement("p")
    sunsetHour.id = "sunset"
    const sunriseHour = document.createElement("p")
    sunriseHour.id = "sunrise"
    sunriseHour.textContent = "06:32"
    sunriseHour.classList.add("hour")
    sunsetHour.textContent = "18:44"
    sunsetHour.classList.add("hour")
    setRiseHolder.appendChild(sunRiseLabel)
    setRiseHolder.appendChild(sunriseHour)
    setRiseHolder.appendChild(sunSetLabel)
    setRiseHolder.appendChild(sunsetHour)

    dayDisplay.appendChild(setRiseHolder);


    const message = document.createElement("p")
    message.textContent = "Cloudy skies throughout the day with a chance of rain or snow throughout the day.";
    message.id = "day-description"
    dayDisplay.appendChild(message);

    for(let i=0;i<7;i++) {
        const weatherButton = document.createElement("div")
        weatherButton.classList.add("weather-button")
        const title = document.createElement("h4")
        title.classList.add("title")
        title.textContent = "title"
        weatherButton.appendChild(title)
        const coloredDiv = document.createElement("img")
        coloredDiv.src = clearDayPath;
        coloredDiv.classList.add("colored-div");
        weatherButton.appendChild(coloredDiv);
        const paragraph = document.createElement("p")
        paragraph.textContent = "This is the actual message"
        paragraph.classList.add("message")
        paragraph.classList.add("hidden")
        weatherButton.appendChild(paragraph)
        if(i === 0) {
            lastCardClicked = weatherButton;
            weatherButton.id = "0"
            
            weatherButton.classList.add(currentArray[weatherButton.id].icon)
            weatherButton.classList.add("left")

                weatherBody.style.setProperty('grid-template-columns', '2fr 1fr 1fr 1fr 1fr 1fr 1fr')
                weatherButton.classList.add("weather-button-selected")
                weatherButton.classList.remove("weather-button")
                let img = weatherButton.querySelector(".colored-div")
                makeImageBigger(img);
                showTitleAndMessage(weatherButton);
                dayDetailsForId(weatherButton.id);

            weatherButton.addEventListener("click", () => {
                if(weatherButton.classList.contains("weather-button")) {
                    makeImageSmaller();
                    lastCardClicked = weatherButton;
                    hideTitleAndMessage();
                    weatherBody.style.setProperty('grid-template-columns', '2fr 1fr 1fr 1fr 1fr 1fr 1fr')
                    setTimeout(() => {
                        eraseSelected();
                        weatherButton.classList.add("weather-button-selected")
                        weatherButton.classList.remove("weather-button")
                        let img = weatherButton.querySelector(".colored-div")
                        makeImageBigger(img);
                        showTitleAndMessage(weatherButton);
                    }, 200);
                    dayDetailsForId(weatherButton.id);
                }
            })
        }
        if(i === 1) {
            weatherButton.id = "1"

            weatherButton.classList.add(currentArray[weatherButton.id].icon)
            weatherButton.addEventListener("click", () => {
                if(weatherButton.classList.contains("weather-button")) {
                    makeImageSmaller();
                    lastCardClicked = weatherButton;
                    hideTitleAndMessage();
                    weatherBody.style.setProperty('grid-template-columns', '1fr 2fr 1fr 1fr 1fr 1fr 1fr')
                    setTimeout(() => {
                        eraseSelected();
                        weatherButton.classList.add("weather-button-selected")
                        weatherButton.classList.remove("weather-button")
                        let img = weatherButton.querySelector(".colored-div")
                        makeImageBigger(img);
                        showTitleAndMessage(weatherButton);
                    }, 200);
                    dayDetailsForId(weatherButton.id);
                }
            })
        }
        if(i === 2) {
            weatherButton.id = "2"

            weatherButton.classList.add(currentArray[weatherButton.id].icon)
            weatherButton.addEventListener("click", () => {
                if(weatherButton.classList.contains("weather-button")) {
                    makeImageSmaller();
                    lastCardClicked = weatherButton;
                    hideTitleAndMessage();
                    weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 2fr 1fr 1fr 1fr 1fr')
                    setTimeout(() => {
                        eraseSelected();
                        weatherButton.classList.add("weather-button-selected")
                        weatherButton.classList.remove("weather-button")
                        let img = weatherButton.querySelector(".colored-div")
                        makeImageBigger(img);
                        showTitleAndMessage(weatherButton);
                    }, 200);
                    dayDetailsForId(weatherButton.id);
                }
            })
        }
        if(i === 3) {
            weatherButton.id = "3"

            weatherButton.classList.add(currentArray[weatherButton.id].icon)
            weatherButton.addEventListener("click", () => {
                if(weatherButton.classList.contains("weather-button")) {
                    makeImageSmaller();
                    lastCardClicked = weatherButton;
                    hideTitleAndMessage();
                    weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 1fr 2fr 1fr 1fr 1fr')
                    setTimeout(() => {
                        eraseSelected();
                        weatherButton.classList.add("weather-button-selected")
                        weatherButton.classList.remove("weather-button")
                        let img = weatherButton.querySelector(".colored-div")
                        makeImageBigger(img);
                        showTitleAndMessage(weatherButton);
                    }, 200);
                    dayDetailsForId(weatherButton.id);
                }
            })
        }
        if(i === 4) {
            weatherButton.id = "4"

            weatherButton.classList.add(currentArray[weatherButton.id].icon)
            weatherButton.addEventListener("click", () => {
                if(weatherButton.classList.contains("weather-button")) {
                    makeImageSmaller();
                    lastCardClicked = weatherButton;
                    hideTitleAndMessage();
                    weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 1fr 1fr 2fr 1fr 1fr')
                    setTimeout(() => {
                        eraseSelected();
                        weatherButton.classList.add("weather-button-selected")
                        weatherButton.classList.remove("weather-button")
                        let img = weatherButton.querySelector(".colored-div")
                        makeImageBigger(img);
                        showTitleAndMessage(weatherButton);
                    }, 200);
                    dayDetailsForId(weatherButton.id);
                }
            })
        }
        if(i === 5) {
            weatherButton.id = "5"

            weatherButton.classList.add(currentArray[weatherButton.id].icon)
            weatherButton.addEventListener("click", () => {
                if(weatherButton.classList.contains("weather-button")) {
                    makeImageSmaller();
                    lastCardClicked = weatherButton;
                    hideTitleAndMessage();
                    weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 1fr 1fr 1fr 2fr 1fr')
                    setTimeout(() => {
                        eraseSelected();
                        weatherButton.classList.add("weather-button-selected")
                        weatherButton.classList.remove("weather-button")
                        let img = weatherButton.querySelector(".colored-div")
                        makeImageBigger(img);
                        showTitleAndMessage(weatherButton);
                    }, 200);
                    dayDetailsForId(weatherButton.id);
                }
            })
        }
        if(i === 6) {
            weatherButton.id = "6"

            weatherButton.classList.add(currentArray[weatherButton.id].icon)
            weatherButton.classList.add("right")
            weatherButton.addEventListener("click", () => {
                if(weatherButton.classList.contains("weather-button")) {
                    makeImageSmaller();
                    lastCardClicked = weatherButton;
                    hideTitleAndMessage();
                    weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 1fr 1fr 1fr 1fr 2fr')
                    setTimeout(() => {
                        eraseSelected();
                        weatherButton.classList.add("weather-button-selected")
                        weatherButton.classList.remove("weather-button")
                        let img = weatherButton.querySelector(".colored-div")
                        makeImageBigger(img);
                        showTitleAndMessage(weatherButton);
                    }, 200);
                    dayDetailsForId(weatherButton.id);
                }
            })
        }
        weatherBody.appendChild(weatherButton)
    }
}

function eraseSelected() {
    const weatherBody = document.getElementById("weather-body")
    let buttons = Array.from(weatherBody.children)
    buttons.forEach(element => {
    });
}

function hideTitleAndMessage() {
    const weatherBody = document.getElementById("weather-body")
    let buttons = Array.from(weatherBody.children)
    buttons.forEach(element => {
        element.classList.remove("weather-button-selected")
        element.classList.add("weather-button")
        const selectedDayTitle = element.querySelector(".title")
        const selectedDayMessage = element.querySelector(".message")
        selectedDayTitle.textContent = selectedDayTitle.textContent.substring(0, 3);
        selectedDayMessage.classList.add("hidden");
        if(element.querySelector("colored-div-bigger")) {
            let myButton = element.querySelector("colored-div-bigger")
            myButton.classList.add("colored-div")
            myButton.classList.remove("colored-div-bigger")
        }
    });
}

function makeImageBigger(img) {
    img.classList.remove("colored-div")
    img.classList.add("colored-div-bigger")
}

function makeImageSmaller() {
    let img = lastCardClicked.querySelector(".colored-div-bigger")
    img.classList.remove("colored-div-bigger")
    img.classList.add("colored-div")
}


function showTitleAndMessage(weatherButton) {
    const selectedDayTitle = weatherButton.querySelector(".title")
    const selectedDayMessage = weatherButton.querySelector(".message")
    selectedDayMessage.classList.remove("hidden");
    selectedDayTitle.textContent = dayNameFromDate(currentArray[weatherButton.id].datetime)
}

function displaySpinner() {
    let modal = document.getElementById("modal")
    modal.style.display = "flex";
    // setTimeout(() => {
    //     stopSpinner();
    // }, 3000);
}

function stopSpinner() {
    let modal = document.getElementById("modal")
    modal.style.display = "none";
}
