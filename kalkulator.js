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
        this.second_number = 0;
    }
    addNumberToInput(number){
        let num = number.replace(/^0|^,/gm, '');
        const result = this.thousandFormat(num);
        this.input.value = result;
        this.updateNumber(result);
    }
    thousandFormat(angka){
        var angka = angka.toString();
        var number_string = angka.replace(/[^,\d]/g, ''),
        split           = number_string.split(','),
        sisa            = split[0].length % 3,
        angka_hasil     = split[0].substr(0, sisa),
        ribuan          = split[0].substr(sisa).match(/\d{3}/gi);
        if(ribuan){
            let separator = sisa ? '.' : '';
            angka_hasil += separator + ribuan.join('.');
        }
        angka_hasil = split[1] != undefined ? angka_hasil + ',' + split[1] : angka_hasil;
        return angka_hasil;
    }
    updateNumber(number_recent){
        let number = number_recent.split('.').join('');
        let number_check = number.match(/,/gm);
        if (number_check){
            number = number.replace(/,/gm, '.');
            number = parseFloat(number);
        }else {
            number = parseInt(number);
        }
        this.second_number = number;
    }
    deleteAll(){
        this.input.value = "";
    }
    backSpace(){
        let number = this.input.value;
        let back_space = number.substr(0, number.length - 1);
        this.input.value = back_space;
    }
    displayResult(){
        this.calculateFunc(this.operator);
        const number_result = this.thousandFormat(this.first_number);
        result.innerHTML = number_result;
        this.input.value = "";
    }
    calculateFunc(operator){
        let result = 0
        switch(operator)
        {
            case "+":
                result = this.first_number + this.second_number;
                break
            case "-":
                result = this.first_number - this.second_number;
                break
            case "*":
                result = this.first_number * this.second_number;
                break
            case "/":
                result = this.first_number / this.second_number;
                break
            default:
                break
        }
        this.first_number = result;
    }
    calcFunction(calc){
        this.operator = calc;
        this.first_number = this.second_number;
        this.input.value = "";
        this.second_number = 0;
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
 * @Function Result Button
 */
btn_result.addEventListener("click", ()=>{
    number_val.displayResult();
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
        let operator = btn_calculation[calc].getAttribute("data-btn");
        number_val.calcFunction(operator);
    })
}