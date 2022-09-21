const MAX_VALUE = 999999999999;
const MIN_VALUE = -999999999999;
const DEFAULT_VALUE = 0;
let current_value = DEFAULT_VALUE;
let display_value = DEFAULT_VALUE;
const number_buttons = document.querySelectorAll(".number");
const operator_buttons = document.querySelectorAll(".operator");
const dot_button = document.getElementById("dot");
const all_clear_button = document.getElementById("AC");
const clear_entry_button = document.getElementById("CE");
const equals_button = document.getElementById("equals");
const plus_minus_button = document.getElementById("plus-minus");

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (true) {
        case (operator === '+'):
            return add(num1, num2); 
        
        case (operator === '-'):
            return subtract(num1, num2); 
        
        case (operator === '*'):
            return multiply(num1, num2); 

        case (operator === '/'):
            return divide(num1, num2);   
    
        default: 
            console.log("Error");
            return false;
    }
}