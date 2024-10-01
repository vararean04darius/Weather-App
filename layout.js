
// const container = document.getElementById("container")
// const clearDayPath = "./weather-icons/partly-cloudy-day.svg" 

// let lastCardClicked;

// function createWeatherLayout() {
//     const weatherBody = document.createElement("div")
//     weatherBody.id = "weather-body";
//     weatherBody.classList.add("weather-container")
//     for(let i=0;i<7;i++) {
//         const weatherButton = document.createElement("div")
//         weatherButton.classList.add("weather-button")
//         const title = document.createElement("h4")
//         title.classList.add("title")
//         title.classList.add("hidden")
//         title.textContent = "title"
//         weatherButton.appendChild(title)
//         const coloredDiv = document.createElement("img")
//         coloredDiv.src = clearDayPath;
//         coloredDiv.classList.add("colored-div");
//         weatherButton.appendChild(coloredDiv);
//         const paragraph = document.createElement("p")
//         paragraph.textContent = "This is the actual message"
//         paragraph.classList.add("message")
//         paragraph.classList.add("hidden")
//         weatherButton.appendChild(paragraph)
//         if(i === 0) {
//             lastCardClicked = weatherButton;
//             weatherButton.classList.add("thunderstorm")
//             weatherButton.id = "0"
//             weatherButton.classList.add("left")

//                 weatherBody.style.setProperty('grid-template-columns', '2fr 1fr 1fr 1fr 1fr 1fr 1fr')
//                 weatherButton.classList.add("weather-button-selected")
//                 weatherButton.classList.remove("weather-button")
//                 let img = weatherButton.querySelector(".colored-div")
//                 makeImageBigger(img);
//                 showTitleAndMessage(weatherButton);

//             weatherButton.addEventListener("click", () => {
//                 if(weatherButton.classList.contains("weather-button")) {
//                     makeImageSmaller();
//                     lastCardClicked = weatherButton;
//                     hideTitleAndMessage();
//                     weatherBody.style.setProperty('grid-template-columns', '2fr 1fr 1fr 1fr 1fr 1fr 1fr')
//                     setTimeout(() => {
//                         eraseSelected();
//                         weatherButton.classList.add("weather-button-selected")
//                         weatherButton.classList.remove("weather-button")
//                         let img = weatherButton.querySelector(".colored-div")
//                         makeImageBigger(img);
//                         showTitleAndMessage(weatherButton);
//                     }, 200);
//                 }
//             })
//         }
//         if(i === 1) {
//             weatherButton.id = "1"

//             weatherButton.classList.add("thunderstorm")
//             weatherButton.addEventListener("click", () => {
//                 if(weatherButton.classList.contains("weather-button")) {
//                     makeImageSmaller();
//                     lastCardClicked = weatherButton;
//                     hideTitleAndMessage();
//                     weatherBody.style.setProperty('grid-template-columns', '1fr 2fr 1fr 1fr 1fr 1fr 1fr')
//                     setTimeout(() => {
//                         eraseSelected();
//                         weatherButton.classList.add("weather-button-selected")
//                         weatherButton.classList.remove("weather-button")
//                         let img = weatherButton.querySelector(".colored-div")
//                         makeImageBigger(img);
//                         showTitleAndMessage(weatherButton);
//                     }, 200);
//                 }
//             })
//         }
//         if(i === 2) {
//             weatherButton.id = "2"

//             weatherButton.classList.add("thunderstorm")
//             weatherButton.addEventListener("click", () => {
//                 if(weatherButton.classList.contains("weather-button")) {
//                     makeImageSmaller();
//                     lastCardClicked = weatherButton;
//                     hideTitleAndMessage();
//                     weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 2fr 1fr 1fr 1fr 1fr')
//                     setTimeout(() => {
//                         eraseSelected();
//                         weatherButton.classList.add("weather-button-selected")
//                         weatherButton.classList.remove("weather-button")
//                         let img = weatherButton.querySelector(".colored-div")
//                         makeImageBigger(img);
//                         showTitleAndMessage(weatherButton);
//                     }, 200);
//                 }
//             })
//         }
//         if(i === 3) {
//             weatherButton.id = "3"

//             weatherButton.classList.add("thunderstorm")
//             weatherButton.addEventListener("click", () => {
//                 if(weatherButton.classList.contains("weather-button")) {
//                     makeImageSmaller();
//                     lastCardClicked = weatherButton;
//                     hideTitleAndMessage();
//                     weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 1fr 2fr 1fr 1fr 1fr')
//                     setTimeout(() => {
//                         eraseSelected();
//                         weatherButton.classList.add("weather-button-selected")
//                         weatherButton.classList.remove("weather-button")
//                         let img = weatherButton.querySelector(".colored-div")
//                         makeImageBigger(img);
//                         showTitleAndMessage(weatherButton);
//                     }, 200);
//                 }
//             })
//         }
//         if(i === 4) {
//             weatherButton.id = "4"

