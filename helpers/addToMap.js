const addToMap = (map, key, value) => {
    if (map.has(key)) {
        map.get(key).push(value);
    } else {
        map.set(key, [value]);
    }
}

module.exports = addToMap;