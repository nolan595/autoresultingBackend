const evaluateGoals = (scores, question, team1Name, team2Name) => {
    if (!scores || !Array.isArray(scores) ) {
        console.error('No scores data found');
        return { result: { team1: 0, team2: 0 }, computedAnswer: 'No' };
    }


    console.log('Extracted team names:', team1Name, team2Name);

    const scoreType = question.period === '0' ? 6 : parseInt(question.period);
    const scoreData = scores.find(score => score.type === scoreType);
    let result = { team1: 0, team2: 0 };
    let computedAnswer;

    if (!scoreData) return { result, computedAnswer: 'No' };

    const team1Goals = parseInt(scoreData.team1, 10) || 0;
    const team2Goals = parseInt(scoreData.team2, 10) || 0;
    result = { team1: team1Goals, team2: team2Goals };

    switch (question.operator) {
        case 'sum':
            computedAnswer = team1Goals + team2Goals;
            break;
        case 'greaterThan':
            computedAnswer = (team1Goals + team2Goals) > parseFloat(question.threshold) ? 'Yes' : 'No';
            break;
        case 'comparison':
            if (question.comparisonTarget === 'teams') {

        
                // Check if team1Goals and team2Goals are numbers
                if (isNaN(team1Goals) || isNaN(team2Goals)) {
                    console.error('Goals are not numbers:', { team1Goals, team2Goals });
                }
        
                if (team1Goals > team2Goals) {
                    computedAnswer = team1Name;
                } else if (team2Goals > team1Goals) { 
                    computedAnswer = team2Name;
                } else {
                    computedAnswer = 'Draw';
                }
            } else if (question.comparisonTarget === 'periods') {
                const firstHalf = scores.find(score => score.type === 1);
                const secondHalf = scores.find(score => score.type === 2);
                const firstHalfGoals = firstHalf ? firstHalf.team1 + firstHalf.team2 : 0;
                const secondHalfGoals = secondHalf ? secondHalf.team1 + secondHalf.team2 : 0;
                computedAnswer = firstHalfGoals > secondHalfGoals ? 'First Half' : secondHalfGoals > firstHalfGoals ? 'Second Half' : 'Draw';
            }
            break;
        case 'singleTeam':
            computedAnswer = question.teamSelection === 'team1' ? team1Goals : team2Goals;
            break;
        default:
            if (question.comparisonTarget === 'btts') {
                computedAnswer = (team1Goals > 0 && team2Goals > 0) ? 'Yes' : 'No';
            } else if (question.comparisonTarget === 'btts_over_2_5') {
                computedAnswer = (team1Goals > 0 && team2Goals > 0 && (team1Goals + team2Goals) > 2.5) ? 'Yes' : 'No';
            }
            break;
    }

    return { result, computedAnswer };
};

module.exports = evaluateGoals;
