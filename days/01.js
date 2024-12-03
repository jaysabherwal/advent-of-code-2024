const read = require('../helpers/read');

const main = () => {
    partOne();
    partTwo();
};

const partOne = async () => {
    const [first, second] = await read(new Parser(), '01');

    first.sort((a, b) => a - b);
    second.sort((a, b) => a - b);

    let count = 0;

    for (let i = 0; i < first.length; i++) {
        count += Math.abs(first[i] - second[i]);
    };

    console.log(count);
};

const partTwo = async () => {
    const [first, second] = await read(new Parser(), '01');

    const counter = new Map();
    
    second.forEach(num => {
        if (counter.has(num)) {
            counter.set(num, counter.get(num) + 1);
        } else {
            counter.set(num, 1);
        }
    });

    let similarityScore = 0;

    first.forEach(num => {
        const count = counter.get(num) ?? 0;
        similarityScore += (num * count);
    });

    console.log(similarityScore);
};


class Parser {
    first = [];
    second = [];

    parseLine = (line) => {
        const data = line.split('   ');
        this.first.push(data[0]);
        this.second.push(data[1]);
    };

    data = () => {
        return [this.first, this.second];
    }
};

module.exports = main;