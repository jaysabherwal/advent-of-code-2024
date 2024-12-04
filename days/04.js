const read = require('../helpers/read');
const WORD = 'XMAS';

const main = async () => {
    const results = await read(new Parser(), '04');
    partOne(results);
    partTwo(results);
};

const partOne = (results) => {
    let counter = 0;

    for (let row = 0; row < results.length; row++) {
        for (let col = 0; col < results[row].length; col++) {
            if (results[row][col] === 'X') {
                counter += checkXmasWrapper(results, row, col);
            }
        }
    }

    console.log(counter);
}

const partTwo = (results) => {
    let counter = 0;

    for (let row = 0; row < results.length; row++) {
        for (let col = 0; col < results[row].length; col++) {
            if (results[row][col] === 'A') {
                counter += checkMas(results, row, col);
            }
        }
    }

    console.log(counter);
}

const checkMas = (arr, row, col) => {
    let accepted = ['MAS', 'SAM'];

    let forward_slash = getLetter(arr, row + 1, col - 1) + 'A' + getLetter(arr, row - 1, col + 1);
    let back_slash = getLetter(arr, row - 1, col - 1) + 'A' + getLetter(arr, row + 1, col + 1);

    return accepted.includes(forward_slash) && accepted.includes(back_slash);
};

const getLetter = (arr, row_idx, col_idx) => {
    return row_idx < 0 || col_idx < 0 || row_idx > arr.length - 1 || col_idx > arr[row_idx].length - 1 ? '' : arr[row_idx][col_idx];
};

const checkXmasWrapper = (arr, row, col) => {
    let count = 0;

    count += checkXmas(arr, row, col, 0, -1); // W
    count += checkXmas(arr, row, col, 0, 1); // E
    count += checkXmas(arr, row, col, -1, 0); // N
    count += checkXmas(arr, row, col, 1, 0); // S
    count += checkXmas(arr, row, col, -1, -1); // NW
    count += checkXmas(arr, row, col, 1, -1); // SW
    count += checkXmas(arr, row, col, -1, 1); // NE
    count += checkXmas(arr, row, col, 1, 1); // SE

    return count;
};

const checkXmas = (arr, row_idx, col_idx, row_dir, col_dir, index = 0) => {
    if (row_idx < 0 || col_idx < 0 || row_idx > arr.length - 1 || col_idx > arr[row_idx].length - 1 || arr[row_idx][col_idx] !== WORD[index]) {
        return false;
    }

    if (index === 3 && arr[row_idx][col_idx] === WORD[3]) {
        return true;
    }

    return checkXmas(arr, row_idx + row_dir, col_idx + col_dir, row_dir, col_dir, index += 1);
};

class Parser {
    results = [];

    parseLine = (line) => {
        this.results.push(line.split(''));
    };

    data = () => {
        return this.results;
    }
};

module.exports = main;