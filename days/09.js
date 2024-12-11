const read = require("../helpers/read");

const main = async () => {
    const results = await read(new Parser(), "09");
    partOne(results.data);
    partTwo(results);
};

const partOne = (results) => {
    let arr = [...results];
    let left = findNextSpace(0, arr);
    let right = findNextNum(arr.length - 1, arr);

    while (left <= right) {
        swap(arr, left, right);

        left = findNextSpace(left, arr);
        right = findNextNum(right, arr);
    }

    calculateChecksum(arr);
};

const partTwo = (results) => {
    const { data, nums, spaces } = results;

    let reversedNums = nums.reverse();

    let arr = [...data];

    reversedNums.forEach((numObj) => {

        for (let idx = 0; idx < spaces.length; idx++) {
            const spaceObj = spaces[idx];
            
            if (numObj.len <= spaceObj.len && numObj.idx > spaceObj.idx) {
                
                // modify array
                for (let i = spaceObj.idx; i < (spaceObj.idx + numObj.len); i++) {
                    arr[i] = numObj.num;
                }

                for (let i = numObj.idx; i < (numObj.idx + numObj.len); i++) {
                    arr[i] = -1;
                }

                if (numObj.len === spaceObj.len) {
                    // remove item
                    spaces.splice(idx, 1)
                } else {
                    // modify spaces array
                    spaces[idx] = {
                        idx: spaceObj.idx + numObj.len,
                        len: spaceObj.len - numObj.len,
                    }
                }

                break;
            }
        }
    });

    calculateChecksum(arr);
};

const calculateChecksum = (arr) => {
    let checksum = 0;

    arr.forEach((num, idx) => {
        if (num === -1) {
            return;
        }
        checksum += num * idx;
    });

    console.log(checksum);
};

const swap = (arr, s1, s2) => {
    [arr[s1], arr[s2]] = [arr[s2], arr[s1]];
};

const findNextSpace = (currentIndex, arr) => {
    for (let i = currentIndex; i < arr.length; i++) {
        if (arr[i] == -1) {
            return i;
        }
    }
};

const findNextNum = (currentIndex, arr) => {
    for (let i = currentIndex; i >= 0; i--) {
        if (arr[i] !== -1) {
            return i;
        }
    }
};

class Parser {
    result = [];
    nums = [];
    spaces = [];

    parseLine = (line) => {
        let freeSpace = false;
        let int = 0;

        let split = line.split("");

        split.forEach((num) => {
            const parsedNum = parseInt(num);

            if (freeSpace) {
                this.spaces.push({
                    idx: this.result.length,
                    len: parsedNum,
                });
            } else {
                this.nums.push({
                    idx: this.result.length,
                    num: int,
                    len: parsedNum,
                });
            }

            for (let i = 1; i <= parsedNum; i++) {
                if (freeSpace) {
                    this.result.push(-1);
                } else {
                    this.result.push(int);
                }
            }

            if (!freeSpace) {
                int++;
            }

            freeSpace = !freeSpace;
        });

        this.freeSpace = !this.freeSpace;
    };

    data = () => {
        return {
            data: this.result,
            nums: this.nums,
            spaces: this.spaces,
        };
    };
}

module.exports = main;
