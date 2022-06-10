// Initialization for base data
let label = ["celcius", "fahrenheit"];
let temperature = [0, 32]

// Get element
const labelTemp = [...document.querySelectorAll("[label-temp]")];
const tempPoint = [...document.querySelectorAll("[temp-point]")];
const labelPoint = [...document.querySelectorAll("[label-point]")];

// 
labelTemp.forEach((elem, index) => {
    // When label temperature clicked
    elem.addEventListener("change", () => {
        // If label temperature is in base data
        if(label.includes(elem.value)){
            let lbl = label[0]; // Give label[0] to temporary variable
            label[0] = label[1], label[1] = lbl; // Swipe variable
            // Swipe label temperature
            labelTemp.forEach((lbl, index) => {
                labelTemp[index].value = label[index];
            })
        }
        // Change temperature when label temperature clicked
        let i = index == 0 ? 1 : 0;
        let order = labelTemp[index].value + "TO" + labelTemp[i].value;
        tempPoint[i].value = changeTemperature(tempPoint[index].value, order)
        label[index] = elem.value; // Change base data with label temperature clicked
        // Change label input when change label temperature
        labelPoint.forEach((elem, index) => {
            elem.innerHTML = label[index];
            elem.style.textTransform = 'capitalize';
        })
    })
})

// Change temperature when user input
tempPoint.forEach((elem, index) => {
    elem.addEventListener("input", () => {
        let i = index == 0 ? 1 : 0;
        let order = labelTemp[index].value + "TO" + labelTemp[i].value;
        tempPoint[i].value = changeTemperature(elem.value, order)
    })
})

// Function for change temperature
function changeTemperature(temp, order){
    console.log(temp, order)
    temp = parseFloat(temp)
    let result = 0;
    switch (order) {
        case "celciusTOfahrenheit":
            result = (temp * 9/5) + 32;
            break;
        case "celciusTOkelvin":
            result = temp + 273.15;
            break;
        case "fahrenheitTOcelcius":
            result = (temp - 32) * 5/9;
            break;
        case "fahrenheitTOkelvin":
            result = (temp - 32) * 5/9 + 273.15;
            break;
        case "kelvinTOcelcius":
            result = temp - 273.15;
            break;
        case "kelvinTOfahrenheit":
            result = (temp - 273.15) * 9/5 + 32;
            break;
        default:
            break;
    }
    return result.toFixed(2);
}
