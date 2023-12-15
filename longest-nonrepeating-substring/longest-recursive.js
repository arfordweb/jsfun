/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    let charSet = new Set()
    for (let i = 0; i < s.length; i += 1) {
        const char = s.charAt(i)
        if (charSet.has(char)) {
            return Math.max(
                i, 
                lengthOfLongestSubstring(
                    s.substring(s.indexOf(char) + 1)
                )
            )
        }
        charSet.add(char)
    }
    return s.length
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

TEST_lengthOfLongestSubstring('abcabcbb', 3)
TEST_lengthOfLongestSubstring('aaa', 1)
TEST_lengthOfLongestSubstring('acbdeefg', 5)
