interface Edge {
    target: string;
    weight: number;
}
interface AdjacencyList {
    [key: string]: Edge[];
}
