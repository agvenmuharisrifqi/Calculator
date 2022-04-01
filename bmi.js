/**
 * @Subpacakge Calculator BMI
 * @Function Input Session
 */
class BMI{
    constructor() {
        this.height = 0;
        this.weight = 0;
        this.status = "";
    }
    convertHeight(value, from = "centimeter"){
        let result = parseFloat(value);
        switch(from)
        {
            case "centimeter":
                result = result * 0.01;
                break;
            case "inch":
                result = result * 0.0254;
                break;
            case "foot":
                result = result * 0.3048;
                break;
            default:
                break;
        }
        this.height = result;
    }
    convertWeight(value, from = "kilogram"){
        let result = parseFloat(value);
        switch (from) {
            case "pon":
                result = result * 0.453592;
                break;
            default:
                break;
        }
        this.weight = result;
    }
    displayResult(){
        let result = this.weight / (this.height * this.height);
        if (result >= 30.0){
            this.status = "Obesity";
        }else if (result >= 25.0){
            this.status = "Overweight";
        }else if (result >= 18.5){
            this.status = "Normal";
        }else{
            this.status = "Underweight";
        }
        return this.status;
    }
}

/**
 * @Variable_In_BMI
 */
// Initialization Class
const bmi = new BMI();

const height_input = document.getElementById("height-man");
const weight_input = document.getElementById("weight-man");
const height_unit = document.getElementById("select-height");
const weight_unit = document.getElementById("select-weight");
const bmi_button = document.getElementById("bmi-button");
const bmi_close = document.getElementById("button-close-info");
const bmi_item = document.getElementById("bmi-info");
const bmi_status = document.getElementById("bmi-status");
let height_value = "";
let weight_value = "";

bmi_button.addEventListener("click", ()=>{
    bmi_item.classList.add("active");
    bmi_status.innerHTML = bmi.displayResult();
    bmi_item.style.animation = "slide-down 1s ease-in-out";
})

bmi_close.addEventListener("click", ()=>{
    bmi_item.style.animation = "slide-up 1s ease-in-out";
    setTimeout(() => {
        bmi_item.classList.remove("active");
    }, 1000);
})

height_unit.addEventListener("change", (event)=>{
    height_value = event.target.value;
    height_value = height_value ? height_value : "centimeter";
    bmi.convertHeight(height_input.value, height_value);
})

weight_unit.addEventListener("change", (event)=>{
    weight_value = event.target.value;
    weight_value = weight_value ? weight_value : "kilogram";
    bmi.convertWeight(weight_input.value, weight_value);
})

height_input.addEventListener("keyup", (event)=>{
    height_value = height_value ? height_value : "centimeter";
    bmi.convertHeight(event.target.value, height_value);
})

weight_input.addEventListener("keyup", (event)=>{
    weight_value = weight_value ? weight_value : "kilogram";
    bmi.convertWeight(event.target.value, weight_value);
})