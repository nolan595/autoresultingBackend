const express = require('express');
const { evaluateQuestion } = require('../controllers/resultsControllers');

const router = express.Router();

router.post('/evaluate', evaluateQuestion); // evaluate question through post request


module.exports = router;