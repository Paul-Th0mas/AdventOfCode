import { stdout } from "process";

var readline = require('readline');
var fs = require('fs');
var filePath = 'input_cube.txt';
var readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: stdout,
    console: true
});
var total = 0;
var leastConfigTotal=0;
readInterface.on('line', function (line) {
    let splitLine: string[] = line.split(":");
    //console.log("Game:", splitLine[1]);
    //console.log("result", cubeConundrum(splitLine[1]));
    total += cubeConundrum(splitLine[1]) ? Number.parseInt(splitLine[0].split(" ")[1]) : 0;
    console.log("total:", total);
    leastConfigTotal+=LeastAmountOfCubeConfig(splitLine[1]);
});
readInterface.on('close', function () {
    console.log("total",total);
    console.log("leastConfigTotal:",leastConfigTotal);

});

class CubeConfig {
    constructor(public green: number, public red: number, public blue: number) {
        this.green = green;
        this.blue = blue;
        this.red = red;
    }


    CheckSubsetIsCorrect(subset: CubeConfig) {
        return this.blue >= subset.blue && this.red >= subset.red && this.green >= subset.green
    }

    GetTheLeastConfig(subset: CubeConfig) {
        this.blue = Math.max(subset.blue, this.blue);
        this.green = Math.max(subset.green, this.green);
        this.red = Math.max(subset.red, this.red);
    }
}

let CreateObjectFromString = (subsets: string) => {
    var subset = subsets.split(',');
    let newObject: CubeConfig = new CubeConfig(0, 0, 0);
    subset.forEach(x => {
        let h = x.split(" ")
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
    })
    return newObject;
}


let diceConfig: CubeConfig = new CubeConfig(13, 12, 14)


let cubeConundrum = (gameScore: string): boolean => {
    var gameSubsets = gameScore.split(';');
    for (let x of gameSubsets) {
        let subset = CreateObjectFromString(x);
        if (!diceConfig.CheckSubsetIsCorrect(subset)) {
            console.log("subset failed", subset)
            return false;
        }
        else
            console.log("Passed:", subset)
    }
    return true;
};

let LeastAmountOfCubeConfig = (Game: string) => {
    var atLeastconfig = new CubeConfig(0, 0, 0);
    var gameSubsets = Game.split(';');
    for (let x of gameSubsets) {
        let subset = CreateObjectFromString(x);
        atLeastconfig.GetTheLeastConfig(subset)
    }
    return atLeastconfig.blue * atLeastconfig.green * atLeastconfig.red
}


