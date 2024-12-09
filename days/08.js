const read = require('../helpers/read');

const main = async () => {
    const results = await read(new Parser(), '08');
    partOne(results);
    partTwo(results);
};

const partOne = (results) => {
    const { grid, map } = results;
    console.log(map.keys.length)

    const points = new Set();

    map.forEach((v, k) => {
        for (let i = 0; i < v.length; i++) {
            for (let j = i + 1; j < v.length; j++) {
                const pointOne = v[i];
                const pointTwo = v[j];
                
                const rowDiff = pointTwo[0] - pointOne[0]; 
                const colDiff = pointTwo[1] - pointOne[1];

                const pointZero = [pointOne[0] - rowDiff, pointOne[1] - colDiff];
                const pointThree = [pointTwo[0] + rowDiff, pointTwo[1] + colDiff];

                if (!isOutOfBounds(grid, pointZero)) {
                    points.add(pointZero.join(','));
                }

                if (!isOutOfBounds(grid, pointThree)) {
                    points.add(pointThree.join(','));
                }
            }
        }
    });

    console.log(points.size);

};

const partTwo = (results) => {
    const { grid, map } = results;

    const points = new Set();

    map.forEach((v, k) => {
        for (let i = 0; i < v.length; i++) {
            for (let j = i + 1; j < v.length; j++) {
                const pointOne = v[i];
                const pointTwo = v[j];
                
                const rowDiff = pointTwo[0] - pointOne[0]; 
                const colDiff = pointTwo[1] - pointOne[1];

                points.add(pointOne.join(','));
                points.add(pointTwo.join(','));

                let tempFirstPoint = [pointOne[0] - rowDiff, pointOne[1] - colDiff];

                while (tempFirstPoint !== null) {
                    if (!isOutOfBounds(grid, tempFirstPoint)) {
                        points.add(tempFirstPoint.join(','));
                        tempFirstPoint = [tempFirstPoint[0] - rowDiff, tempFirstPoint[1] - colDiff]
                    } else {
                        tempFirstPoint = null;
                    }
                }

                let tempLastPoint = [pointTwo[0] + rowDiff, pointTwo[1] + colDiff];

                while (tempLastPoint !== null) {
                    if (!isOutOfBounds(grid, tempLastPoint)) {
                        points.add(tempLastPoint.join(','));
                        tempLastPoint = [tempLastPoint[0] + rowDiff, tempLastPoint[1] + colDiff]
                    } else {
                        tempLastPoint = null;
                    }
                }
            }
        }
    });

    console.log(points.size);

};

const isOutOfBounds = (grid, point) => {
    const [row, col] = point;
    return row < 0 || col < 0 || row >= grid.length || col >= grid[row].length;
};


const addToMap = (map, key, value) => {
    if (map.has(key)) {
        map.get(key).push(value);
    } else {
        map.set(key, [value]);
    }
}

class Parser {
    grid = [];
    map = new Map();
    rowIndex = 0;

    parseLine = (line) => {
        const data = line.split('');
        this.grid.push(data);

        data.forEach((ele, index) => {
            if (ele !== '.') {
                addToMap(this.map, ele, [this.rowIndex, index]);
            }
        });

        this.rowIndex++;
    };

    data = () => {
        return {
            grid: this.grid,
            map: this.map
        };
    }
};

module.exports = main;