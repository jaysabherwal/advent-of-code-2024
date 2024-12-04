const read = require('../helpers/read');


const main = async () => {
    const results = await read(new Parser(), '03');
    partOne(results);
    partTwo(results);
};

const partOne = async (results) => {
    let count = 0;

    for (let i = 0; i < results.length; i++) {
        const line = results[i];

        const matches = line.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);

        matches.forEach(exp => {
            let nums = exp.match(/[0-9]{1,3}/g);
            count += (parseInt(nums[0]) * parseInt(nums[1]));
        });
    }

    console.log(count);
};

const partTwo = async (results) => {
    let count = 0;
    let isDo = true;

    for (let i = 0; i < results.length; i++) {
        const line = results[i];

        const matches = line.match(/mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\)/g);

        matches.forEach(exp => {
            if (exp == 'do()') {
                isDo = true;
            } else if (exp == "don't()") {
                isDo = false;
            } else {
                if (isDo) {
                    let nums = exp.match(/[0-9]{1,3}/g);
                    count += (parseInt(nums[0]) * parseInt(nums[1]));
                }
            }
        });
    }

    console.log(count);
};

const _isNaN = (char) => {
    return isNaN(parseInt(char));
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

module.exports = main;