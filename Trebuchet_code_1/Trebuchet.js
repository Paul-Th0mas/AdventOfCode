var readline = require('readline');
var fs = require('fs');
var filePath = 'input.txt';
var readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    console: false
});
var total = 0;
readInterface.on('line', function (line) {
    total += GetCalibration(line);
});
readInterface.on('close', function () {
    console.log(total);
});
function hasKeyStartingWith(searchString) {
    for (var key in numberMap) {
        if (key.startsWith(searchString)) {
            return true; // If any key starts with searchString, return true
        }
    }
    return false; // If no key starts with searchString, return false
}
var numberMap = {
    "zero": "0",
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9"
};
function hasKeyEndingWith(searchString) {
    for (var key in numberMap) {
        if (key.endsWith(searchString)) {
            return true; // If any key ends with searchString, return true
        }
    }
    return false; // If no key ends with searchString, return false
}
var GetCalibration = function (line) {
    var coordinates = ["0", "0"];
    var digitUno = "";
    var digiDuos = "";
    for (var i = 0; i < line.length; i++) {
        if (coordinates[0] == "0" && /^\d+$/.test(line[i])) {
            coordinates[0] = line[i];
        }
        else if (coordinates[0] == "0") {
            digitUno = hasKeyStartingWith(digitUno + line[i]) ? digitUno + line[i] : line[i];
            coordinates[0] = numberMap.hasOwnProperty(digitUno) ? numberMap[digitUno] : "0";
        }
        if (coordinates[1] == "0" && /^\d+$/.test(line[line.length - i - 1])) {
            coordinates[1] = line[line.length - i - 1];
        }
        else if (coordinates[1] == "0") {
            digiDuos = hasKeyEndingWith(line[line.length - i - 1] + digiDuos) ? line[line.length - i - 1] + digiDuos : line[line.length - i - 1];
            coordinates[1] = numberMap.hasOwnProperty(digiDuos) ? numberMap[digiDuos] : "0";
        }
    }
    return parseInt(coordinates[0] + coordinates[1]);
};
