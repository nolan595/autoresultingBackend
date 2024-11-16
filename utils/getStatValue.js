const getStatValue = (statistics, type, period) => {

    // Ensure statistics is a valid array
    if (!statistics || !Array.isArray(statistics)) {
        console.error('Invalid statistics data:', statistics);
        return { team1: 0, team2: 0 };
    }

    // Convert period to integer if it's a string
    const periodInt = parseInt(period, 10);
    const periodData = statistics.find(item => item.period === periodInt);
    
    if (!periodData) {
        console.error(`No data found for period: ${periodInt}`);
        return { team1: 0, team2: 0 };
    }

    // Validate that periodData.data is an array
    if (!Array.isArray(periodData.data)) {
        console.error('No valid data array in periodData:', periodData);
        return { team1: 0, team2: 0 };
    }

    // Find the specific stat entry by matching type and args
    const statEntry = periodData.data.find(entry => {
        return entry.text && entry.text.args && entry.text.args.includes(type);
    });

    // Log if no stat entry is found
    if (!statEntry) {
        console.error(`No stat entry found for type: ${type} in period ${period}`);
        return { team1: 0, team2: 0 };
    }


    // Parse team1 and team2 values safely
    const team1Value = parseInt(statEntry.team1, 10) || 0;
    const team2Value = parseInt(statEntry.team2, 10) || 0;


    return { team1: team1Value, team2: team2Value };
};

module.exports = getStatValue;
