/*
Terms:
- vertex - The points on the graph. A.k.a. "node"
- edge - A single step in a path that connects two vertices. In this kind of graph, these
         edges are directional (Ex: from point A to B) and have a numeric distance.
*/


// not using TypeScript, but adding commented interfaces here for documentation

/*
interface Node {
    name: string
    edges: Path
}

interface Path {
    dest: string
    dist: number
}

// this is created in the function so we can iterate through all the edges easily
interface FullPath {
    src: string
    dest: string
    dist: number
}
*/

/**
 * Given an array of vertices (nodes) in a graph, finds the shortest distance between two vertices.
 * 
 * 
 * @param {Node[]} nodes 
 * @param {string} startName 
 * @param {string} endName 
 * @returns {number} shortest distance between those two points
 */
function findShortestDistance(nodes, startName, endName) {
    const pathDistances = {}
    const allEdges = []
    for (let i = 0; i < nodes.length; i++) {
        const { name, edges } = nodes[i]
        pathDistances[name] = name === startName ? 0 : Number.MAX_SAFE_INTEGER
        allEdges.push(...(
            edges.map((p) => ({
                ...p,
                src: name
            }))
        ))
    }

    for (let i = 0; i < allEdges.length; i += 1) { // loop same number of times as edges that can be followed
        for (let j = 0; j < allEdges.length; j += 1) { // check all edges
            const { src, dest, dist } = allEdges[j]
            if (pathDistances[src] < Number.MAX_SAFE_INTEGER) {
                const newDist = Math.min(
                    pathDistances[dest],
                    pathDistances[src] + dist
                )
                // Note that I am modifying the distances directly here, so iterations aren't isolated.
                // We could end up finding shortest paths before the final iteration because a single
                // iteration could calculate multiple steps in a path, depending on the order the edges
                // are considered.
                pathDistances[dest] = Math.min(
                    pathDistances[dest],
                    newDist
                )
            }
        }
    }

    return pathDistances[endName]
}

function TEST_findShortestDistance(tree, startName, endName, exp) {
    const act = findShortestDistance(tree, startName, endName)
    const res = act === exp ? 'PASS' : 'FAIL'
    console.log(`${res}, act: ${act}, exp: ${exp}`)
}


const TEST_TREE_NODES = [
    {
        name: 'S',
        edges: [
            {
                dest: 'E',
                dist: 8
            }, {
                dest: 'A',
                dist: 10
            }
        ]
    },
    {
        name: 'E',
        edges: [
            {
                dest: 'D',
                dist: 1
            }
        ]
    },
    {
        name: 'A',
        edges: [
            {
                dest: 'C',
                dist: 2
            }
        ]
    },
    {
        name: 'D',
        edges: [
            {
                dest: 'A',
                dist: -4
            },
            {
                dest: 'C',
                dist: -1
            }
        ]
    },
    {
        name: 'C',
        edges: [
            {
                dest: 'B',
                dist: -2
            }
        ]
    },
    {
        name: 'B',
        edges: [
            {
                dest: 'A',
                dist: 1
            }
        ]
    }
]

TEST_findShortestDistance(TEST_TREE_NODES, 'S', 'S', 0)
TEST_findShortestDistance(TEST_TREE_NODES, 'S', 'A', 5)
TEST_findShortestDistance(TEST_TREE_NODES, 'S', 'B', 5)
TEST_findShortestDistance(TEST_TREE_NODES, 'S', 'C', 7)
TEST_findShortestDistance(TEST_TREE_NODES, 'S', 'D', 9)
TEST_findShortestDistance(TEST_TREE_NODES, 'S', 'E', 8)

// example with a negative shortest path
const TEST_TREE_NODES_2 = [
    {
        name: 'S',
        edges: [
            {
                dest: 'E',
                dist: 8
            },
            {
                dest: 'A',
                dist: 10
            }
        ]
    },
    {
        name: 'E',
        edges: [
            {
                dest: 'A',
                dist: -10
            }
        ]
    },
    {
        name: 'A',
        edges: []
    }
]


TEST_findShortestDistance(TEST_TREE_NODES_2, 'S', 'S', 0)
TEST_findShortestDistance(TEST_TREE_NODES_2, 'S', 'E', 8)
TEST_findShortestDistance(TEST_TREE_NODES_2, 'S', 'A', -2)