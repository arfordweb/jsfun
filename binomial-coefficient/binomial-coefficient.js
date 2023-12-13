class FactorialError extends Error {
    constructor(message) {
        super(message)
    }
}

class BinaryCoefficientError extends Error {
    constructor(message) {
        super(message)
    }
}

function isInt(n) {
    return n % 1 === 0
}

/**
 * @param {number} n    Must be a non-negative integer
 * @returns 
 */
function factorial(n) {
    if (!isInt(n)) {
        throw new FactorialError(`Unable to calculate. n (${n}) must be an integer`)
    }
    if (n < 0) {
        throw new FactorialError(`Unable to calculate. n (${n}) must be a non-negative integer.`)
    }
    let f = 1
    for (let i = 2; i <= n; i += 1) {
        f = f * i
    }
    return Math.round(f)
}

function TESTfactorial(n, expected) {
    try {
        const actual = factorial(n)
        const result = actual === expected ? 'PASS' : 'FAIL'
        console.log(`factorial(n) result: ${result}, n: ${n}, actual: ${actual}, expected: ${expected}`)
    } catch (e) {
        const errorName = e.constructor.name // not safe for minification
        const result = errorName === expected ? 'PASS' : 'FAIL'
        console.log(`factorial(n) result: ${result}, ${errorName} thrown`)
    }
}

TESTfactorial(1.3, 'FactorialError')
TESTfactorial(-1, 'FactorialError')
TESTfactorial(1, 1)
TESTfactorial(2, 2)
TESTfactorial(3, 6)
TESTfactorial(4, 24)
TESTfactorial(5, 120)
TESTfactorial(6, 720)
TESTfactorial(7, 5040)
TESTfactorial(8, 40320)
TESTfactorial(9, 362880)
TESTfactorial(10, 3628800)

/**
 * Calculates a Binomial Coeffient, a.k.a. the "Choose Function" of two numbers.
 * 
 * If we want to choose `r` number of items from `n` items, we want to calculate `binCof(n, r)`. For instance,
 * if we want to know all the combinations of `r` balls from `n` balls, we calculate `binCof(6, 2)`.
 * 
 * Both numbers should be non-negative integers and `n` must be greater or equal to `r`.
 * 
 * @param {number} n 
 * @param {number} r 
 * @returns {number}
 * @throws {BinaryCoefficientError}
 */
function binCof(n, r) {
    if (!isInt(n) || !isInt(r)) {
        throw new BinaryCoefficientError(`Unable to calculate. n (${n}) and r (${r}) must be integers`)
    }
    if (n < r) {
        throw new BinaryCoefficientError(`Unable to calculate. n (${n}) must greater than or equal to r (${r})`)
    }
    if (n < 0 || r < 0) {
        throw new BinaryCoefficientError(`Unable to calculate. n (${n}) and r (${r}) must be non-negative integers`)
    }

    // optimizations
    if (r === 0 || n === r) {
        return 1
    }
    if (r === 1 || n - 1 === r) {
        return n
    }

    return Math.round(factorial(n) / (factorial(r) * factorial(n - r)))
}

function TESTbinCof(n, r, expected) {
    try {
        const actual = binCof(n, r)
        const result = actual === expected ? 'PASS' : 'FAIL'
        console.log(`binCof(n) result: ${result}, n: ${n}, r: ${r}, actual: ${actual}, expected: ${expected}`)
    } catch (e) {
        const errorName = e.constructor.name // not safe for minification
        const result = errorName === expected ? 'PASS' : 'FAIL'
        console.log(`binCof(n) result: ${result}, n: ${n}, r: ${r}, error: ${errorName}, expected: ${expected}`)
        console.log(`  ${e.message}`)
    }
}

TESTbinCof(1, 1, 1)
TESTbinCof(2, 1, 2)
TESTbinCof(3, 1, 3)
TESTbinCof(4, 1, 4)
TESTbinCof(4, 2, 6)
TESTbinCof(3, 2, 3)
TESTbinCof(5, 4, 5)
TESTbinCof(5, 3, 10)
TESTbinCof(6, 4, 15)
TESTbinCof(25, 23, 300)
TESTbinCof(8, 6, 28)
TESTbinCof(8, 3, 56)
TESTbinCof(16, 13, 560)
TESTbinCof(3, 8, 'BinaryCoefficientError')
TESTbinCof(3, -1, 'BinaryCoefficientError')
TESTbinCof(10, 3, 120)
TESTbinCof(100, 6, 1192052400)
