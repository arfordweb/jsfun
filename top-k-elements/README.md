Top K Elements
==============

Compute the top K elements of an array of integers.

Source
======

- `topk_sort.js` -  A simple solution that uses `Array.prototype.sort()` on the list of
                    top K numbers each time a number is added. The runtime complexity
                    of this solution is O(n * log(n)) regardless of the value of k.


- `topK_heap.js` -  A similar solution that uses a Heap data structure. This runs in O(n * log(k))
                    because for each element we evaluate, it takes O(log(k)) to insert it into
                    our Heap and remove the last element if the Heap has grown to larger than `k`
                    element. This can be much faster than the array sorting solution if `k` is
                    much lower than the length of elements.