//             weatherButton.classList.add("clear")
//             weatherButton.addEventListener("click", () => {
//                 if(weatherButton.classList.contains("weather-button")) {
//                     makeImageSmaller();
//                     lastCardClicked = weatherButton;
//                     hideTitleAndMessage();
//                     weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 1fr 1fr 2fr 1fr 1fr')
//                     setTimeout(() => {
//                         eraseSelected();
//                         weatherButton.classList.add("weather-button-selected")
//                         weatherButton.classList.remove("weather-button")
//                         let img = weatherButton.querySelector(".colored-div")
//                         makeImageBigger(img);
//                         showTitleAndMessage(weatherButton);
//                     }, 200);
//                 }
//             })
//         }
//         if(i === 5) {
//             weatherButton.id = "5"

//             weatherButton.classList.add("sunny")
//             weatherButton.addEventListener("click", () => {
//                 if(weatherButton.classList.contains("weather-button")) {
//                     makeImageSmaller();
//                     lastCardClicked = weatherButton;
//                     hideTitleAndMessage();
//                     weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 1fr 1fr 1fr 2fr 1fr')
//                     setTimeout(() => {
//                         eraseSelected();
//                         weatherButton.classList.add("weather-button-selected")
//                         weatherButton.classList.remove("weather-button")
//                         let img = weatherButton.querySelector(".colored-div")
//                         makeImageBigger(img);
//                         showTitleAndMessage(weatherButton);
//                     }, 200);
//                 }
//             })
//         }
//         if(i === 6) {
//             weatherButton.id = "6"

//             weatherButton.classList.add("rainy")
//             weatherButton.classList.add("right")
//             weatherButton.addEventListener("click", () => {
//                 if(weatherButton.classList.contains("weather-button")) {
//                     makeImageSmaller();
//                     lastCardClicked = weatherButton;
//                     hideTitleAndMessage();
//                     weatherBody.style.setProperty('grid-template-columns', '1fr 1fr 1fr 1fr 1fr 1fr 2fr')
//                     setTimeout(() => {
//                         eraseSelected();
//                         weatherButton.classList.add("weather-button-selected")
//                         weatherButton.classList.remove("weather-button")
//                         let img = weatherButton.querySelector(".colored-div")
//                         makeImageBigger(img);
//                         showTitleAndMessage(weatherButton);
//                     }, 200);
//                 }
//             })
//         }
//         weatherBody.appendChild(weatherButton)
//     }

//     container.appendChild(weatherBody);
//     const dayContainer = document.createElement("div")
//     dayContainer.classList.add("day-container")
//     container.appendChild(dayContainer);
//     const dayDisplay = document.createElement("div")
//     dayDisplay.classList.add("day-display")
//     dayDisplay.textContent = "SOME MESSAGE"
//     dayContainer.appendChild(dayDisplay)
// }
// async function loadBeforeCreating() {
//     await setTimeout(() => {
//         createWeatherLayout();
//     }, 2000);
// }

// loadBeforeCreating();

// function eraseSelected() {
//     const weatherBody = document.getElementById("weather-body")
//     let buttons = Array.from(weatherBody.children)
//     buttons.forEach(element => {
//     });
// }

// function hideTitleAndMessage() {
//     const weatherBody = document.getElementById("weather-body")
//     let buttons = Array.from(weatherBody.children)
//     buttons.forEach(element => {
//         element.classList.remove("weather-button-selected")
//         element.classList.add("weather-button")
//         const selectedDayTitle = element.querySelector(".title")
//         const selectedDayMessage = element.querySelector(".message")
//         selectedDayTitle.textContent = selectedDayTitle.textContent.substring(0, 3);
//         selectedDayMessage.classList.add("hidden");
//         if(element.querySelector("colored-div-bigger")) {
//             let myButton = element.querySelector("colored-div-bigger")
//             myButton.classList.add("colored-div")
//             myButton.classList.remove("colored-div-bigger")
//             console.log("reached this point");
            
//         }
//     });
// }

// // function 

// function makeImageBigger(img) {
//     img.classList.remove("colored-div")
//     img.classList.add("colored-div-bigger")
// }

// function makeImageSmaller() {
//     let img = lastCardClicked.querySelector(".colored-div-bigger")
//     img.classList.remove("colored-div-bigger")
//     img.classList.add("colored-div")
// }


// function showTitleAndMessage(weatherButton) {
//     const selectedDayTitle = weatherButton.querySelector(".title")
//     const selectedDayMessage = weatherButton.querySelector(".message")
//     selectedDayTitle.classList.remove("hidden");
//     selectedDayMessage.classList.remove("hidden");
//     selectedDayTitle.textContent = "plmfrate"
// }