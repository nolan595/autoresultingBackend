const path = require('path')
const {readFromFile, writeToFile} = require('../utils/fileUtils');

const ROUNDS_FILE = path.join(__dirname, '../data/rounds.json');

exports.getRounds = (req, res) => {
    const rounds = readFromFile(ROUNDS_FILE)
    res.json(rounds);
}

exports.createRound = (req, res) => {
    const {title, statsFile, questions} = req.body;
    const rounds = readFromFile(ROUNDS_FILE);

    const newRound = {
        id: Date.now().toString(),
        title,
        statsFile,
        questions: questions.map(q => ({
            ...q, 
            answers: q.answers || [],
        }))
    }
    rounds.push(newRound);
    writeToFile(ROUNDS_FILE, rounds);
    res.status(201).json({message: 'round created'})
}

exports.updateRound = (req, res) => {
    const {id} = req.params;
    const updatedRound = req.body;
    const rounds = readFromFile(ROUNDS_FILE);
    const index = rounds.findIndex(r => r.id === id);
    if (index === -1) {
        return res.status(404).json({message: 'round not found'})
    }

    rounds[index] = {...rounds[index], ...updatedRound};
    writeToFile(ROUNDS_FILE, rounds);
    res.json({message: 'round updated'})
}

exports.deleteRound = (req, res) => {
    const {id} = req.params;
    let rounds = readFromFile(ROUNDS_FILE);
    rounds = rounds.filter(r => r.id !== id);
    writeToFile(ROUNDS_FILE, rounds);
    res.json({message: 'round deleted'})
}