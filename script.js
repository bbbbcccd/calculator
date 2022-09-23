const MAX_LENGTH = 12;
let current_value = null;
let display_value = null;
let operator = null;
const display_container = document.getElementById("result");
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
        case (operator === 'add'):
            return add(num1, num2); 
        
        case (operator === 'minus'):
            return subtract(num1, num2); 
        
        case (operator === 'times'):
            return multiply(num1, num2); 

        case (operator === 'divide'):
            return divide(num1, num2);   
    
        default: 
            console.log("Error");
            return false;
    }
}

// When number button is clicked, evaluate the new display string
// Check if it is longer than the max length
// Update the display_value variable 

number_buttons.forEach(numNode => numNode.addEventListener("click", (e) => {
    let display_text = display_container.textContent + e.target.textContent;
    if (display_text.length <= MAX_LENGTH) {
        display_value = +display_text;
        display_container.textContent = display_text;
    }
}));

// When dot button is clicked, check if the display contains a dot
// Do not do anything if the display already contains a dot
// Else, append a dot to the end of the display

dot_button.addEventListener("click", (e) => {
    if (!display_container.textContent.includes(".")) {
        display_container.textContent += ".";
    }
});

// When All Clear button is clicked, clear result container,
// reset current_value and display value to null
// reset operator to null
all_clear_button.addEventListener("click", () => {
    display_container.textContent = '';
    current_value = display_value = null;
    operator = null;
});

// When Clear Entry button is clicked, clear the most recent entry
// Cases are:
// When operator is null, reset the display_value to null and update display_container
// When current_value is null and operator is active, reset the operator to null
// When there is a current_value and operator is active, reset the operator to null and display current_value
clear_entry_button.addEventListener("click", () => {
    if (operator === null) {
        display_value = null;
        display_container.textContent = '';
    } else if (current_value === null) {
        operator = null;
    } else {
        display_value = current_value;
        current_value = null;
        display_container.textContent = display_value;
    }
});
