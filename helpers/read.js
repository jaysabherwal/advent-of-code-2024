const fs = require('node:fs/promises');

const read = async (parser, textfile) => {
    const file = await fs.open(`./data/${textfile}.txt`);
    
    for await (const line of file.readLines()) {
        parser.parseLine(line);
    }
    
    return parser.data();
};

module.exports = read;