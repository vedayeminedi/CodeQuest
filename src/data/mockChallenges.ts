import { Challenge } from '../types';

export const mockChallenges: Challenge[] = [
  {
    id: 'cq-101',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    topic: 'Arrays',
    acceptanceRate: 53.4,
    xpReward: 25,
    status: 'Solved',
    companies: ['Google', 'Amazon', 'Meta', 'Apple'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] == 6, we return [1, 2].',
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers, but that would be O(N²). Can you do better?',
      'Can you use a Hash Map to check if the complement (target - nums[i]) already exists in O(1) time?',
      'Iterate through the array once: for each number, check if target - nums[i] is in the map. If yes, return indices; otherwise insert nums[i] with its index.',
    ],
    codeTemplates: {
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your solution here
        seen = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in seen:
                return [seen[diff], i]
            seen[n] = i
        return []
`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}
`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};
`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}
`,
    },
    testCases: [
      { id: 'tc-1', input: 'nums = [2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]' },
      { id: 'tc-2', input: 'nums = [3, 2, 4], target = 6', expectedOutput: '[1, 2]' },
      { id: 'tc-3', input: 'nums = [3, 3], target = 6', expectedOutput: '[0, 1]' },
    ],
    likes: 18450,
    dislikes: 620,
    author: 'CodeQuest Staff',
  },
  {
    id: 'cq-102',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    topic: 'Strings',
    acceptanceRate: 34.8,
    xpReward: 50,
    status: 'Solved',
    companies: ['Amazon', 'Microsoft', 'Bloomberg', 'Google'],
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.

A substring is a contiguous non-empty sequence of characters within a string.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3. Notice that "pwke" is a subsequence, not a substring.',
      },
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.',
    ],
    hints: [
      'Use a sliding window approach with two pointers (left and right).',
      'Maintain a set or dictionary of characters in the current window to quickly check for duplicates.',
      'When you encounter a duplicate character, advance the left pointer until the duplicate is eliminated.',
    ],
    codeTemplates: {
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_set = set()
        left = 0
        max_len = 0
        
        for right in range(len(s)):
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1
            char_set.add(s[right])
            max_len = max(max_len, right - left + 1)
            
        return max_len
`,
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  let charSet = new Set();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
`,
      typescript: `function lengthOfLongestSubstring(s: string): number {
  const set = new Set<string>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
`,
      cpp: `#include <string>
#include <unordered_set>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> charSet;
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); ++right) {
            while (charSet.count(s[right])) {
                charSet.erase(s[left]);
                left++;
            }
            charSet.insert(s[right]);
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
`,
      java: `import java.util.HashSet;
import java.util.Set;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> set = new HashSet<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            while (set.contains(s.charAt(right))) {
                set.remove(s.charAt(left));
                left++;
            }
            set.add(s.charAt(right));
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
`,
    },
    testCases: [
      { id: 'tc-1', input: 's = "abcabcbb"', expectedOutput: '3' },
      { id: 'tc-2', input: 's = "bbbbb"', expectedOutput: '1' },
      { id: 'tc-3', input: 's = "pwwkew"', expectedOutput: '3' },
    ],
    likes: 12900,
    dislikes: 410,
    author: 'CodeQuest Staff',
  },
  {
    id: 'cq-103',
    title: 'LRU Cache',
    slug: 'lru-cache',
    difficulty: 'Medium',
    topic: 'Linked Lists',
    acceptanceRate: 42.1,
    xpReward: 60,
    status: 'Attempted',
    companies: ['Amazon', 'Google', 'Microsoft', 'Uber'],
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size \`capacity\`.
- \`int get(int key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
- \`void put(int key, int value)\` Update the value of the \`key\` if the \`key\` exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, **evict** the least recently used key.

The functions \`get\` and \`put\` must each run in **O(1)** average time complexity.`,
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        explanation: 'LRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1);\nlRUCache.put(2, 2);\nlRUCache.get(1); // returns 1\nlRUCache.put(3, 3); // evicts key 2\nlRUCache.get(2); // returns -1 (not found)',
      },
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls will be made to get and put.',
    ],
    hints: [
      'How can you achieve O(1) lookups and O(1) removals and insertions?',
      'A Hash Map gives O(1) key lookups, while a Doubly Linked List gives O(1) node insertion and deletion at head/tail.',
      'Combine them: Hash Map maps key -> Doubly Linked List Node.',
    ],
    codeTemplates: {
      python: `class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._add(node)
        self.cache[key] = node
        if len(self.cache) > self.cap:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]

    def _remove(self, node):
        p, n = node.prev, node.next
        p.next, n.prev = n, p

    def _add(self, node):
        prev = self.tail.prev
        prev.next = node
        node.prev = prev
        node.next = self.tail
        self.tail.prev = node
`,
      javascript: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
  }
}
`,
      typescript: `class LRUCache {
  private capacity: number;
  private map: Map<number, number>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const firstKey = this.map.keys().next().value!;
      this.map.delete(firstKey);
    }
  }
}
`,
      cpp: `#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
    int cap;
    list<pair<int, int>> dll;
    unordered_map<int, list<pair<int, int>>::iterator> map;
