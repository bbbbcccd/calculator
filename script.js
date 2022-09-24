const MAX_LENGTH = 12;
const MAX_VALUE = 10**12;
const MIN_VALUE = -(10**11);
let current_value = null;
let display_value = null;
let operator = null;
let last_entry = null;
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

// Converts long decimal number to number with length 12 
function round_to_max_length(num) {
    let str_num = num.toString();
    let str_whole_num = str_num.substring(0, str_num.indexOf(".") + 1);
    return +num.toFixed(12 - str_whole_num.length); 
}

// When number button is clicked, evaluate the new display string
// Check if it is longer than the max length
// Update the display_value variable 

number_buttons.forEach(numNode => numNode.addEventListener("click", (e) => {
    if (last_entry === 'operator') {
        display_value = null;
        display_container.textContent = '';
    }

    let display_text = display_container.textContent + e.target.textContent;
    if (display_text.length <= MAX_LENGTH) {
        display_value = +display_text;
        display_container.textContent = display_text;
    }

    last_entry = 'number';
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
    last_entry = null;
});

// When Clear Entry button is clicked, clear the most recent entry
clear_entry_button.addEventListener("click", () => {
    if (last_entry === "number") {
        if (current_value === null) {
            display_value = null;
            display_container.textContent = '';
            last_entry = null;
        } else {
            display_value = null;
            display_container.textContent = '';
            last_entry = 'operator';
        }
    } else if (last_entry === "operator") {
        if (display_value === null) {
            // make operator btn active
            display_value = current_value;
            display_container.textContent = current_value;
            last_entry = 'operator';
        } else {
            operator = null;
            current_value = null;
            last_entry = 'number';
        }
    }
});

// When plus minus button is clicked, switch the signs of the display value
// If display value is 0 or null, don't do anything
// Else, switch signs of display value and reset the operator
plus_minus_button.addEventListener("click", () => {
    if (display_value) {
        display_value = -display_value;
        display_container.textContent = display_value;
        last_entry = 'number';
    }
});


operator_buttons.forEach(btn => {
    btn.addEventListener("click", e => {
        if (current_value === null) {
            operator = e.target.id;
            // make operator btn active
            current_value = display_value;
        } else if (current_value !== null && display_value !== null && last_entry === 'number') {
            calc_value = operate(operator, current_value, display_value);
            if (calc_value >= MAX_VALUE || calc_value <= MIN_VALUE) {
                all_clear_button.click();
                display_container.textContent = "MATH ERROR";
            } else {
                if (calc_value.toString().length > MAX_LENGTH) {
                    calc_value = round_to_max_length(calc_value);
                }
                display_value = current_value = calc_value;
                display_container.textContent = display_value;
                operator = e.target.id;
                // make operator btn active
            }
        } else if (last_entry === 'operator' || display_value === null) {
            operator = e.target.id;
            // make operator btn active
        }

        last_entry = 'operator';
    });
});

equals_button.addEventListener("click", () => {
    if (current_value !== null && operator && display_value !== null) {
        display_value = operate(operator, current_value, display_value);
        display_container.textContent = display_value;
        current_value = operator = null;
    } else if (current_value !== null && operator) {
        display_value = current_value;
        display_container.textContent = display_value;
        current_value = operator = null;
    }
});