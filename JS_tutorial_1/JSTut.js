//calculate Pi
function calcPI(iterations){
    let pi = 0, divisor = 1;
    for(i = 0; i <= iterations; i++){
        pi = pi + (4/divisor) - (4/(divisor+2));
        divisor += 4;
    }
    document.getElementById("output1").value = pi.toFixed(10);
}

//fib sequence = 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

let fibList = [];

function calcFibList(howMany){
    for (i = 0; i < howMany; i++){
        fibList[i] = fib(i)
    }
    fibList.shift();
    document.getElementById("output1").value = fibList.join(", ");
}

function fib(whichNum){
    let num1=1, num2=0, temp, i=0;
    while(i < whichNum){
        temp = num1;
        num1 += num2;
        num2 = temp;
        i++;
    }
    return num2;
}



let mLText = "My dear old ~ sat me down to hear some words of wisdom \n 1. give a man a ~ and you ~ him for a day. ~ a man to ~ and he'll ~ forever \n 2. he who ~ at the right time can again \n 3. Always wear ~ ~ in case you're in a ~ \n 4. don't use your ~ to wipe your ~, Always have a clearn ~ with you."
let mLArray = mLText.split(" ");
let inputArray = [];


// generates final madlib
// 1. create an array containing user inputs
//       2.5 ensure inputs are valid and not missing
// 3. replace tilde' with respective user inputs

function madLibGenerator(){
    createInputArray();
    if(checkForMissingInput()){
        document.getElementById("output1").value = "error: missing values"
    } else {
        createMLSentence();
    }   
 
}

// 1. creates array of user inputs
function createInputArray(){
    for(i = 0; i < 14; i++){
        inputArray[i] = document.getElementById("i" + i).value;
    }
}

// 2. checks for missing inputs
function checkForMissingInput(){
    let defaultArrayVals = ["Person","Noun","Verb","Verb","Verb","Verb","Plural Verb","Verb","Adjective","Noun","Event","Noun","Body Part","Noun"];
    for (i=0; i < 14; i++){
        if (defaultArrayVals.indexOf(inputArray[i]) > -1){
            return true;
        } else {
            return false;
        }
    }
}

// 3. replace tilde with user inputs
function createMLSentence(){
    let arrIndex = 0;
    for (i = 0; i < mLArray.length; i++){
        let matchIndex = mLArray.indexOf("~");
        mLArray[matchIndex] = inputArray[arrIndex];
        arrIndex++;
    }
    document.getElementById("output1").value = mLArray.join(" ");
}

//test commit #1