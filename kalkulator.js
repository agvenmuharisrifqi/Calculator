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
        this.history = [];
        this.index_history = 0;
    }
    addNumberToInput(number){
        let num = number.replace(/^0|^\./gm, '');
        this.input.value = num;
        this.updateNumber(num);
    }
    updateNumber(number_recent){
        let number = number_recent.split(',').join('');
        let number_check = number.match(/./gm);
        if (number_check){
            number = parseFloat(number);
        }else {
            number = parseInt(number);
        }
        this.second_number = number;
    }
    deleteAll(){
        this.first_number = 0;
        this.displayResult();
    }
    backSpace(){
        let number = this.input.value;
        let back_space = number.substr(0, number.length - 1);
        this.input.value = back_space;
    }
    displayResult(){
        let number_result = this.first_number.toString();
        if (number_result.length > 15){
            result.innerHTML = Math.pow(this.first_number, 10);
        }else {
            result.innerHTML = number_result;
        }
        this.input.value = "";
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
            case "/":
                result = this.first_number / this.second_number;
                break;
            case "%":
                result = (this.first_number / 100) * this.second_number;
                break;
            default:
                break;
        }
        this.first_number = result;
    }
    calcFunction(calc){
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
    saveToSession(){
        let name = `item_${this.index_history}`
        sessionStorage.setItem(name, this.history);
        this.index_history += 1;
    }
}

/**
 * @Variable_In_Calculator
 */
const btn_normal = document.getElementsByClassName("button__normal");
const btn_calculation = document.getElementsByClassName("button__calculation");
const del_all = document.getElementById("delete-all");
const del_left = document.getElementById("back-space");
const btn_result = document.getElementById("button-result");
const btn_history = document.getElementById("button-history");
let first_input = true;

// Initialization Class
const input_num = document.getElementById("number");
const result = document.getElementById("result");
const number_val = new Calculator(input_num, result);

/**
 * @Function Input With Keyboard
 */
input_num.addEventListener('keyup', ()=>{
    let number = input_num.value;
    number_val.addNumberToInput(number);
})

/**
 * @Function Number Button
 */
for(let btnN = 0; btnN < btn_normal.length; btnN++){
    btn_normal[btnN].addEventListener("click", (event)=>{
        let number = input_num.value + event.target.innerHTML;
        if (input_num.value.length < 13){
            number_val.addNumberToInput(number);
        }
    })
}

/**
 * @Function Delete All Button
 */
del_all.addEventListener("click", ()=>{
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
        let operator = btn_calculation[calc].getAttribute("data-btn");
        // number_val.operator = operator;
        number_val.calcFunction(operator);
        // if (number_val.first_number !== 0){
        //     number_val.second_number
        // }
    })
}

/**
 * @Function Get Total
 */
btn_result.addEventListener("click", ()=>{
    number_val.calcFunction();
    number_val.displayResult();
    number_val.history.push(number_val.first_number);
    number_val.saveToSession();
    first_input = false;
})

btn_history.addEventListener("click", ()=>{
    for (let i = 0; i < number_val.index_history; i++){
        console.log(sessionStorage.getItem(`item_${i}`));
    }
})