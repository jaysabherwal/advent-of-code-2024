const read = require('../helpers/read');

const main = async () => {
    const results = await read(new Parser(), '07');

    partOne(results);
    partTwo(results);
};

const partOne = (results) => {
    let result = 0;
    results.forEach(data => {
        const { ans, nums } = data;

        let add = checkEquation(ans, nums, 1, '+', nums[0]);
        let mult = checkEquation(ans, nums, 1, '*', nums[0]);

        if (add || mult) {
            result += ans;
        }
    });

    console.log(result);
};

const partTwo = (results) => {
    let result = 0;
    results.forEach(data => {
        const { ans, nums } = data;

        let add = checkEquationPartTwo(ans, nums, 1, '+', nums[0]);
        let mult = checkEquationPartTwo(ans, nums, 1, '*', nums[0]);
        let concat = checkEquationPartTwo(ans, nums, 1, '||', nums[0]);

        if (add || mult || concat) {
            result += ans;
        }
    });

    console.log(result);
};

const checkEquation = (ans, nums, index, operator, current) => {
    let sum = operator === '+' ? current + nums[index] : current * nums[index];

    // check we havent gone over
    if (sum > ans) {
        return false;
    }

    if (index == nums.length - 1) {
        // check if we are at the target value and push
        if (sum === ans) {
            return true;
        }

        return false;
    }

    // recursion for + and *
    return checkEquation(ans, nums, index + 1, '+', sum) ||
        checkEquation(ans, nums, index + 1, '*', sum);
};

const checkEquationPartTwo = (ans, nums, index, operator, current) => {
    let sum;

    switch (operator) {
        case '+':
            sum = current + nums[index];
            break;
        case '*':
            sum = current * nums[index];
            break;
        default:
            sum = parseInt(`${current}${nums[index]}`)
    }


    // check we havent gone over
    if (sum > ans) {
        return false;
    }

    if (index == nums.length - 1) {
        // check if we are at the target value and push
        if (sum === ans) {
            return true;
        }

        return false;
    }

    // recursion for + and *
    return checkEquationPartTwo(ans, nums, index + 1, '+', sum) ||
        checkEquationPartTwo(ans, nums, index + 1, '*', sum) ||
        checkEquationPartTwo(ans, nums, index + 1, '||', sum);
};


class Parser {
    results = [];

    parseLine = (line) => {
        const equation = line.split(': ');
        this.results.push({
            ans: parseInt(equation[0]),
            nums: equation[1].split(' ').map(num => parseInt(num))
        })
    };

    data = () => {
        return this.results;
    }
};

module.exports = main;