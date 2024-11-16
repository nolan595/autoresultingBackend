const path = require('path');
const { readFromFile } = require('../utils/fileUtils');
const evaluateGoals = require('../utils/evaluateGoals');
const evaluateStats = require('../utils/evaluateStats');

// Main function to evaluate the result based on the question type
exports.evaluateQuestion = (req, res) => {
    const { question, filePath } = req.body;



    if (!filePath) {
        return res.status(400).json({ error: 'File path is required' });
    }

    const dataFilePath = path.join(__dirname, `../data/${filePath}`);
    const data = readFromFile(dataFilePath);


    if (!data) {
        return res.status(500).json({ error: 'Unable to read data file' });
    }

    const team1Name = data.team1?.name || 'Home Team';
    const team2Name = data.team2?.name || 'Away Team';


    let evaluationResult;

    try {

        // Determine whether to use goals evaluation or general stats evaluation
        if (question.statField === 'scores' && data.scores) {
            evaluationResult = evaluateGoals(data.scores, question, team1Name, team2Name);
        } else  {
            evaluationResult = evaluateStats(question, data.statistics, team1Name, team2Name);
        }

        if (evaluationResult) {
            return res.json(evaluationResult);
        } else {
            return res.status(404).json({ error: 'No evaluation result found' });
        }
    } catch (error) {
        console.error('Error evaluating question:', error);
        return res.status(500).json({ error: 'Error evaluating question' });
    }
};
