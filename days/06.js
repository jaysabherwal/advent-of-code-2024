const read = require('../helpers/read');

const DIR_MAPPINGS = {
    NORTH: [-1, 0, 'N'],
    SOUTH: [1, 0, 'S'],
    WEST: [0, -1, 'W'],
    EAST: [0, 1, 'E']
}

const main = async () => {
    const results = await read(new Parser(), '06');
    console.log(partOne(results).size);
    partTwoRedone(results);
};

const partOne = (results) => {
    const { arr, startingPos } = results;
    let visited = new Map();
    addToMap(visited, startingPos.join(','), 'N');

    let isOutOfBounds = false;
    let currentPos = startingPos;
    let direction = DIR_MAPPINGS.NORTH;

    while (!isOutOfBounds) {
        let lookAhead = getSpace(arr, currentPos[0] + direction[0], currentPos[1] + direction[1]);

        if (lookAhead == 'OOB') {
            isOutOfBounds = true;
        } else if (lookAhead == '#') {
            direction = determineNewDirection(direction);
        } else {
            const existing = visited.get([currentPos[0] + direction[0], currentPos[1] + direction[1]].join(','));
            if (existing && existing.has(direction[2])) {
                return 'LOOP'
            }

            currentPos = [currentPos[0] + direction[0], currentPos[1] + direction[1]]
            addToMap(visited, currentPos.join(','), direction[2]);
        }
    }

    return visited;
};


const partTwoRedone = (results) => {
    const { arr, startingPos } = results;
    
    const blocksToSimulate = partOne(results);

    blocksToSimulate.delete(startingPos.join(','))

    let loopsCount = 0;

    blocksToSimulate.forEach((v, k) => {
        const nums = k.split(',').map(num => parseInt(num));
        arr[nums[0]][nums[1]] = '#';

        // printArr(arr);

        if (partOne(results) == 'LOOP') {
            loopsCount++;
        }

        arr[nums[0]][nums[1]] = '.';
    });

    console.log(loopsCount);
};

const addToMap = (map, key, value) => {
    if (map.has(key)) {
        map.get(key).add(value);
    } else {
        let tempSet = new Set();
        tempSet.add(value);
        map.set(key, tempSet);
    }
}

const determineNewDirection = (direction) => {
    switch (direction) {
        case DIR_MAPPINGS.NORTH:
            return DIR_MAPPINGS.EAST;
        case DIR_MAPPINGS.EAST:
            return DIR_MAPPINGS.SOUTH;
        case DIR_MAPPINGS.SOUTH:
            return DIR_MAPPINGS.WEST;
        case DIR_MAPPINGS.WEST:
            return DIR_MAPPINGS.NORTH;
    }
}

const getSpace = (arr, row, col) => {
    if (row < 0 || col < 0 || row > arr.length - 1 || col > arr[row].length - 1) {
        return 'OOB';
    }

    return arr[row][col];
};


class Parser {
    results = [];
    startingPos = [];

    parseLine = (line) => {
        this.results.push(line.split(''));
        if (line.includes('^')) {
            this.startingPos.push(this.results.length - 1, line.indexOf('^'));
        }
    };

    data = () => {
        return {
            arr: this.results,
            startingPos: this.startingPos
        };
    }
};

module.exports = main;