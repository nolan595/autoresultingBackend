const path = require('path')
const {readFromFile, writeToFile} = require('../utils/fileUtils')

const QUESTIONS_FILE = path.join(__dirname, '../data/questions.json');

// get all questions
exports.getQuestions = (req, res) => {
    const questions = readFromFile(QUESTIONS_FILE)
    res.json(questions);
};

// create or update question
exports.saveQuestion = (req, res) => { 
    const newQuestion = req.body;
    if (!newQuestion || !newQuestion.id) { // if question data is invalid
        return res.status(400).json({error: 'Invalid question data'})
    }

    try {
        const questions = readFromFile(QUESTIONS_FILE);
        questions.push(newQuestion); // add new question to questions array
        writeToFile(QUESTIONS_FILE, questions)
        res.json({message: 'question saved'}) // return success message



    } catch (error) {
        res.status(500).json({error: 'Error saving question'}) // return error message        
    }


}

exports.updateQuestion = (req, res) => {
    const {id} = req.params;
    const updatedQuestion = req.body;
    const questions = readFromFile(QUESTIONS_FILE);
    const index = questions.findIndex(q => q.id.toString() === id.toString()); // find index of question
    if (index === -1) {
        return res.status(404).json({message: 'question not found'})
    } // if question not found

    questions[index] = {...questions[index], ...updatedQuestion};
    writeToFile(QUESTIONS_FILE, questions);
    res.json({message: 'question updated'})
}

exports.deleteQuestion = (req, res) => {
    const {id} = req.params;
    let questions = readFromFile(QUESTIONS_FILE);
    questions = questions.filter(q => q.id.toString() !== id.toString()); // remove question with given id
    writeToFile(QUESTIONS_FILE, questions); // write updated questions array to file
    res.json({message: 'question deleted'})
}