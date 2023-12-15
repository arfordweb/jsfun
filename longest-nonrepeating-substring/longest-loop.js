/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    let f = 0 // first index of current substring being evaluated
    let res = 0
    let charSet = new Set()
    for (let i = 0; i < s.length; i += 1) {
        const char = s.charAt(i)
        if (charSet.has(char)) {
            res = Math.max(res, i - f)
            const oldF = f
            f = s.substring(f).indexOf(char) + f + 1
            for (let j = oldF; j < f; j += 1) {
                charSet.delete(s.charAt(j))
                charSet.add(char)
            }
        } else {
            charSet.add(char)
        }
    }
    return Math.max(res, s.length - f)
};

function TEST_lengthOfLongestSubstring(s, exp) {
    const act = lengthOfLongestSubstring(s)
    const res = act === exp ? 'PASS' : 'FAIL'
    console.log(JSON.stringify({
        res,
        s,
        act,
        exp
    }))
}

TEST_lengthOfLongestSubstring('', 0)
TEST_lengthOfLongestSubstring('aab', 2)
TEST_lengthOfLongestSubstring('abc', 3)
TEST_lengthOfLongestSubstring('abcabcbb', 3)
TEST_lengthOfLongestSubstring('aaa', 1)
TEST_lengthOfLongestSubstring('acbdeefg', 5)
TEST_lengthOfLongestSubstring('aaabbc', 2)
TEST_lengthOfLongestSubstring('pwwkew', 3)
