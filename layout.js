const container = document.getElementById("container")

function createWeatherLayout() {
    const weatherBody = document.createElement("div")
    weatherBody.id = "weather-body";
    weatherBody.classList.add("weather-container")
    for(let i=0;i<7;i++) {
        const weatherButton = document.createElement("div")
        weatherButton.classList.add("weather-button")
        const title = document.createElement("h4")
        title.classList.add("title")
        weatherButton.appendChild(title)
        const paragraph = document.createElement("p")
        paragraph.classList.add("message")
        weatherButton.appendChild(paragraph)
        if(i === 0) {
            weatherButton.classList.add("left")
            weatherButton.addEventListener("click", () => {
                eraseSelected();
                weatherButton.classList.add("selected")
                weatherBody.style.setProperty('grid-template-columns', '2fr 1fr 1fr 1fr 1fr 1fr 1fr')
            })
        }
        if(i === 1) {
            weatherButton.addEventListener("click", () => {
                eraseSelected();
                weatherButton.classList.add("selected")
                weatherBody.style.setProperty('grid-template-columns', '1fr 2fr 1fr 1fr 1fr 1fr 1fr')
            })
        }
        if(i === 2) {
            weatherButton.addEventListener("click", () => {
                eraseSelected();
                weatherButton.classList.add("selected")
                weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 2fr 1fr 1fr 1fr 1fr')
            })
        }
        if(i === 3) {
            weatherButton.id = "current-day"
            weatherButton.addEventListener("click", () => {
                eraseSelected();
                weatherButton.classList.add("selected")
                weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 1fr 2fr 1fr 1fr 1fr')
            })
        }
        if(i === 4) {
            weatherButton.addEventListener("click", () => {
                eraseSelected();
                weatherButton.classList.add("selected")
                weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 1fr 1fr 2fr 1fr 1fr')
            })
        }
        if(i === 5) {
            weatherButton.addEventListener("click", () => {
                eraseSelected();
                weatherButton.classList.add("selected")
                weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 1fr 1fr 1fr 2fr 1fr')
            })
        }
        if(i === 6) {
            weatherButton.addEventListener("click", () => {
                eraseSelected();
                weatherButton.classList.add("selected")
                weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 1fr 1fr 1fr 1fr 2fr')
            })
        }
        weatherBody.appendChild(weatherButton)
    }

    container.appendChild(weatherBody);
}

createWeatherLayout();

function eraseSelected() {
    const weatherBody = document.getElementById("weather-body")
    let buttons = Array.from(weatherBody.children)
    buttons.forEach(element => {
        element.classList.remove("selected")
    });
}