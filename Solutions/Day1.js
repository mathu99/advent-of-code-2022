const fs = require('fs');

fs.readFile('./Input/Day1.txt', (err, data) => {
    if (err) throw err;

    const food = data.toString().split(/\r?\n/);  // Split into lines
    const elves = [];

    let currentElf = 0;
    food.forEach(element => {
        if (element === '') {
            elves.push(currentElf);
            currentElf = 0;
        } else {
            currentElf += +element;
        }
    });

    const sorted = elves.sort((a, b) => a - b).reverse();

    console.log(`Part 1 - Heaviest - ${sorted[0]}`);
    console.log(`Part 2 - Top 3 Heaviest - ${sorted[0] + sorted[1] + sorted[2]}`);
});