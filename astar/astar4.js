const { Heap } = require('heap-js')

function mazeStrToMaze(mazeStr) {
    const splitMazeStr = mazeStr.split('\n')
    let row = 0
    let xLength = 0
    const barriers = new Set()
    for (let i = 0; i < splitMazeStr.length; i += 1) {
        const rowStr = splitMazeStr[i]
        if (rowStr.charAt(0) === 'o' || rowStr.charAt(0) === 'X') {
            // row is valid maze row

            xLength = rowStr.length
            for (let j = 0; j < rowStr.length; j += 1) {
                if (rowStr.charAt(j) === 'X') {
                    barriers.add(`${j},${i}`)
                }
            }
            row += 1
        }
    }
    return {
        xLength,
        yLength: row,
        barriers
    }
}

function createPriorityComparator(end) {
    const [endX, endY] = end

    return function (a, b) { // both are Node objects
        const { x: ax, y: ay, g: ag } = a
        const { x: bx, y: by, g: bg } = b

        // f = distance to end node
        const af = Math.abs(ax - endX) + Math.abs(ay - endY)
        const bf = Math.abs(bx - endX) + Math.abs(by - endY)

        const aCost = af + ag
        const bCost = bf + bg

        return aCost - bCost
    }
}

/*
interface Maze {
    yLength: number
    xLength: number
    barriers: Set<[x, y]>
}

interface Node {
    // no need to store f, as it can be calculated on the fly

    // g = distance from start node
    g: number
    x: number
    y: number
    prev?: Node // previous node in the path; start has no previous node
}
*/


function solutionToMazeStr(xLength, yLength, barriers, closedNodes, start, end, solution) {
    const outLines = new Array(yLength)
    const [startX, startY] = start
    const [endX, endY] = end
    
    let curPathNode = solution
    const solutionNodes = new Set()
    while (curPathNode) {
        const { x, y } = curPathNode
        solutionNodes.add(`${x},${y}`)
        curPathNode = curPathNode.prev
    }

    for (let y = 0; y < yLength; y += 1) {
        const outRow = new Array(xLength)
        for (let x = 0; x < xLength; x += 1) {
            if (x === startX && y === startY) {
                outRow[x] = 'S'
            } else if (x === endX && y === endY) {
                outRow[x] = 'E'
            } else if (barriers.has(`${x},${y}`)) {
                outRow[x] = 'X'
            } else if (solutionNodes.has(`${x},${y}`)) {
                outRow[x] = 'P'
            } else if (closedNodes.has(`${x},${y}`)) {
                outRow[x] = 'C'
            } else {
                outRow[x] = 'o'
            }
        }
        outLines[y] = outRow.join('')
    }

    return outLines.join('\n')
}


/**
 * Solves a maze using the A* algorithm in which only up, down, left, and right movement are allowed.
 * 
 * @param {string} mazeStr Represented by a string with newlines at the end of each row, `o` representing
 *                      passable spaces, and an `X` representing obstacle spaces.
 * @param {[number, number]} start  [x, y] coordinate tuple, from top left
 * @param {[number, number]} end    [x, y] coordinate tuple, from top left
 * @return {[number, number][]} Array of Nodes in path taken, no including the start and end Nodes.
 */
function solveMaze(mazeStr, start, end) {
    const { xLength, yLength, barriers } = mazeStrToMaze(mazeStr) // (x, y) is boolMaze[y][x]
    const [startX, startY] = start
    const [endX, endY] = end
    const closedNodes = new Set() // set of coordinate strings like "1,2"
    const comparator = createPriorityComparator(end)
    const evalNodes = new Heap(comparator) // items are type Node

    let curNode = {
        x: startX,
        y: startY,
        g: 0,
        prev: null
    }
    let solution = null

    while (curNode && !solution) {
        const {
            x: curX,
            y: curY,
            g: curG
        } = curNode

        const nodeCoordStr = `${curNode.x},${curNode.y}`
        if (curNode.x === endX && curNode.y === endY) {
            solution = curNode
            break
        }
        if (!closedNodes.has(nodeCoordStr) && !barriers.has(nodeCoordStr)) {
            const newNodeTemplate = { x: curX, y: curY, g: curG + 1, prev: curNode }
            if (curX !== 0) evalNodes.push({ ...newNodeTemplate, x: curX - 1 })
            if (curX !== xLength - 1) evalNodes.push({ ...newNodeTemplate, x: curX + 1 })
            if (curY !== 0) evalNodes.push({ ...newNodeTemplate, y: curY - 1 })
            if (curY !== yLength) evalNodes.push({ ...newNodeTemplate, y: curY + 1 })
            closedNodes.add(nodeCoordStr)
        }
        curNode = evalNodes.pop()
    }
    if (!solution) {
        return 'No solution'
    }
    return solutionToMazeStr(xLength, yLength, barriers, closedNodes, start, end, solution)
}





function RUN_solveMaze(maze, start, end) {
    const solution = solveMaze(maze, start, end)
    console.log(`Running Start: ${start}  End: ${end}\nSolution:\n${solution}\n`)
}

const legend = "Legend: S - start, E - end, X - barrier, P - solution path, C - closed (or considered), o - unconsidered"


const maze0 = `
ooooooooooo
ooooooooooo
ooooooooooo
ooooooooooo
ooooooooooo
`.trim()

console.log(`Maze 0:\n${maze0}\n`)
console.log(legend)
RUN_solveMaze(maze0, [0, 0], [10, 4])

const maze1 = `
ooooooooooo
ooXXXXXXooo
oooooooXooo
oooooooXooo
ooooooooooo
`.trim()

console.log(`Maze 1:\n${maze1}\n`)
console.log(legend)
RUN_solveMaze(maze1, [0, 0], [4, 4])
RUN_solveMaze(maze1, [5, 0], [4, 4])
RUN_solveMaze(maze1, [0, 0], [10, 4])
RUN_solveMaze(maze1, [0, 0], [9, 4])


const maze2 = `
ooooooooooo
ooXXXXXXooo
ooXooooXooo
ooXXXXXXooo
ooooooooooo
`.trim()

console.log(`Maze 2:\n${maze2}\n`)
console.log(legend)
RUN_solveMaze(maze2, [0, 0], [10, 4])
RUN_solveMaze(maze2, [3, 2], [10, 4])


const maze3 = `
ooooooooooo
oXXXXXXXXXX
ooooooooooo
XXXXXXXXXoo
ooooooooooo
oXXXXXXXXXX
ooooooooooo
`.trim()

console.log(`Maze 3:\n${maze3}\n`)
console.log(legend)
RUN_solveMaze(maze3, [0, 0], [10, 6])
RUN_solveMaze(maze3, [10, 0], [10, 6])