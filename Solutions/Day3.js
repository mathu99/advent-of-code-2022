const fs = require('fs');

const lowercase = 'abcdefghijklmnopqrstuvwxyz',
        uppercase = lowercase.toUpperCase();

fs.readFile('./Input/Day3.txt', (err, data) => {
    if (err) throw err;

    const lines = data.toString().split(/\r?\n/);  // Split into lines

    let totalScore = 0;

    lines.forEach(line => {
        let indexToSplit = line.length / 2;
        let firstHalf = line.slice(0, indexToSplit),
            secondHalf = line.slice(indexToSplit, line.length);
        totalScore += getMatch(firstHalf, secondHalf);
    });

    let rowCount = 0, part2Score = 0;
    lines.forEach(line => {
        rowCount++;
        if (rowCount % 3 === 0) {
            part2Score += getMatchLines(lines[rowCount - 1], lines[rowCount - 2], lines[rowCount - 3]);
        }
    });

    console.log('Part 1: ', totalScore);
    console.log('Part 2: ', part2Score);
});

const getMatch = (firstHalf, secondHalf) => {
    for (let i = 0; i < firstHalf.length; i++) {
        let char = firstHalf[i];
        if (secondHalf.indexOf(char) > -1) {
            if (lowercase.indexOf(char) > -1) {
                return lowercase.indexOf(char) + 1;
            } else {
                return uppercase.indexOf(char) + 27;
            }
        }
    }
}

const getMatchLines = (firstPart, secondPart, thirdPart) => {
    for (let i = 0; i < firstPart.length; i++) {
        let char = firstPart[i];
        if (secondPart.indexOf(char) > -1 && thirdPart.indexOf(char) > -1) {
            if (lowercase.indexOf(char) > -1) {
                return lowercase.indexOf(char) + 1;
            } else {
                return uppercase.indexOf(char) + 27;
            }
        }
    }
}
