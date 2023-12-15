const { Heap } = require('heap-js')

function topK(elements, k) {
    let topKElements = new Heap(Heap.maxComparatorNumber)
    for (let i = 0; i < elements.length; i += 1) {
        topKElements.add(elements[i])
        if (topKElements.length > k) {
            const bottom = topKElements.bottom(1)[0]
            topKElements.remove(bottom)
        }
    }
    return topKElements.toArray()
        .sort((a, b) => b - a) // sorting so we get a predictable return value for tesing
}

function TEST_topK(elements, k, expected) {
    const actual = topK(elements, k)
    const result = JSON.stringify(actual) === JSON.stringify(expected) ? 'PASS' : 'FAIL'
    console.log(JSON.stringify({ result, elements, k, actual, expected }))
}

TEST_topK([1, 2, 3], 0, [])
TEST_topK([1, 2, 3], 3, [3, 2, 1])
TEST_topK([1, 2, 3], 100, [3, 2, 1])
TEST_topK([1, 2, 3, 4], 3, [4, 3, 2])
TEST_topK([1, 2, 3, 4], 1, [4])
TEST_topK([1234, 1235, 23, 24, 165, 235, 15, 234, 6, 13, 6], 6, [1235, 1234, 235, 234, 165, 24])
