const fs = require('fs');

fs.readFile('./Input/Day6.txt', (err, data) => {
    if (err) throw err;

    const line = data.toString().split(/\r?\n/)[0];
    let currentBuffer = '', i;

    for (i = 0; i < line.length; i++) {
        if (currentBuffer.indexOf(line[i]) > -1) {
            let replaceStr = currentBuffer.substring(0, currentBuffer.indexOf(line[i]) + 1);
            currentBuffer = currentBuffer.replace(replaceStr, '');
        }
        currentBuffer += line[i];

        /* Part 1 */
        // if (currentBuffer.length === 4) {
        //     console.log('Part 1, ' + currentBuffer, i + 1);
        //     break;
        // }

        /* Part 2 */
        if (currentBuffer.length === 14) {
            console.log('Part 2, ' + currentBuffer, i + 1);
            break;
        }
    }
});