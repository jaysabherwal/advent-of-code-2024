const read = require('../helpers/read');

const main = async () => {
    const results = await read(new Parser(), '05');
    new PartOne().main(results);
    new PartTwo().main(results);
};

class PartTwo {
    main = (results) => {
        let { mappings, updates } = results;
        
        let middle_num_count = 0;
    
        updates.forEach(update => {
            middle_num_count += this.build(update, mappings);
        });
    
        console.log(middle_num_count);
    };

    build = (update, mappings) => {
        let result = [update[0]];
        let noChange = true;
        
        for (let i = 1; i < update.length; i++) {
            if (!mappings.get(update[i])) {
                result.push(update[i]);
                continue;
            }

            let overlapIdx = getOverlap(mappings.get(update[i]), result);
            
            if (overlapIdx !== Infinity) {
                result.splice(overlapIdx, 0, update[i]);
                noChange = false;
            } else {
                result.push(update[i])
            }
        };
        
        return noChange ? 0 : parseInt(result[Math.floor(result.length / 2)]);
    };
};

class PartOne {
    main = (results) => {
        let { mappings, updates } = results;
        
        let middle_num_count = 0;
    
        updates.forEach(update => {
            if (this.validateUpdate(update, mappings)) {
                middle_num_count += parseInt(update[Math.floor(update.length / 2)]);
            }
        });
    
        console.log(middle_num_count);
    };

    validateUpdate = (update, mappings) => {
        let seen = [update[0]];
        
        for (let i = 1; i < update.length; i++) {
            if (getOverlap(mappings.get(update[i]) ?? [], seen) !== Infinity) {
                return false;
            }
            seen.push(update[i])
        };
    
        return true;
    };
};

const getOverlap = (arr1, arr2) => {
    let map = new Map();
    let result = Infinity;

    arr2.forEach((ele, idx) => {
        map.set(ele, idx)
    });

    for (let i = 0; i < arr1.length; i++) {
        const idx = map.get(arr1[i]);
        if (idx !== undefined && idx < result) {
            result = idx;
        }
    };

    return result;
};

class Parser {
    startParsingUpdates = false;
    mappings = new Map();
    updates = [];


    parseLine = (line) => {
        if (line === '') {
            this.startParsingUpdates = true;
            return;
        }

        if (this.startParsingUpdates) {
            this.updates.push(line.split(','))
        } else {
            const [first, second] = line.split('|');
            
            if (this.mappings.has(first)) {
                this.mappings.get(first).push(second)
            } else {
                this.mappings.set(first, [second]);
            }
        }
    };

    data = () => {
        return {
            mappings: this.mappings,
            updates: this.updates
        };
    }
};

module.exports = main;