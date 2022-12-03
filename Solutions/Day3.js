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

    console.log(totalScore);
});

const getMatch = (firstHalf, secondHalf) => {
    console.log(firstHalf, secondHalf)
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
