const read = require('../helpers/read');

const main = async () => {
    const results = await read(new Parser(), '02');

    const partOne = results.map(line => parseLinePartOne(line)).filter(x => x).length;
    const partTwo = results.map(line => parseLinePartTwo(line)).filter(x => x).length;
    console.log(partOne, partTwo);
};

class Parser {
    results = [];

    parseLine = (line) => {
        this.results.push(line)
    };

    data = () => {
        return this.results;
    }
};


const determineSafety = (data) => {
    const order = determineOrder(data[0], data[1])

    for (let i = 1; i < data.length; i++) {
        const abs = determineAbs(data[i], data[i - 1]);

        if (abs < 1 || abs > 3) {
            return false;
        } 

        if (determineOrder(data[i - 1], data[i]) !== order) {
            return false;
        }
    }

    return true;
};

const determineOrder = (first, second) => {
    return parseInt(first) < parseInt(second) ? 'ASC' : 'DESC';
}

const determineAbs = (first, second) => {
    return Math.abs(second - first);
}

const parseLinePartOne = (line, results) => {
    const data = line.split(" ");
    return determineSafety(data);
};

const parseLinePartTwo = (line) => {
    const data = line.split(" ");
    if (determineSafety(data)) {
        return true;
    }

    for (let i = 0; i < data.length; i++) {
        if (determineSafety(removeElement(data, i))) {
            return true;
        }
    }
    return false;
}

const removeElement = (array, index) => {
    let temp = [...array];
    temp.splice(index, 1)
    return temp;
}

module.exports = main;