import graph from '../../data/graph.simple.json';
import complexGraph from '../../data/graph.json';
import { shortestPath } from '../shortest-path';

function assertShortestPath(src, dst, expected, testReverse = true) {
    let path = shortestPath(graph, src, dst);
    expect(path).toEqual(expected);

    if (testReverse) {
        path = shortestPath(graph, dst, src);
        expected = {...expected, path: [...expected.path].reverse()}
        expect(path).toEqual(expected);
    }
}

describe('Test Simple Graph', () => {
    test('shortest path', () => {
        assertShortestPath('A', 'C', {
            path: ['A', 'D', 'E', 'C'],
            value: 7
        });

        assertShortestPath('A', 'A', {
            path: ['A'],
            value: 0
        });

        assertShortestPath('A', 'B', {
            path: ['A', 'D', 'B'],
            value: 3
        });

        assertShortestPath('A', 'F', {
            path: [],
            value: Infinity
        }, false);
    });

    test('all shortest path', () => {
        const paths = shortestPath(graph, 'A');
        expect(paths).toMatchSnapshot();
    });
});

describe('Test Complex Graph', () => {
    test('all shortest path', () => {
        const paths = shortestPath(complexGraph, 'v0');
        expect(paths).toMatchSnapshot();
    });
});