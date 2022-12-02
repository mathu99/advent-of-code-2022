const fs = require('fs');

fs.readFile('./Input/Day2.txt', (err, data) => {
    if (err) throw err;

    const rounds = data.toString().split(/\r?\n/);  // Split into lines

    let scores = [];

    rounds.forEach(round => {
        let opponentChoice = round[0], myChoice = round[2];

        let result = 0;

        if (opponentChoice === 'A' && myChoice === 'X') result = 3;
        if (opponentChoice === 'B' && myChoice === 'Y') result = 3;
        if (opponentChoice === 'C' && myChoice === 'Z') result = 3;

        if (opponentChoice === 'A' && myChoice === 'Y') result = 6;
        if (opponentChoice === 'B' && myChoice === 'Z') result = 6;
        if (opponentChoice === 'C' && myChoice === 'X') result = 6;

        if (opponentChoice === 'A' && myChoice === 'Z') result = 0;
        if (opponentChoice === 'B' && myChoice === 'X') result = 0;
        if (opponentChoice === 'C' && myChoice === 'Y') result = 0;

        selectionPoints = myChoice === 'X' ? 1 : myChoice === 'Y' ? 2 : 3;

        scores.push(result + selectionPoints);
    });

    console.log('Part 1, ' + scores.reduce((a, b) => a + b));

    scores = [];
    rounds.forEach(round => {
        let opponentChoice = round[0], resultChoice = round[2], myChoice = 0, result;

        if (opponentChoice === 'A' && resultChoice === 'Y') { result = 3; myChoice = 'X' }
        if (opponentChoice === 'B' && resultChoice === 'Y') { result = 3; myChoice = 'Y' }
        if (opponentChoice === 'C' && resultChoice === 'Y') { result = 3; myChoice = 'Z' }

        if (opponentChoice === 'A' && resultChoice === 'Z') { result = 6; myChoice = 'Y' }
        if (opponentChoice === 'B' && resultChoice === 'Z') { result = 6; myChoice = 'Z' }
        if (opponentChoice === 'C' && resultChoice === 'Z') { result = 6; myChoice = 'X' }

        if (opponentChoice === 'A' && resultChoice === 'X') { result = 0; myChoice = 'Z' }
        if (opponentChoice === 'B' && resultChoice === 'X') { result = 0; myChoice = 'X' }
        if (opponentChoice === 'C' && resultChoice === 'X') { result = 0; myChoice = 'Y' }

        selectionPoints = (myChoice === 'X') ? 1 : (myChoice === 'Y') ? 2 : 3;

        scores.push(result + selectionPoints);
    });

    console.log('Part 2, ' + scores.reduce((a, b) => a + b));
});