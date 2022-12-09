const fs = require('fs');

let positions = [];

fs.readFile('./Input/Day9.txt', (_, data) => {
    const lines = data.toString().split(/\r?\n/);

    let grid = new Array(5);
    for (let x = 0; x < grid.length; x++) {
        grid[x] = new Array(6).fill('.');
    }

    let head = { x: 4, y: 0 }, tail = { x: 4, y: 0 };

    console.log('== Initial State ==');
    console.log();
    printGrid(grid, head, tail);

    lines.forEach(line => {
        console.log();
        console.log(`== ${line} ==`);

        let direction = line[0], moves = +line[2];

        for (let i = 0; i < moves; i++) {   /* Keep moving */
            if (direction === 'R') {
                head.y++;
                if (Math.abs(head.y - tail.y) === 2) tail = { y: head.y - 1, x: head.x };
                if (head.y === tail.y) tail.y = tail.y; /* don't move */
                else if (head.y !== tail.y + 1) tail.y++;    /* If head and tail are on the same spot, only move head */
            }
            if (direction === 'L') {
                head.y--;
                if (Math.abs(head.y - tail.y) === 2) tail = { y: head.y + 1, x: head.x };
                if (head.y === tail.y) tail.y = tail.y; /* don't move */
                else if (head.y !== tail.y - 1) tail.y--;    /* If head and tail are on the same spot, only move head */
            }
            if (direction === 'U') {
                head.x--;
                if (Math.abs(head.x - tail.x) === 2) tail = { x: head.x + 1, y: head.y };
                if (head.x === tail.x) tail.x = tail.x; /* don't move */
                else if (head.x !== tail.x - 1) tail.x--;    /* If head and tail are on the same spot, only move head */
            }
            if (direction === 'D') {
                head.x++;
                if (Math.abs(head.x - tail.x) === 2) tail = { x: head.x - 1, y: head.y };
                if (head.x === tail.x) tail.x = tail.x; /* don't move */
                else if (head.x !== tail.x + 1) tail.x++;    /* If head and tail are on the same spot, only move head */
            }
            printGrid(grid, head, tail);
        }
    });

    positions = positions.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === positions.findIndex(obj => {
            return JSON.stringify(obj) === _value;
        });
    });

    console.log('Score ', positions.length);
});

printGrid = (grid, head, tail) => {
    for (let x = 0; x < grid.length; x++) {
        let str = '';
        for (let y = 0; y < grid[x].length; y++) {
            if (head.x === x && head.y === y) str += 'H';
            else if (tail.x === x && tail.y === y) {
                str += 'T';
                positions.push({ x, y });
            }
            else str += grid[x][y];
        }
        console.log(str);
    }
    console.log();
}
