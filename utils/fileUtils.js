/* This file is used to read and write to json files*/

const fs = require('fs');
const path = require('path');

// read from json file
const readFromFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data || '[]');        
    } catch (error) {
        console.error(`Error reading from file ${filePath}`, error)
        return [];
    }
}

// write to file

const writeToFile = (filePath) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing to file ${filePath}`);
    }
}

module.exports = {
    readFromFile,
    writeToFile
}