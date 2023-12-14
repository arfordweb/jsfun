A* Pathfinding Algorithm
========================

Finds the shortest path through a maze using the A* algorithm.

More info about A*: https://www.youtube.com/watch?v=-L-WgKMFuhE

Files
-----
- `astar4.js` - uses A* to solve a maze in which you can only move up, down, left, and right
  - The `4` in the name is the number of directions you can move in
  - See the example mazes and their solutions by running the source file

There is a variant of the problem definition where you can also move diagonally with a cost
of 1.4 rather than 1. That variant is not solved here. But it wouldn't be difficult to modify
this code to do so.

Running the source
------------------

At the command line, do:
```
npm install
node astar4/astar4.js
```