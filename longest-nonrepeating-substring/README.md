Longest Nonrepeating Substring
==============================

https://leetcode.com/problems/longest-substring-without-repeating-characters/

Finds the *length* of the substring without two of the same character.

Source
------

`longest-recursive.js` -    Solves the problem by recursing. Each iteration takes a substring of the
                            previous string when a repeated character is found. The `Math.max` of the
                            lengths of all the found substrings is found this way.

`longest-loop.js` -         Solves using a loop instead. Faster and uses less memory. But not as easy
                            to understand, IMO.