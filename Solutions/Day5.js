const fs = require('fs');

fs.readFile('./Input/Day5.txt', (err, data) => {
    if (err) throw err;

    const lines = data.toString().split(/\r?\n/);  // Split into lines

    let queues = [];
    queues.push([]);
    queues.push([]);
    queues.push([]);
    queues.push([]);
    queues.push([]);
    queues.push([]);
    queues.push([]);
    queues.push([]);
    queues.push([]);

    lines.forEach(line => {
        if (line.startsWith('[')) { /* Input */
            if (line[1] !== ' ') queues[0].push(line[1]);
            if (line[5] !== ' ') queues[1].push(line[5]);
            if (line[9] !== ' ') queues[2].push(line[9]);
            if (line[13] !== ' ') queues[3].push(line[13]);
            if (line[17] !== ' ') queues[4].push(line[17]);
            if (line[21] !== ' ') queues[5].push(line[21]);
            if (line[25] !== ' ') queues[6].push(line[25]);
            if (line[29] !== ' ') queues[7].push(line[29]);
            if (line[33] !== ' ') queues[8].push(line[33]);
        }
    });

    for (let i = 0; i < queues.length; i++) queues[i].reverse();

    lines.forEach(line => {
        if (line.startsWith('move')) {  /* Instructions */
            let parts = line.split(' '), count = parts[1], from = parts[3], to = parts[5];

            for (let i = 0; i < count; i++) {   /* keep moving */
                let char = queues[from - 1].pop();
                queues[to - 1].push(char);
            }
        }
    });

    let part1 = ''
    for (let i = 0; i < queues.length; i++) part1 += queues[i][queues[i].length-1];
    console.log('Part 1: ', part1);

    /* Part 2 */

    queues = [];
    queues.push([]);
    queues.push([]);
    queues.push([]);
    queues.push([]);
    queues.push([]);
    queues.push([]);
    queues.push([]);
    queues.push([]);
    queues.push([]);

    lines.forEach(line => {
        if (line.startsWith('[')) { /* Input */
            if (line[1] !== ' ') queues[0].push(line[1]);
            if (line[5] !== ' ') queues[1].push(line[5]);
            if (line[9] !== ' ') queues[2].push(line[9]);
            if (line[13] !== ' ') queues[3].push(line[13]);
            if (line[17] !== ' ') queues[4].push(line[17]);
            if (line[21] !== ' ') queues[5].push(line[21]);
            if (line[25] !== ' ') queues[6].push(line[25]);
            if (line[29] !== ' ') queues[7].push(line[29]);
            if (line[33] !== ' ') queues[8].push(line[33]);
        }
    });

    for (let i = 0; i < queues.length; i++) queues[i].reverse();

    lines.forEach(line => {
        if (line.startsWith('move')) {  /* Instructions */
            let parts = line.split(' '), count = parts[1], from = parts[3], to = parts[5];

            let totalMove = '';
            for (let i = 0; i < count; i++) {   /* keep moving */
                totalMove += queues[from - 1].pop();
            }

            for (let i = totalMove.length - 1; i >= 0; i--) {
                queues[to - 1].push(totalMove[i]);
            }
        }
    });
    let part2 = ''
    for (let i = 0; i < queues.length; i++) part2 += queues[i][queues[i].length-1];
    console.log('Part 2: ', part2)

});