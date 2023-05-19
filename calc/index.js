let input = document.getElementById('input'),
    number = document.querySelectorAll('.numbers div'),
    operator = document.querySelectorAll('.operators div'),
    result = document.getElementById('result'),
    clear = document.getElementById('clear'),
    resultDisplayed = false;


for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function (e) {
        console.log('click number is :', e.target.innerHTML);
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];
        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            // 계산이 끝나있고 마지막으로 저장된 그리고 지금 눌린 버튼이 연산자일 경우 덮어쓴다
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            // 반대로 피연산자일 경우 초기화
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }

    });
}
// adding click handlers to number buttons
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function (e) {
        console.log('click operator is :', e.target.innerHTML);
        // storing current input string and its last character in letiables - used later
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];
        // console.log('operator event last save :', lastChar);
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") { 
            // 마지막 입력이 연산자 인 경우 마지막 내용으로 추가
            let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            // if first key pressed is an opearator, don't do anything
            console.error("enter a number first");
        } else {
            // else just add the operator pressed to the input
            input.innerHTML += e.target.innerHTML;
        }

    });
}
// on click of 'equal' button
result.addEventListener("click", function () {
    // this is the string that we will be processing eg. -10+26+33-56*34/23
    let inputString = input.innerHTML;
    // forming an array of numbers. eg for above string it will be: numbers = ["10",
    // "26", "33", "56", "34", "23"]
    let numbers = inputString.split(/\+|\-|\×|\÷/g);
    // forming an array of operators. for above string it will be: operators = ["+",
    // "+", "-", "*", "/"] first we replace all the numbers and dot with empty
    // string and then split
    let operators = inputString
        .replace(/[0-9]|\./g, "")
        .split("");

    console.log('all string :', inputString);
    console.log('all op :', operators);
    console.log('all num :', numbers);
    
    /* splice 함수를 이용해 피연산자는 2개씩 연산자는 1개씩 끊어 각각의 계산을 취하고 결과를 0번지에 저장 */
    let divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    let multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    let subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    let add = operators.indexOf("+");
    while (add != -1) {
        // using parseFloat is necessary, otherwise it will result in string
        // concatenation :)
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0]; // displaying the output
    resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function () {
    console.log('Clear board');
    input.innerHTML = "";
});
