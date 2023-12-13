Bellman-Ford Algorithm
======================
Video: https://www.youtube.com/watch?v=obWXjtg0L64 (not mine)

Finds the shortest path from one point to another, regardless of whether the vertices
can be negative.

Note that this does not handle "negative cycles". A negative cycle is where a path exists from one point
to itself that has a negative distance. For instance, if you have the following paths:

S -> A = 1
A -> S = -2

Then you can get from S to itself via a path of -1 distance. But if you take the same path again, you've gotten
there in -2 steps. Repeating this path x number of times would give you a path of distance -x.
There are algorithms for detecting negative cycles that are not represented here.

More Info: https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm
