const express = require('express');
const cors = require('cors');
const questionsRoutes = require('./routes/questionsRoutes');
const roundsRoutes = require('./routes/roundsRoutes');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use('/api/questions', questionsRoutes);
app.use('/api/rounds', roundsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});