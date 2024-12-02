const fs = require('node:fs/promises');

const read = async (parser) => {
    const file = await fs.open(`./data/01.txt`);
    
    for await (const line of file.readLines()) {
        parser.parseLine(line);
    }
    
    return parser.data();
};

module.exports = read;