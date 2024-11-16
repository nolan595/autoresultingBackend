const getStatValue = require('./getStatValue');

const evaluateStats = (question, statistics, team1Name, team2Name) => {


    if (!statistics) {
        console.error('Invalid statistics data in evaluateStats:', statistics);
        return {result: {team1: 0, team2: 0}, computedAnswer: 'No'}
    }

    const statData = getStatValue(statistics, question.statField, question.period);
    let result = statData;
    let computedAnswer;

    switch (question.operator) {
        case 'sum':
            computedAnswer = statData.team1 + statData.team2;
            break;
        case 'greaterThan':
            computedAnswer = (statData.team1 + statData.team2) > parseFloat(question.threshold) ? 'Yes' : 'No';
            break;
        case 'comparison':
            if (question.comparisonTarget === 'teams') {
                computedAnswer = statData.team1 > statData.team2 ? team1Name : statData.team2 > statData.team1 ? team2Name : 'Draw';
            } else if (question.comparisonTarget === 'periods') {
                const firstHalfData = getStatValue(statistics, question.statField, 1);
                const secondHalfData = getStatValue(statistics, question.statField, 2);
                if (!firstHalfData || !secondHalfData) {
                    console.error('Error fetching data for periods comparison');
                    return { result, computedAnswer: 'No data' };
                }
                const firstHalfTotal = firstHalfData.team1 + firstHalfData.team2;
                const secondHalfTotal = secondHalfData.team1 + secondHalfData.team2;
                computedAnswer = firstHalfTotal > secondHalfTotal ? 'First Half' : secondHalfTotal > firstHalfTotal ? 'Second Half' : 'Draw';
            }
            break;
        case 'singleTeam':
            computedAnswer = question.teamSelection === 'team1' ? statData.team1 : statData.team2;
            break;
        default:
            computedAnswer = 'Unknown Operator';
            break;
    }


    return { result, computedAnswer };
};
module.exports = evaluateStats;
