const fs = require('fs');

const maxWeight = 100;
const numVertices = 20;
const maxEdges = numVertices;

const graph: AdjacencyList = {};

function randomInt(maxValue: number) {
    return Math.floor(Math.random() * (maxValue + 1));
}

function generateEdges(): any {
    const numEdges = Math.ceil(Math.random() * maxEdges);
    const targets = new Set();

    for (let i = 0; i < numEdges; i++) {
        targets.add({ target: vertexName(randomInt(numVertices - 1)), weight: randomInt(maxWeight) });
    }

    return Array.from(targets);
}

function vertexName(i: number): string {
    return `v${i}`;
}

for (let i = 0; i < numVertices; i++) {
    graph[vertexName(i)] = generateEdges();
}

fs.writeFileSync('./data/graph.json', JSON.stringify(graph, null, '  '));