public:
    LRUCache(int capacity) : cap(capacity) {}
    
    int get(int key) {
        if (map.find(key) == map.end()) return -1;
        dll.splice(dll.begin(), dll, map[key]);
        return map[key]->second;
    }
    
    void put(int key, int value) {
        if (map.find(key) != map.end()) {
            dll.splice(dll.begin(), dll, map[key]);
            map[key]->second = value;
            return;
        }
        if (dll.size() == cap) {
            int d_key = dll.back().first;
            dll.pop_back();
            map.erase(d_key);
        }
        dll.emplace_front(key, value);
        map[key] = dll.begin();
    }
};
`,
      java: `import java.util.LinkedHashMap;
import java.util.Map;

class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    public int get(int key) {
        return super.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        super.put(key, value);
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}
`,
    },
    testCases: [
      { id: 'tc-1', input: 'capacity = 2, operations = ["put(1,1)", "put(2,2)", "get(1)", "put(3,3)", "get(2)"]', expectedOutput: '[null, null, 1, null, -1]' },
      { id: 'tc-2', input: 'capacity = 1, operations = ["put(2,1)", "get(2)"]', expectedOutput: '[null, 1]' },
    ],
    likes: 21500,
    dislikes: 980,
    author: 'CodeQuest Staff',
  },
  {
    id: 'cq-104',
    title: 'Trapping Rain Water',
    slug: 'trapping-rain-water',
    difficulty: 'Hard',
    topic: 'Dynamic Programming',
    acceptanceRate: 60.2,
    xpReward: 100,
    status: 'Unsolved',
    companies: ['Google', 'Goldman Sachs', 'Amazon', 'Apple'],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The elevation map traps 6 units of rain water.',
      },
      {
        input: 'height = [4,2,0,3,2,5]',
        output: '9',
      },
    ],
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5',
    ],
    hints: [
      'For each position i, how much water can be trapped? It is determined by min(max_left, max_right) - height[i].',
      'Can you compute max_left and max_right efficiently using two pointers from both ends?',
    ],
    codeTemplates: {
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        if not height: return 0
        left, right = 0, len(height) - 1
        left_max, right_max = height[left], height[right]
        water = 0
        
        while left < right:
            if left_max < right_max:
                left += 1
                left_max = max(left_max, height[left])
                water += left_max - height[left]
            else:
                right -= 1
                right_max = max(right_max, height[right])
                water += right_max - height[right]
                
        return water
`,
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let total = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else total += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else total += rightMax - height[right];
      right--;
    }
  }
  return total;
}
`,
      typescript: `function trap(height: number[]): number {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let total = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else total += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else total += rightMax - height[right];
      right--;
    }
  }
  return total;
}
`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int left_max = 0, right_max = 0, res = 0;
        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= left_max) left_max = height[left];
                else res += left_max - height[left];
                left++;
            } else {
                if (height[right] >= right_max) right_max = height[right];
                else res += right_max - height[right];
                right--;
            }
        }
        return res;
    }
};
`,
      java: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, res = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else res += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else res += rightMax - height[right];
                right--;
            }
        }
        return res;
    }
}
`,
    },
    testCases: [
      { id: 'tc-1', input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6' },
      { id: 'tc-2', input: 'height = [4,2,0,3,2,5]', expectedOutput: '9' },
    ],
    likes: 31200,
    dislikes: 470,
    author: 'CodeQuest Staff',
  },
  {
    id: 'cq-105',
    title: 'Coin Change',
    slug: 'coin-change',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    acceptanceRate: 43.8,
    xpReward: 50,
    status: 'Solved',
    companies: ['Amazon', 'Bloomberg', 'TikTok', 'Microsoft'],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1 (3 coins)',
      },
      {
        input: 'coins = [2], amount = 3',
        output: '-1',
      },
      {
        input: 'coins = [1], amount = 0',
        output: '0',
      },
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4',
    ],
    hints: [
      'Think of it as subproblems: min coins for amount x is 1 + min(coins needed for x - coin).',
      'Build a DP array of size amount + 1 initialized to infinity (or amount + 1). Base case dp[0] = 0.',
    ],
    codeTemplates: {
      python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for a in range(1, amount + 1):
            for c in coins:
                if a - c >= 0:
                    dp[a] = min(dp[a], 1 + dp[a - c])
        return dp[amount] if dp[amount] != float('inf') else -1
`,
      javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a - c >= 0) {
        dp[a] = Math.min(dp[a], 1 + dp[a - c]);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
`,
      typescript: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a - c >= 0) {
        dp[a] = Math.min(dp[a], 1 + dp[a - c]);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int a = 1; a <= amount; ++a) {
            for (int c : coins) {
                if (a - c >= 0) {
                    dp[a] = min(dp[a], 1 + dp[a - c]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};
`,
      java: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (a - c >= 0) {
                    dp[a] = Math.min(dp[a], 1 + dp[a - c]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
`,
    },
    testCases: [
      { id: 'tc-1', input: 'coins = [1,2,5], amount = 11', expectedOutput: '3' },
      { id: 'tc-2', input: 'coins = [2], amount = 3', expectedOutput: '-1' },
      { id: 'tc-3', input: 'coins = [1], amount = 0', expectedOutput: '0' },
    ],
    likes: 19800,
    dislikes: 420,
    author: 'CodeQuest Staff',
  },
  {
    id: 'cq-106',
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order-traversal',
    difficulty: 'Medium',
    topic: 'Trees',
    acceptanceRate: 67.1,
    xpReward: 45,
    status: 'Solved',
    companies: ['Meta', 'Amazon', 'Microsoft', 'LinkedIn'],
    description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]',
      },
      {
        input: 'root = [1]',
        output: '[[1]]',
      },
      {
        input: 'root = []',
        output: '[]',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-1000 <= Node.val <= 1000',
    ],
    hints: [
      'Breadth First Search (BFS) using a queue is ideal for level order traversal.',
      'Record the size of the queue at the start of each level loop to process exactly that level.',
    ],
    codeTemplates: {
      python: `from collections import deque

class Solution:
    def levelOrder(self, root) -> list[list[int]]:
        if not root:
            return []
        res = []
        q = deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            res.append(level)
        return res
`,
      javascript: `function levelOrder(root) {
  if (!root) return [];
  const res = [];
  const queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(currentLevel);
  }
  return res;
}
`,
      typescript: `function levelOrder(root: any): number[][] {
  if (!root) return [];
  const res: number[][] = [];
  const queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(currentLevel);
  }
  return res;
}
`,
      cpp: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            for (int i = 0; i < sz; ++i) {
                TreeNode* node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(level);
        }
        return res;
    }
};
`,
      java: `import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            res.add(level);
        }
        return res;
    }
}
`,
    },
    testCases: [
      { id: 'tc-1', input: 'root = [3,9,20,null,null,15,7]', expectedOutput: '[[3],[9,20],[15,7]]' },
      { id: 'tc-2', input: 'root = [1]', expectedOutput: '[[1]]' },
    ],
    likes: 14200,
    dislikes: 310,
    author: 'CodeQuest Staff',
  },
  {
    id: 'cq-107',
    title: 'Course Schedule II',
    slug: 'course-schedule-ii',
    difficulty: 'Medium',
    topic: 'Graphs',
    acceptanceRate: 50.1,
    xpReward: 60,
    status: 'Solved',
    companies: ['Amazon', 'Google', 'Meta', 'Uber'],
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you must take course \`bi\` first if you want to take course \`ai\`.

Return the ordering of courses you should take to finish all courses. If there are many valid answers, return **any** of them. If it is impossible to finish all courses, return an **empty array**.`,
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: '[0,1]',
        explanation: 'There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].',
      },
      {
        input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
        output: '[0,2,1,3]',
      },
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= numCourses * (numCourses - 1)',
      'prerequisites[i].length == 2',
      'All the pairs [ai, bi] are distinct.',
    ],
    hints: [
      'This problem is equivalent to finding a Topological Sort in a Directed Graph.',
      'Kahn\'s Algorithm uses in-degrees and a queue. Start with courses that have in-degree 0.',
    ],
    codeTemplates: {
      python: `from collections import deque, defaultdict

class Solution:
    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:
        adj = defaultdict(list)
        indegree = [0] * numCourses
        for course, pre in prerequisites:
            adj[pre].append(course)
            indegree[course] += 1
            
        q = deque([i for i in range(numCourses) if indegree[i] == 0])
        order = []
        
        while q:
            curr = q.popleft()
            order.append(curr)
            for neighbor in adj[curr]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    q.append(neighbor)
                    
        return order if len(order) == numCourses else []
`,
      javascript: `function findOrder(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  const order = [];
  while (queue.length > 0) {
    const curr = queue.shift();
    order.push(curr);
    for (const next of adj[curr]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }
  return order.length === numCourses ? order : [];
}
`,
      typescript: `function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const inDegree = new Array(numCourses).fill(0);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  const order: number[] = [];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    order.push(curr);
    for (const next of adj[curr]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }
  return order.length === numCourses ? order : [];
}
`,
      cpp: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<int> inDegree(numCourses, 0);
        vector<vector<int>> adj(numCourses);
        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            inDegree[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; ++i) {
            if (inDegree[i] == 0) q.push(i);
        }
        vector<int> order;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            order.push_back(u);
            for (int v : adj[u]) {
                if (--inDegree[v] == 0) q.push(v);
            }
        }
        return order.size() == numCourses ? order : vector<int>{};
    }
};
`,
      java: `import java.util.*;

