const evaluateGoals = require('../utils/evaluateGoals');
const evaluateStats = require('../utils/evaluateStats');
const { evaluateQuestion } = require('../controllers/resultsControllers');
const path = require('path');
const { readFromFile } = require('../utils/fileUtils');

const mockDataPath = path.join(__dirname, '../data/madrid-Barca26-10.json');
const mockData = readFromFile(mockDataPath);

describe('Question Evaluation Tests', () => {
  test('Who will win?', () => {
    const question = {
      id: 1,
      text: "Who will win?",
      statField: "scores",
      period: "6",
      operator: "comparison",
      comparisonTarget: "teams",
      threshold: "",
      teamSelection: "",
      status: "enabled"
    };
    
    const result = evaluateGoals(mockData.scores, question, mockData.team1.name, mockData.team2.name);
    expect(result.computedAnswer).toBe("Barcelona"); // Adjust based on your actual data
  });

  test('What half will have more goals?', () => {
    const question = {
      id: 2,
      text: "What half will have more goals?",
      statField: "scores",
      period: "6",
      operator: "comparison",
      comparisonTarget: "periods",
      threshold: "",
      teamSelection: "",
      status: "enabled"
    };

    const result = evaluateGoals(mockData.scores, question);
    expect(result.computedAnswer).toBe("Second Half"); // Adjust based on your actual data
  });

  test('Which team will have more goals?', () => {
    const question = {
      id: 3,
      text: "Which team will have more goals?",
      statField: "scores",
      period: "6",
      operator: "comparison",
      comparisonTarget: "teams",
      threshold: "",
      teamSelection: "",
      status: "enabled"
    };

    const result = evaluateGoals(mockData.scores, question, mockData.team1.name, mockData.team2.name);
    expect(result.computedAnswer).toBe("Barcelona"); // Adjust based on your actual data
  });

  test('How many goals will the home team have?', () => {
    const question = {
      id: 4,
      text: "How many goals will the home team have?",
      statField: "scores",
      period: "6",
      operator: "singleTeam",
      comparisonTarget: "",
      threshold: "",
      teamSelection: "team1",
      status: "enabled"
    };

    const result = evaluateGoals(mockData.scores, question, mockData.team1.name, mockData.team2.name);
    expect(result.computedAnswer).toBe(0); // Adjust based on your actual data
  });

  test('Will BTTS?', () => {
    const question = {
      id: 5,
      text: "Will BTTS?",
      statField: "scores",
      period: "6",
      operator: "",
      comparisonTarget: "btts",
      threshold: "",
      teamSelection: "",
      status: "enabled"
    };

    const result = evaluateGoals(mockData.scores, question);
    expect(result.computedAnswer).toBe("No"); // Adjust based on your actual data
  });

  test('Will BTTS and over 2.5 goals?', () => {
    const question = {
      id: 6,
      text: "Will BTTS and over 2.5 goals?",
      statField: "scores",
      period: "6",
      operator: "",
      comparisonTarget: "btts_over_2_5",
      threshold: "",
      teamSelection: "",
      status: "enabled"
    };
    
    

    const result = evaluateGoals(mockData.scores, question);
    expect(result.computedAnswer).toBe("No"); // Adjust based on your actual data
  });

  test('Which team had more corners in the first half?', () => {
    const question = {
      id: 7,
      text: "Which team had more corners in the first half?",
      statField: "stats.football.match.corner_kicks",
      period: "1",
      operator: "comparison",
      comparisonTarget: "teams",
      threshold: "",
      teamSelection: "",
      status: "enabled"
    };

    const result = evaluateStats(question, mockData.statistics, mockData.team1.name, mockData.team2.name);
    expect(result.computedAnswer).toBe("Real Madrid"); // Adjust based on your actual data
  });

  test('Total corners in the game', () => {
    const question = {
      id: 8,
      text: "Total corners in the game",
      statField: "stats.football.match.corner_kicks",
      period: "0",
      operator: "sum",
      comparisonTarget: "",
      threshold: "",
      teamSelection: "",
      status: "enabled"
    };

    const result = evaluateStats(question, mockData.statistics);
    expect(result.computedAnswer).toBe(13); // Adjust based on your actual data
  });

  test('How many corners did the home team have?', () => {
    const question = {
      id: 9,
      text: "How many corners did the home team have?",
      statField: "stats.football.match.corner_kicks",
      period: "0",
      operator: "singleTeam",
      comparisonTarget: "",
      threshold: "",
      teamSelection: "team1",
      status: "enabled"
    };

    const result = evaluateStats(question, mockData.statistics);
    expect(result.computedAnswer).toBe(10); // Adjust based on your actual data
  });

  test('Was there over 8.5 corners?', () => {
    const question = {
      id: 10,
      text: "Was there over 8.5 corners?",
      statField: "stats.football.match.corner_kicks",
      period: "0",
      operator: "greaterThan",
      comparisonTarget: "",
      threshold: "8.5",
      teamSelection: "",
      status: "enabled"
    };

    const result = evaluateStats(question, mockData.statistics);
    expect(result.computedAnswer).toBe("Yes"); // Adjust based on your actual data
  });

  test('Which half had more corners?', () => {
    const question = {
      id: 11,
      text: "Which half had more corners?",
      statField: "stats.football.match.corner_kicks",
      period: "0",
      operator: "comparison",
      comparisonTarget: "periods",
      threshold: "",
      teamSelection: "",
      status: "enabled"
    };

    const result = evaluateStats(question, mockData.statistics);
    expect(result.computedAnswer).toBe("First Half"); // Adjust based on your actual data
  });
});
