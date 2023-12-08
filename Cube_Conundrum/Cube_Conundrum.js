"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = require("process");
var readline = require('readline');
var fs = require('fs');
var filePath = 'input_cube.txt';
var readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process_1.stdout,
    console: true
});
var total = 0;
var leastConfigTotal = 0;
readInterface.on('line', function (line) {
    var splitLine = line.split(":");
    //console.log("Game:", splitLine[1]);
    //console.log("result", cubeConundrum(splitLine[1]));
    total += cubeConundrum(splitLine[1]) ? Number.parseInt(splitLine[0].split(" ")[1]) : 0;
    console.log("total:", total);
    leastConfigTotal += LeastAmountOfCubeConfig(splitLine[1]);
});
readInterface.on('close', function () {
    console.log("total", total);
    console.log("leastConfigTotal:", leastConfigTotal);
});
var CubeConfig = /** @class */ (function () {
    function CubeConfig(green, red, blue) {
        this.green = green;
        this.red = red;
        this.blue = blue;
        this.green = green;
        this.blue = blue;
        this.red = red;
    }
    CubeConfig.prototype.CheckSubsetIsCorrect = function (subset) {
        return this.blue >= subset.blue && this.red >= subset.red && this.green >= subset.green;
    };
    CubeConfig.prototype.GetTheLeastConfig = function (subset) {
        this.blue = Math.max(subset.blue, this.blue);
        this.green = Math.max(subset.green, this.green);
        this.red = Math.max(subset.red, this.red);
    };
    return CubeConfig;
}());
var CreateObjectFromString = function (subsets) {
    var subset = subsets.split(',');
    var newObject = new CubeConfig(0, 0, 0);
    subset.forEach(function (x) {
        var h = x.split(" ");
        console.log(h);
        switch (h[2]) {
            case "red":
                {
                    newObject.red = Number.parseInt(h[1]);
                    break;
                }
            case "green":
                {
                    newObject.green = Number.parseInt(h[1]);
                    break;
                }
            case "blue":
                {
                    newObject.blue = Number.parseInt(h[1]);
                    break;
                }
        }
    });
    return newObject;
};
var diceConfig = new CubeConfig(13, 12, 14);
var cubeConundrum = function (gameScore) {
    var gameSubsets = gameScore.split(';');
    for (var _i = 0, gameSubsets_1 = gameSubsets; _i < gameSubsets_1.length; _i++) {
        var x = gameSubsets_1[_i];
        var subset = CreateObjectFromString(x);
        if (!diceConfig.CheckSubsetIsCorrect(subset)) {
            console.log("subset failed", subset);
            return false;
        }
        else
            console.log("Passed:", subset);
    }
    return true;
};
var LeastAmountOfCubeConfig = function (Game) {
    var atLeastconfig = new CubeConfig(0, 0, 0);
    var gameSubsets = Game.split(';');
    for (var _i = 0, gameSubsets_2 = gameSubsets; _i < gameSubsets_2.length; _i++) {
        var x = gameSubsets_2[_i];
        var subset = CreateObjectFromString(x);
        atLeastconfig.GetTheLeastConfig(subset);
    }
    return atLeastconfig.blue * atLeastconfig.green * atLeastconfig.red;
};
