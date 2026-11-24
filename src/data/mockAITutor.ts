import { ChatMessage } from '../types';

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: `Hello Alex! 👋 I'm your **CodeQuest AI Tutor**. 

I can help guide you through algorithmic puzzles, break down complex concepts, analyze time and space complexity, or debug tricky edge cases without giving away full spoilers right away.

What are you working on today? Feel free to pick a prompt below or paste a snippet!`,
    timestamp: '10:00 AM',
    suggestedFollowUps: [
      'Explain the Sliding Window technique with an example',
      'Why is Hash Map lookup O(1) average time?',
      'How do I calculate recursion space complexity?',
      'Give me a hint for "LRU Cache"',
    ],
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'Could you explain why my dynamic programming solution for Coin Change has time complexity O(amount * n)?',
    timestamp: '10:02 AM',
  },
  {
    id: 'msg-3',
    sender: 'ai',
    text: `Great question! Let's break down the **Coin Change** bottom-up tabulation approach:

In the iterative solution, you build an array \`dp\` of size \`amount + 1\`, where \`dp[a]\` represents the minimum coins needed to make amount \`a\`.

### Nested Loop Structure:
1. **Outer loop**: Iterates through each sub-amount from \`1\` to \`amount\` (takes \`amount\` steps).
2. **Inner loop**: Iterates over every available coin denomination in \`coins\` (takes \`n = len(coins)\` steps).

Inside the inner loop, you perform a constant-time check and update:
\`\`\`python
if a - c >= 0:
    dp[a] = min(dp[a], 1 + dp[a - c])
\`\`\`

Since each state \`a\` examines all \`n\` coin options, the total operations performed is proportional to:
$$\\text{Total Operations} = \\text{amount} \\times n$$`,
    timestamp: '10:03 AM',
    complexityAnalysis: {
      time: 'O(amount × len(coins))',
      space: 'O(amount) for the DP table',
    },
    codeSnippet: {
      language: 'python',
      code: `def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] != float('inf') else -1`,
    },
    suggestedFollowUps: [
      'Can we optimize the space complexity further?',
      'How does this compare to the Unbounded Knapsack problem?',
      'What if we need to return the actual coin combination?',
    ],
  },
];

export const quickPromptPresets = [
  {
    id: 'qp-1',
    title: 'Explain Code',
    icon: 'BookOpen',
    prompt: 'Explain how this code works step-by-step with an intuitive diagram or example.',
  },
  {
    id: 'qp-2',
    title: 'Debug Solution',
    icon: 'Bug',
    prompt: 'Check my current implementation for potential edge cases, off-by-one errors, or infinite loops.',
  },
  {
    id: 'qp-3',
    title: 'Ask for Hint',
    icon: 'Lightbulb',
    prompt: 'Give me a subtle hint on how to approach this problem without spoiling the full solution.',
  },
  {
    id: 'qp-4',
    title: 'Big-O Complexity',
    icon: 'Gauge',
    prompt: 'Analyze the asymptotic Time Complexity and Space Complexity (Auxiliary memory + Call stack) of this solution.',
  },
  {
    id: 'qp-5',
    title: 'Generate Test Cases',
    icon: 'Sparkles',
    prompt: 'Generate 3 tricky edge test cases that could cause this algorithm to fail.',
  },
];
