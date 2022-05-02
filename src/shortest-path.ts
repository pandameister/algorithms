interface ShortestPathInfo {
    [key: string]: {
        value: number;
        prevVertex: string | undefined;
    };
}
interface PathInfo {
    path: string[];
    value: number;
}

function initializeShortestPathInfo(graph: AdjacencyList, startVertex: string): ShortestPathInfo {
    const info: ShortestPathInfo = {};

    return Object.keys(graph).reduce((prev, curr) => {
        prev[curr] = {
            value: curr === startVertex ? 0 : Infinity,
            prevVertex: undefined
        };
        return prev;
    }, info);
}

function findVertextWithMinValue(vertices: string[], info: ShortestPathInfo): string {
    let minIdx: number | undefined;

    vertices.forEach((v, i) => {
        if (minIdx == null || info[v].value < info[vertices[minIdx]].value) {
            minIdx = i;
        }
    });

    return vertices.splice(minIdx!, 1)[0];
}

function computePath(info: ShortestPathInfo, targetVertex: string): string[] {
    const path = [];
    let curr: string | undefined = targetVertex;

    if (info[curr].value === Infinity) {
        return [];
    }

    while (curr != null) {
        path.push(curr);
        curr = info[curr].prevVertex;
    }

    return path.reverse();
}

function computeShortestPathInfo(graph: AdjacencyList, startVertex: string, endVertex?: string): ShortestPathInfo {
    const info = initializeShortestPathInfo(graph, startVertex);
    const unvisited = Object.keys(graph);

    while (unvisited.length > 0) {
        const vertex = findVertextWithMinValue(unvisited, info);

        // we can stop if reached the endVertex
        if (vertex === endVertex) {
            break;
        }

        const edges = graph[vertex];
        const vertexInfo = info[vertex];

        for (const edge of edges) {
            const targetInfo = info[edge.target];

            const targetValue = vertexInfo.value + edge.weight;
            if (targetInfo.value > targetValue) {
                targetInfo.value = targetValue;
                targetInfo.prevVertex = vertex;
            }
        }
    }

    return info;
}

/**
 * Computes the shortest path(s) for a graph from a given vertex
 *
 * @param graph - The graph
 * @param startVertex - The start vertex
 * @param endVertex - The end vertex. If no end vertex is provided, all paths are computed
 * @returns The shortest path or an array of shortest paths
 */
export function shortestPath(graph: AdjacencyList, startVertex: string, endVertex?: string): PathInfo | PathInfo[] {
    if (endVertex != null) {
        const info = computeShortestPathInfo(graph, startVertex, endVertex);
        return { path: computePath(info, endVertex), value: info[endVertex].value };
    } else {
        const info = computeShortestPathInfo(graph, startVertex);

        return Object.keys(graph)
            .map((endVertex) => {
                return { path: computePath(info, endVertex), value: info[endVertex].value };
            })
            .filter((path) => path.value !== Infinity);
    }
}
