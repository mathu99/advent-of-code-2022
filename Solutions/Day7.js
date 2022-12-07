const fs = require('fs');

fs.readFile('./Input/Day7.txt', (err, data) => {
    if (err) throw err;

    const lines = data.toString().split(/\r?\n/);

    let root = {
        label: 'root',
        parentLabel: null,
        size: 0,
        children: [{
            label: '/',
            parentLabel: 'root',
            size: 0,
            children: [],
        }],
    }, workingObject = root;

    workingTest = null;

    lines.forEach(line => {
        let parts = line.split(' ');
        if (line.startsWith('$')) { /* Command */
            if (line.startsWith('$ cd')) {
                if (parts[2] === '..') {
                    findParent(root, workingObject.label, workingObject.parentLabel);
                    workingObject = workingTest;
                } else {
                    parent = workingObject;
                    workingObject = findObject(workingObject, parts[2]);
                }
            }
        } else {    /* Output - Add child */
            workingObject.children.push({
                parentLabel: workingObject.label,
                label: parts[1],
                size: parts[0] === 'dir' ? 0 : parts[0],
                children: parts[0] === 'dir' ? [] : null,
            })
        }
    });

    traverseTree(root);
    console.log('Part 1: ', totalScore);
    minBound = 30000000 - (70000000 - root.size);
    part2(root);
    console.log('Space to clear = ', minBound);
    console.log('Part 2: ', currentSelection);
});

/* Find all directories <= 100000 */
totalScore = 0, minBound = 0, currentSelection = 70000000, directories = [];

part2 = (node) => {
    if (!node.children) {
        return;
    }
    else {
        for (let i = 0; i < node.children.length; i++) {
            part2(node.children[i]);
        }
        if (node.size < currentSelection && node.size > minBound) {    /* Part 2 */
            currentSelection = node.size;
        }
        directories.push(node.size);
        return;
    }
}

traverseTree = (node) => {
    if (!node.children) {
        return +node.size;
    }
    else {
        for (let i = 0; i < node.children.length; i++) {
            node.size += traverseTree(node.children[i]);
        }
        if (+node.size <= 100000) { /* Directory */
            totalScore += +node.size;
        }
        return node.size;
    }
}


findObject = (leafNode, objectName) => {
    return (leafNode.children || []).find(e => e.label === objectName);
}

findParent = (node, label, parentLabel) => {
    workingTest = null;
    return findParentNode(node, label, parentLabel);
}

findParentNode = (node, label, parentLabel) => {
    if (!node || !node.children) return;
    else {
        if (node.children.find(e => e.label === label && node.label === parentLabel)) {
            workingTest = node;
            return;
        } else {
            for (let i = 0; i < node.children.length; i++) {
                findParentNode(node.children[i], label, parentLabel);
            }
        }
    }
}

