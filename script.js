//global variables
let numberOne = "";
let numberTwo = "";
let previousOperator = undefined;
let operator = undefined;


//DOM
const numberButtons = document.querySelectorAll(".number-buttons");
const operatorButtons = document.querySelectorAll(".operator-buttons");
const equalsButton = document.querySelector("#equals-btn");
const clearButton = document.querySelector("#clear-btn");
const displayInput = document.querySelector("#display-input");
const displaySolution = document.querySelector("#display-solution");
const deleteButton = document.querySelector("#delete-btn");
const decimalButton = document.querySelector("#decimal-btn");

function setUp() {
    //set buttons up
    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            //check if first expression ie numberOne is still inputted
            if(typeof(numberOne) === "string") {
                numberOne += button.textContent;
                console.log(numberOne);
            }
            if(typeof(numberOne) === "number") {
                numberTwo += button.textContent;
                console.log(numberTwo);
            }
            
            displayInput.textContent += button.textContent; 
            
        })
    });

    //set operators
    operatorButtons.forEach(button => {
        button.addEventListener("click", e => {

            if(button.textContent === "=") displaySolution.textContent = numberOne;

            //assign operator if only numberOne has input and not double operator
            if(button.textContent !== "=" && numberOne !== "" && displayInput.textContent.charAt(displayInput.textContent.length - 2) !== button.textContent) {

                operator = button.textContent;
                displayInput.textContent += ` ${operator} `;

                //no expression to evaluate yet, then turn numberOne to a number to take numberTwo input now
                if (typeof (numberOne) === "string") {
                    //for some reason native Number() function doesn't work..
                    numberOne = +numberOne;
                    previousOperator = button.textContent;
                }

            }

            //expression is now there, so evaluate
            if(typeof(numberOne) === "number") {

                //assign to numberOne
                if(numberTwo !== "") {
                    numberTwo = +numberTwo;
                    numberOne = operate(numberOne, previousOperator, numberTwo);
                    displaySolution.textContent = numberOne;
                }

                    
                previousOperator = operator;
                numberTwo = "";
                displayInput.textContent = `${numberOne} ${previousOperator} `;

                if(checkDoubleOperator()) {
                    console.log("Double");
                    displayInput.textContent[displayInput.length - 2] = previousOperator;
                }
            }

            
        })
    })

    //delete button
    deleteButton.addEventListener("click", () => {

        //check if user is deleting up to the operator
        if(displayInput.textContent.endsWith(operator)) {
            operator = undefined;
        }

        displayInput.textContent = displayInput.textContent.substring(0, displayInput.textContent.length - 1);

        //deleting numberTwo portion.
        if(typeof(numberOne) === "number" && operator !== undefined) {
            numberTwo = displayInput.textContent.substring(displayInput.textContent.indexOf(operator) + 2, displayInput.textContent.length);
            console.log(numberTwo);
        }

        else {
            numberOne = displayInput.textContent;
        }
    })    

    //equal button
    equalsButton.addEventListener("click", () => {
        
        if(numberTwo == "") return;

        previousOperator = undefined;
        //testng
        numberOne = numberTwo.toString();
        numberTwo = "";
        displayInput.textContent = "";


    })

    //clear button
    clearButton.addEventListener("click", () => {
        numberOne = "";
        numberTwo = "";
        displayInput.textContent = "";
        displaySolution.textContent = "";
    });

    decimalButton.addEventListener("click", () => {
        if(typeof(numberOne) === "string" && !numberOne.includes(".")) {
            numberOne += ".";
            displayInput.textContent += ".";
        }
        else if(!numberTwo.includes(".") && typeof(numberOne) !== "string") {
            numberTwo += ".";
            displayInput.textContent += ".";
        }
    })

}


function operate(numberOne, operator, numberTwo) {
    if(operator === "+") {
        return add(numberOne, numberTwo);
    }
    if(operator === "-") {
        return subtract(numberOne, numberTwo);
    }
    if(operator === "×") {
        return multiply(numberOne, numberTwo);
    }
    if(operator === "/") {
        return divide(numberOne, numberTwo)
    }
    return "hmmm...";
}

function add(x, y) {
    return +(x+y).toFixed(3);
}

function subtract(x,y) {
    return +(x-y).toFixed(3);
}

function multiply(x,y) {
    return +(x*y).toFixed(3);
}

function divide(x,y) {
    //round decimals to certain place...
    return +(x/y).toFixed(3);
}

function checkDoubleOperator() {
    operatorButtons.forEach(button => {
        if(displayInput.textContent.charAt(displayInput.textContent.length - 2 === button.textContent)) return false;
    })

    return false;
}

setUp();