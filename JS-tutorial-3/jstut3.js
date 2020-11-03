/* if we wanted to create a class:
class Expenditures {
    constructor(type, percent){
        this.type = type,
        this.percent = percent;
    }
}
*/

let data; //'{"expenditures":[{"type":"Healthcare", "percent":"8"},{"type":"Insurance", "percent":"12"},{"type":"Food", "percent":"13"},{"type":"Housing", "percent":"33"},{"type":"Transportation", "percent":"16"},{"type":"Apparel", "percent":"3"},{"type":"Entertainment", "percent":"5"},{"type":"Healthcare", "percent":"8"},{"type":"Other", "percent":"2"}]}';
let expenditureArray = [];
let percentArray = [];
let colorArray = [];

function drawChart(){
    data = document.getElementById("json-data").value;
    //function which changes percentages into useable format for pie charts
    percentArray = createPercentArray();
    colorArray = createRandomColorArray();
    populateArray(data);

    drawPie();
}


//convert json data into array of objects that we can use to create a pie chart
function populateArray(jsonData){
    let expenseArray = JSON.parse(jsonData);
   
    // sticks json data into our own array, names taken from expenditures.json
    for(i = 0; i < expenseArray.expenditures.length; i++){
        let expense = expenseArray.expenditures[i];
        expenditureArray[i] = expense;
    }
}

// gets the percent information from our array (more specific)
function createPercentArray(){
    let perArr = [];
    for (i = 0; i < expenditureArray.length; i++){
        perArr[i] = expenditureArray[i].percent * 0.02;
    }
    return perArr;
}

function createRandomColorArray(){
    let randColorArr = [];
    for (i = 0; i < expenditureArray.length; i++){
        randColorArr[i] = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    return randColorArr;
}

function drawPie(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    let startAngle = 0;
    let endAngle = 0;

    for (i = 0; i < percentArray.length; i++){
        startAngle = endAngle;
        endAngle = endAngle + (percentArray[i] * Math.PI);
    
        // draws the pie chart without text
        drawSlice(context, 300, 200, 150, startAngle, endAngle, colorArray[i]);

        //add text to the pie chart
        drawSliceText(context, 300, 200, 150, startAngle, endAngle, percentArray[i]*50)

    }
}


function drawSlice(ctx, sliceCenterX, sliceCenterY, radius, startAngle, endAngle, color){
    ctx.fillStyle = color;
    ctx.beginPath();

    let medianAngle = (startAngle + endAngle)/2;
    xOffset = Math.cos(medianAngle) * 30;
    yOffset = Math.sin(medianAngle) * 30;

    ctx.moveTo(sliceCenterX + xOffset, sliceCenterY + yOffset);
    ctx.arc(sliceCenterX + xOffset, sliceCenterY + yOffset, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

function drawSliceText(ctx, sliceCenterX, sliceCenterY, radius, startAngle, endAngle, percentText){
    // find the x coords of the text
    let textX = sliceCenterX + Math.cos((startAngle + endAngle)/2) * radius;
    let textY = sliceCenterY + Math.sin((startAngle + endAngle)/2) * radius;

    ctx.fillStyle = 'black';
    ctx.font = '24px Calibri';
    ctx.fillText(percentText, textX, textY);
}