class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        int[] inDegree = new int[numCourses];
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            inDegree[p[0]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.offer(i);
        }
        int[] order = new int[numCourses];
        int index = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            order[index++] = curr;
            for (int next : adj.get(curr)) {
                if (--inDegree[next] == 0) q.offer(next);
            }
        }
        return index == numCourses ? order : new int[0];
    }
}
`,
    },
    testCases: [
      { id: 'tc-1', input: 'numCourses = 2, prerequisites = [[1,0]]', expectedOutput: '[0, 1]' },
      { id: 'tc-2', input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', expectedOutput: '[0, 2, 1, 3]' },
    ],
    likes: 11400,
    dislikes: 350,
    author: 'CodeQuest Staff',
  },
  {
    id: 'cq-108',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    topic: 'Stack & Queue',
    acceptanceRate: 40.5,
    xpReward: 20,
    status: 'Solved',
    companies: ['Amazon', 'Facebook', 'Bloomberg', 'Microsoft'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.',
    ],
    hints: [
      'Use a Stack to keep track of the most recent open bracket.',
      'When you see a closing bracket, check if it matches the top of the stack.',
    ],
    codeTemplates: {
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in mapping:
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:
                stack.append(char)
        return not stack
`,
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}
`,
      typescript: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}
`,
      cpp: `#include <string>
#include <stack>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> map = {{')', '('}, {'}', '{'}, {']', '['}};
        for (char c : s) {
            if (map.count(c)) {
                if (st.empty() || st.top() != map[c]) return false;
                st.pop();
            } else {
                st.push(c);
            }
        }
        return st.empty();
    }
};
`,
      java: `import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}
`,
    },
    testCases: [
      { id: 'tc-1', input: 's = "()"', expectedOutput: 'true' },
      { id: 'tc-2', input: 's = "()[]{}"', expectedOutput: 'true' },
      { id: 'tc-3', input: 's = "(]"', expectedOutput: 'false' },
    ],
    likes: 24100,
    dislikes: 1300,
    author: 'CodeQuest Staff',
  },
  {
    id: 'cq-109',
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    difficulty: 'Medium',
    topic: 'Sorting',
    acceptanceRate: 47.3,
    xpReward: 50,
    status: 'Unsolved',
    companies: ['Google', 'Meta', 'Amazon', 'Cisco'],
    description: `Given an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
        explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].',
      },
      {
        input: 'intervals = [[1,4],[4,5]]',
        output: '[[1,5]]',
        explanation: 'Intervals [1,4] and [4,5] are considered overlapping.',
      },
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= starti <= endi <= 10^4',
    ],
    hints: [
      'If we sort the intervals by their start time, all potentially overlapping intervals will be adjacent.',
      'Iterate through the sorted intervals: if current start <= previous end, merge by setting previous end = max(previous end, current end).',
    ],
    codeTemplates: {
      python: `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        intervals.sort(key=lambda x: x[0])
        merged = []
        for interval in intervals:
            if not merged or merged[-1][1] < interval[0]:
                merged.append(interval)
            else:
                merged[-1][1] = max(merged[-1][1], interval[1])
        return merged
`,
      javascript: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [];
  for (const interval of intervals) {
    if (!res.length || res[res.length - 1][1] < interval[0]) {
      res.push(interval);
    } else {
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], interval[1]);
    }
  }
  return res;
}
`,
      typescript: `function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [];
  for (const interval of intervals) {
    if (!res.length || res[res.length - 1][1] < interval[0]) {
      res.push(interval);
    } else {
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], interval[1]);
    }
  }
  return res;
}
`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        for (const auto& interval : intervals) {
            if (merged.empty() || merged.back()[1] < interval[0]) {
                merged.push_back(interval);
            } else {
                merged.back()[1] = max(merged.back()[1], interval[1]);
            }
        }
        return merged;
    }
};
`,
      java: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        LinkedList<int[]> merged = new LinkedList<>();
        for (int[] interval : intervals) {
            if (merged.isEmpty() || merged.getLast()[1] < interval[0]) {
                merged.add(interval);
            } else {
                merged.getLast()[1] = Math.max(merged.getLast()[1], interval[1]);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}
`,
    },
    testCases: [
      { id: 'tc-1', input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', expectedOutput: '[[1,6],[8,10],[15,18]]' },
      { id: 'tc-2', input: 'intervals = [[1,4],[4,5]]', expectedOutput: '[[1,5]]' },
    ],
    likes: 18100,
    dislikes: 640,
    author: 'CodeQuest Staff',
  },
  {
    id: 'cq-110',
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    difficulty: 'Hard',
    topic: 'Searching',
    acceptanceRate: 38.6,
    xpReward: 120,
    status: 'Unsolved',
    companies: ['Google', 'Microsoft', 'Apple', 'Meta'],
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the **median** of the two sorted arrays.

The overall run time complexity should be **O(log (m+n))**.`,
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.',
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.',
      },
    ],
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 <= m <= 1000',
      '0 <= n <= 1000',
      '1 <= m + n <= 2000',
      '-10^6 <= nums1[i], nums2[i] <= 10^6',
    ],
    hints: [
      'Binary search on the smaller array to partition both arrays such that elements on left side are <= elements on right side.',
      'Ensure the left partition has (m + n + 1) // 2 elements.',
    ],
    codeTemplates: {
      python: `class Solution:
    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:
        A, B = nums1, nums2
        if len(B) < len(A):
            A, B = B, A
        total = len(A) + len(B)
        half = total // 2
        l, r = 0, len(A) - 1
        
        while True:
            i = (l + r) // 2
            j = half - i - 2
            
            Aleft = A[i] if i >= 0 else float("-infinity")
            Aright = A[i + 1] if (i + 1) < len(A) else float("infinity")
            Bleft = B[j] if j >= 0 else float("-infinity")
            Bright = B[j + 1] if (j + 1) < len(B) else float("infinity")
            
            if Aleft <= Bright and Bleft <= Aright:
                if total % 2:
                    return min(Aright, Bright)
                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
            elif Aleft > Bright:
                r = i - 1
            else:
                l = i + 1
`,
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  let A = nums1, B = nums2;
  if (B.length < A.length) [A, B] = [B, A];
  const total = A.length + B.length;
  const half = Math.floor(total / 2);
  let l = 0, r = A.length - 1;

  while (true) {
    const i = Math.floor((l + r) / 2);
    const j = half - i - 2;

    const Aleft = i >= 0 ? A[i] : -Infinity;
    const Aright = (i + 1) < A.length ? A[i + 1] : Infinity;
    const Bleft = j >= 0 ? B[j] : -Infinity;
    const Bright = (j + 1) < B.length ? B[j + 1] : Infinity;

    if (Aleft <= Bright && Bleft <= Aright) {
      if (total % 2 !== 0) return Math.min(Aright, Bright);
      return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
    } else if (Aleft > Bright) {
      r = i - 1;
    } else {
      l = i + 1;
    }
  }
}
`,
      typescript: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let A = nums1, B = nums2;
  if (B.length < A.length) [A, B] = [B, A];
  const total = A.length + B.length;
  const half = Math.floor(total / 2);
  let l = 0, r = A.length - 1;

  while (true) {
    const i = Math.floor((l + r) / 2);
    const j = half - i - 2;

    const Aleft = i >= 0 ? A[i] : -Infinity;
    const Aright = (i + 1) < A.length ? A[i + 1] : Infinity;
    const Bleft = j >= 0 ? B[j] : -Infinity;
    const Bright = (j + 1) < B.length ? B[j + 1] : Infinity;

    if (Aleft <= Bright && Bleft <= Aright) {
      if (total % 2 !== 0) return Math.min(Aright, Bright);
      return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
    } else if (Aleft > Bright) {
      r = i - 1;
    } else {
      l = i + 1;
    }
  }
}
`,
      cpp: `#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.size(), n = nums2.size();
        int low = 0, high = m;
        while (low <= high) {
            int partitionX = (low + high) / 2;
            int partitionY = (m + n + 1) / 2 - partitionX;
            int maxLeftX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];
            int minRightX = (partitionX == m) ? INT_MAX : nums1[partitionX];
            int maxLeftY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];
            int minRightY = (partitionY == n) ? INT_MAX : nums2[partitionY];

            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                if ((m + n) % 2 == 0)
                    return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2.0;
                else
                    return max(maxLeftX, maxLeftY);
            } else if (maxLeftX > minRightY) {
                high = partitionX - 1;
            } else {
                low = partitionX + 1;
            }
        }
        return 0.0;
    }
};
`,
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.length, n = nums2.length;
        int low = 0, high = m;
        while (low <= high) {
            int partitionX = (low + high) / 2;
            int partitionY = (m + n + 1) / 2 - partitionX;
            int maxLeftX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
            int minRightX = (partitionX == m) ? Integer.MAX_VALUE : nums1[partitionX];
            int maxLeftY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
            int minRightY = (partitionY == n) ? Integer.MAX_VALUE : nums2[partitionY];

            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                if ((m + n) % 2 == 0)
                    return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2.0;
                else
                    return Math.max(maxLeftX, maxLeftY);
            } else if (maxLeftX > minRightY) {
                high = partitionX - 1;
            } else {
                low = partitionX + 1;
            }
        }
        return 0.0;
    }
}
`,
    },
    testCases: [
      { id: 'tc-1', input: 'nums1 = [1,3], nums2 = [2]', expectedOutput: '2.00000' },
      { id: 'tc-2', input: 'nums1 = [1,2], nums2 = [3,4]', expectedOutput: '2.50000' },
    ],
    likes: 27800,
    dislikes: 2900,
    author: 'CodeQuest Staff',
  },
];
