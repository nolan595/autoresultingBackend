const express = require('express'); // import express

const {
    getQuestions,
    saveQuestion,
    updateQuestion,
    deleteQuestion
} = require('../controllers/questionsController');

const router = express.Router();

router.get('/', getQuestions); // get all questions
router.post('/', saveQuestion);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;

