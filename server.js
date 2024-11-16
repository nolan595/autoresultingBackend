const express = require('express');
const cors = require('cors');
const questionsRoutes = require('./routes/questionsRoutes');
const roundsRoutes = require('./routes/roundsRoutes');
const resultsRoutes = require('./routes/resultRoutes');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use('/api/questions', questionsRoutes);
app.use('/api/rounds', roundsRoutes);
app.use('/api/results', resultsRoutes);

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(204);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});