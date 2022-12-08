const fs = require('fs');

let grid = [], size = 0, totalVisible = 0, bestScenicScore = 0;

fs.readFile('./Input/Day8.txt', (err, data) => {
    const lines = data.toString().split(/\r?\n/);

    lines.forEach(line => { /* Create grid */
        grid[size++] = line.split('');
    });

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            totalVisible += !invisible(x, y, grid.length, grid[x].length) ? 1 : 0;
            let scenicScore = getScenicScore(x, y, grid.length, grid[x].length);
            bestScenicScore = scenicScore > bestScenicScore ? scenicScore : bestScenicScore;
        }
    }

    console.log('Part 1, ' + totalVisible);
    console.log('Part 2,', bestScenicScore);
});

invisible = (xCoord, yCoord, height, length) => {
    if (xCoord === 0 || yCoord === 0 || (xCoord + 1 === height) || (yCoord + 1 === length)) {   /* the bounds are always visible */
        return false;
    }

    let valueToBeat = grid[xCoord][yCoord], leftBlock = false, rightBlock = false, topBlock = false, bottomBlock = false;

    for (let innerY = yCoord - 1; innerY >= 0; innerY--) { /* Test left */
        if (grid[xCoord][innerY] >= valueToBeat) {
            leftBlock = true;
            break;
        }
    }

    for (let innerY = yCoord + 1; innerY < length; innerY++) { /* Test right */
        if (grid[xCoord][innerY] >= valueToBeat) {
            rightBlock = true;
            break;
        }
    }

    for (let innerX = xCoord - 1; innerX >= 0; innerX--) { /* Test top */
        if (grid[innerX][yCoord] >= valueToBeat) {
            topBlock = true;
            break;
        }
    }

    for (let innerX = xCoord + 1; innerX < height; innerX++) { /* Test bottom */
        if (grid[innerX][yCoord] >= valueToBeat) {
            bottomBlock = true;
            break;
        }
    }
    let allBlock = topBlock && bottomBlock && leftBlock && rightBlock;

    return allBlock;
}

getScenicScore = (xCoord, yCoord, height, length) => {
    let valueToBeat = grid[xCoord][yCoord], scores = [0, 0, 0, 0];

    for (let innerY = yCoord - 1; innerY >= 0; innerY--) { /* Test left */
        scores[0]++;
        if (grid[xCoord][innerY] >= valueToBeat) break;
    }

    for (let innerY = yCoord + 1; innerY < length; innerY++) { /* Test right */
        scores[1]++;
        if (grid[xCoord][innerY] >= valueToBeat) break;
    }

    for (let innerX = xCoord - 1; innerX >= 0; innerX--) { /* Test top */
        scores[2]++;
        if (grid[innerX][yCoord] >= valueToBeat) break;
    }

    for (let innerX = xCoord + 1; innerX < height; innerX++) { /* Test bottom */
        scores[3]++;
        if (grid[innerX][yCoord] >= valueToBeat) break;
    }

    return scores.reduce((a,b) => a * b);
}