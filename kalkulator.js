/**
 * @Subpacakge Calculator Standard
 * @Function Input Session
 */
class Calculator{
    constructor(input, result){
        this.input = input;
        this.result = result;
        this.first_number = 0;
        this.operator = "";
        this.second_number = "";
        this.history_data = new Object();
        this.history = [];
        this.index_history = 0;
    }
    addNumberToInput(number){
        let num = number.toString().replace(/[^\-\.\d]/gm, '');
        this.input.value = num;
        this.updateNumber(num);
    }
    updateNumber(number_recent){
        let number = number_recent;
        let number_check = number.match(/./gm);
        if (number_check){
            number = parseFloat(number);
        }else {
            number = parseInt(number);
        }
        this.second_number = number;
    }
    calculateFunc(){
        let result = 0
        switch(this.operator)
        {
            case "+":
                result = this.first_number + this.second_number;
                break;
            case "-":
                result = this.first_number - this.second_number;
                break;
            case "*":
                result = this.first_number * this.second_number;
                break;
            case "÷":
                result = this.first_number / this.second_number;
                break;
            default:
                break;
        }
        this.first_number = result;
    }
    calcFunction(calc){
        this.second_number = this.second_number ? this.second_number : "0";
        if (this.first_number == 0 && this.second_number !== ""){
            this.first_number = this.second_number;
            this.history = [];
            this.history.push(`${this.second_number} ${calc} `);
        }else{
            this.history[0] += `${this.second_number}${calc ? ' ' + calc + ' ' : ''}`;
            this.calculateFunc();
        }
        this.operator = calc;
        this.displayResult();
        this.second_number = "";
        this.input.value = "";
    }
    advanceCalculation(symbol){
        let result = 0;
        switch(symbol)
        {
            case "%":
                result = this.second_number / 100;
                break;
            case "+/-":
                result = this.second_number * -1;
                break;
            case "√x":
                result = Math.sqrt(this.second_number);
                break;
            default:
                break;
        }
        return result;
    }
    displayResult(){
        let number_check = this.first_number.toString();
        if (number_check.match(/\./g)){
            result.innerHTML = this.first_number.toFixed(9);
        }else if (number_check.length >= 12){
            result.innerHTML = Math.pow(this.first_number, 10);
        }else {
            result.innerHTML = this.first_number;
        }
        this.input.value = "";
    }
    saveToSession(nm){
        let name = nm.toString();
        this.history_data[name] = this.history;
        this.index_history += 1;
        this.history = [];
    }
    createHistory(key, value){
        let data = value[0].replace(/\*/gmi, 'x').replace(/undefined/gmi, '');
        let division = document.createElement("div");
        let paragraph = document.createElement("p");
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");
        division.setAttribute("id", "history-wrapper");
        span1.classList.add("history__item");
        span2.classList.add("history__result");
        span1.appendChild(document.createTextNode(data));
        span2.appendChild(document.createTextNode(key));
        paragraph.appendChild(span1);
        paragraph.appendChild(document.createTextNode(" = "));
        paragraph.appendChild(span2);
        division.appendChild(paragraph)
        history_wrap.appendChild(division);
    }
    backSpace(){
        let number = this.input.value;
        let back_space = number.substr(0, number.length - 1);
        this.input.value = back_space;
    }
    deleteAll(){
        this.first_number = 0;
        this.second_number = "";
        this.displayResult();
    }
    deleteClass(cls, elem){
        for(let clsActive = 0; clsActive < elem.length; clsActive++){
            elem[clsActive].className = elem[clsActive].className.replace(cls, "");
        }
    }
}

/**
 * @Variable_In_Calculator
 */
// Initialization Class
const input_num = document.getElementById("number");
const result = document.getElementById("result");
const number_val = new Calculator(input_num, result);

const btn_normal = document.getElementsByClassName("button__normal");
const btn_calculation = document.getElementsByClassName("button__calculation");
const btn_advance = document.getElementsByClassName("button__advance");
const del_all = document.getElementById("delete-all");
const del_left = document.getElementById("back-space");
const del_memory = document.getElementById("memory-clear"); 
const btn_result = document.getElementById("button-result");
const btn_history = document.getElementById("button-history");
const history_wrap = document.getElementById("calculator-history");
const history_blank = document.getElementById("blank-history");
let first_input = true;
let calc_button = true;
let history_button = true;

/**
 * @Function Input With Keyboard
 */
input_num.addEventListener('keyup', ()=>{
    let number = input_num.value;
    number_val.addNumberToInput(number);
    calc_button = true;
})

/**
 * @Function Number Button
 */
for(let btnN = 0; btnN < btn_normal.length; btnN++){
    btn_normal[btnN].addEventListener("click", (event)=>{
        let number = input_num.value + event.target.innerHTML;
        if (input_num.value.length <= 20){
            number_val.addNumberToInput(number);
            calc_button = true;
        }
    })
}

/**
 * @Function Delete All Button
 */
del_all.addEventListener("click", ()=>{
    number_val.deleteClass(" active", btn_calculation);
    number_val.deleteAll();
})

/**
 * @Function Back Space Button
 */
del_left.addEventListener("click", ()=>{
    number_val.backSpace();
})

/**
 * @Function Calculation Button
 */
for (let calc = 0; calc < btn_calculation.length; calc++){
    btn_calculation[calc].addEventListener("click", ()=>{
        if (!first_input){
            number_val.first_number = 0;
            first_input = true;
        }
        if (calc_button){
            number_val.deleteClass(" active", btn_calculation);
            btn_calculation[calc].classList.add("active");
            let operator = btn_calculation[calc].getAttribute("data-btn");
            number_val.calcFunction(operator);
            calc_button = false;
        }
    })
}

/**
 * @Function Get Total
 */
btn_result.addEventListener("click", ()=>{
    number_val.deleteClass(" active", btn_calculation);
    number_val.calcFunction();
    number_val.displayResult();
    number_val.saveToSession(number_val.first_number);
    first_input = false;
})

/**
 * @Function Advance Button
 */
for (let adv = 0; adv < btn_advance.length; adv++){
    btn_advance[adv].addEventListener("click", ()=>{
        if(number_val.second_number !== ""){
            let data_adv = btn_advance[adv].getAttribute("data-adv");
            let number = number_val.advanceCalculation(data_adv);
            number_val.addNumberToInput(number);
        }
    })
}

/**
 * @Function Memory Clear
 */
del_memory.addEventListener("click", ()=>{
    number_val.deleteClass(" active", btn_calculation);
    number_val.history_data = {};
    number_val.deleteAll();
    number_val.index_history = 0;
})

/**
 * @Function History Button
 */
btn_history.addEventListener("click", ()=>{
    if (history_button == true){
        btn_history.classList.add("active");
        if (number_val.index_history > 0){
            Object.entries(number_val.history_data).forEach(([key, value])=>{
                number_val.createHistory(key, value);
            })
            let result_item = document.querySelectorAll(".history__result");
            result_item.forEach((result)=>{
                result.addEventListener("click", (event)=>{
                    number_val.input.value = event.target.innerHTML;
                    number_val.addNumberToInput(number_val.input.value);
                    btn_history.classList.remove("active");
                    history_button = true;
                })
            })
            history_blank.style.display = "none";
        }else{
            history_blank.style.display = "block";
        }
        history_button = false;
    }else{
        if (number_val.index_history > 0){
            document.getElementById("history-wrapper").remove();
        }
        btn_history.classList.remove("active");
        history_button = true;
    }
})