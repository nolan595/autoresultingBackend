const express = require('express'); 

const {
    getRounds,
    createRound,
    updateRound,
    deleteRound
} = require('../controllers/roundsControllers');

const router = express.Router();

router.get('/', getRounds);
router.post('/', createRound);
router.put('/:id', updateRound);
router.delete('/:id', deleteRound);

module.exports = router;