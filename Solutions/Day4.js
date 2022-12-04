const fs = require('fs');

fs.readFile('./Input/Day4.txt', (err, data) => {
    if (err) throw err;

    const lines = data.toString().split(/\r?\n/);  // Split into lines
    let p1Count = 0;
    let p2Count = 0;

    lines.forEach(line => {
        let parts = line.split(','), part1 = [], part2 = [], startP1 = 0, endP1 = 0, startP2 = 0, endP2 = 0;

        startP1 = +parts[0].split('-')[0];
        endP1 = +parts[0].split('-')[1];

        startP2 = +parts[1].split('-')[0];
        endP2 = +parts[1].split('-')[1];

        if (startP1 >= startP2 && endP1 <= endP2) {
            p1Count++;
        } else if (startP2 >= startP1 && endP2 <= endP1) {
            p1Count++;
        }

        /* Part 2 */

        let p1 = [], p2 = [];

        for (let i = startP1; i <= endP1; i++) p1.push('' + i);
        for (let i = startP2; i <= endP2; i++) p2.push('' + i);

        let found = false;
        for (let i = 0; i < p1.length; i++) {
            if (p2.indexOf(p1[i]) > -1) {
                found = true;
                break;
            }
        }
        for (let i = 0; i < p2.length; i++) {
            if (p1.indexOf(p2[i]) > -1) {
                found = true;
                break;
            }
        }
        if (found) p2Count++;
    });

    console.log('Part 1 ', p1Count);
    console.log('Part 2 ', p2Count);
});