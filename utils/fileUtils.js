/* This file is used to read and write to json files*/

const { json } = require('express');
const fs = require('fs');
const path = require('path');

// read from json file
const readFromFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const parsedData = JSON.parse(data);
        return parsedData;
    } catch (error) {
        console.error(`Error reading from file ${filePath}`, error)
        return [];
    }
}

// write to file
const writeToFile = (filePath, data) => {
    try {

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    } catch (error) {
        console.error(`Error writing to file ${filePath}`);
        console.error(`Error details: ${error}`);
    }
}

module.exports = {
    readFromFile,
    writeToFile
}