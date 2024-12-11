const read = require("../helpers/read");

const main = async () => {
    const results = await read(new Parser(), "10");
    partOne(results);
    partTwo(results);
};

const partOne = (arr) => {
    let count = 0;

    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr[row].length; col++) {
            if (arr[row][col] === 0) {
                count += new Set(dfs_wrapper(arr, row, col)).size;
            }
        }
    };

    console.log(count);
};

const partTwo = (arr) => {
    let count = 0;

    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr[row].length; col++) {
            if (arr[row][col] === 0) {
                count += dfs_wrapper(arr, row, col).length;
            }
        }
    };

    console.log(count);
};

const dfs_wrapper = (arr, row, col) => {
    let points = [];

    const dfs = (arr, row, col, num) => {
        if (row < 0 || col < 0 || row > arr.length - 1 || col > arr[row].length - 1 || arr[row][col] !== num) {
            return;
        }
    
        if (arr[row][col] === 9) {
            points.push(`${row},${col}`);
            return;
        }

        dfs(arr, row + 1, col, num + 1);
        dfs(arr, row - 1, col, num + 1);
        dfs(arr, row, col + 1, num + 1);
        dfs(arr, row, col - 1, num + 1);
    };

    dfs(arr, row, col, 0);

    return points;
};

class Parser {
    result = [];


    parseLine = (line) => {
        this.result.push(line.split('').map(x => x === '.' ? -1 : parseInt(x)));
    };

    data = () => {
        return this.result;
    };
}

module.exports = main;
