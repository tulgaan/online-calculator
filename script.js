const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let startNewNumber = true;



function appendNumber(number) {
    if (
        startNewNumber ||
        display.value === "0" ||
        display.value === "Error" ||
        display.value === "Cannot divide by zero"
    ) {
        display.value = number;
        startNewNumber = false;
    } else {
        display.value += number;
    }
}



function appendDecimal() {
    if (startNewNumber) {
        display.value = "0.";
        startNewNumber = false;
        return;
    }

    // Нэг тоонд зөвхөн нэг цэг оруулна
    if (!display.value.includes(".")) {
        display.value += ".";
    }
}



function chooseOperator(selectedOperator) {
    const currentNumber = parseFloat(display.value);

    if (isNaN(currentNumber)) {
        showError();
        return;
    }

    firstNumber = currentNumber;
    operator = selectedOperator;
    startNewNumber = true;
}



function calculate() {
    if (operator === null || firstNumber === null) {
        return;
    }

    const secondNumber = parseFloat(display.value);

    if (isNaN(secondNumber)) {
        showError();
        return;
    }

    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                display.value = "Cannot divide by zero";

                firstNumber = null;
                operator = null;
                startNewNumber = true;

                return;
            }

            result = firstNumber / secondNumber;
            break;

        default:
            return;
    }

    display.value = formatNumber(result);

    firstNumber = null;
    operator = null;
    startNewNumber = true;
}



function clearDisplay() {
    display.value = "0";

    firstNumber = null;
    operator = null;
    startNewNumber = true;
}



function deleteLast() {
    if (
        display.value === "Error" ||
        display.value === "Cannot divide by zero"
    ) {
        clearDisplay();
        return;
    }

    if (startNewNumber) {
        return;
    }

    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);

        if (display.value === "-") {
            display.value = "0";
            startNewNumber = true;
        }
    } else {
        display.value = "0";
        startNewNumber = true;
    }
}



function toggleSign() {
    const number = parseFloat(display.value);

    if (isNaN(number)) {
        showError();
        return;
    }

    display.value = formatNumber(number * -1);
}


function percentage() {
    const number = parseFloat(display.value);

    if (isNaN(number)) {
        showError();
        return;
    }

    display.value = formatNumber(number / 100);
    startNewNumber = true;
}



function squareRoot() {
    const number = parseFloat(display.value);

    if (isNaN(number) || number < 0) {
        showError();
        return;
    }

    display.value = formatNumber(Math.sqrt(number));
    startNewNumber = true;
}


function square() {
    const number = parseFloat(display.value);

    if (isNaN(number)) {
        showError();
        return;
    }

    display.value = formatNumber(number * number);
    startNewNumber = true;
}



function reciprocal() {
    const number = parseFloat(display.value);

    if (isNaN(number)) {
        showError();
        return;
    }

    if (number === 0) {
        display.value = "Cannot divide by zero";
        startNewNumber = true;
        return;
    }

    display.value = formatNumber(1 / number);
    startNewNumber = true;
}



function showError() {
    display.value = "Error";

    firstNumber = null;
    operator = null;
    startNewNumber = true;
}



function formatNumber(number) {
    if (!Number.isFinite(number)) {
        return "Error";
    }

    // Floating point урт бутархайг багасгана
    const rounded = Math.round(number * 10000000000) / 10000000000;

    return String(rounded);
}