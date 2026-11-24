import { ChatMessage } from '../types';
import { initialChatMessages, quickPromptPresets } from '../data/mockAITutor';
import { simulateNetworkDelay, ApiResponse } from './apiClient';

class AIService {
  private messages: ChatMessage[] = [...initialChatMessages];

  /**
   * [BACKEND INTEGRATION POINT]
   * GET /api/v1/ai/messages
   */
  async getMessages(): Promise<ApiResponse<ChatMessage[]>> {
    return simulateNetworkDelay([...this.messages], 150);
  }

  /**
   * [BACKEND INTEGRATION POINT]
   * POST /api/v1/ai/chat
   * Proxies request to LLM (e.g., Gemini 1.5/2.0 Flash or Claude 3.5 Sonnet) with system instructions for Socratic coding guidance.
   */
  async sendMessage(
    userText: string,
    context?: { challengeTitle?: string; language?: string; code?: string }
  ): Promise<ApiResponse<ChatMessage>> {
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    this.messages.push(userMsg);

    // Simulate AI thinking and response generation
    await new Promise((resolve) => setTimeout(resolve, 800));

    let aiReplyText = '';
    let complexity: { time: string; space: string } | undefined;
    let snippet: { language: string; code: string } | undefined;
    let followUps: string[] = [];

    const lower = userText.toLowerCase();

    if (lower.includes('complexity') || lower.includes('big-o')) {
      aiReplyText = `Here is the algorithmic complexity breakdown for ${context?.challengeTitle || 'this problem'}:

1. **Time Complexity**: **O(N)** — We perform a single pass through the sequence, doing constant time **O(1)** work at each step.
2. **Space Complexity**: **O(N)** — We utilize auxiliary storage proportional to the number of distinct elements encountered.

> **Key takeaway**: Hash-based lookups trade space for time, transforming what would be an $O(N^2)$ brute-force comparison into an optimal $O(N)$ solution.`;
      complexity = { time: 'O(N) linear time', space: 'O(N) auxiliary memory' };
      followUps = ['Can we solve it in O(1) space?', 'What are the worst-case hash collisions?'];
    } else if (lower.includes('hint') || lower.includes('spoil')) {
      aiReplyText = `Here's a gentle hint to guide your thinking:

💡 **Consider the subproblem structure**:
- Does knowing the optimal solution for a smaller input directly help you construct the solution for the current input?
- Try sketching out the decision tree for small inputs like $N=3$ or $N=4$. Notice any repeated branches?

Ask yourself: *Which state values uniquely identify a subproblem so we can cache results?*`;
      followUps = ['Show me the state transition formula', 'What is the base case?'];
    } else if (lower.includes('debug') || lower.includes('error')) {
      aiReplyText = `I analyzed the code for potential pitfalls:

🔍 **Points to check**:
1. **Empty / Null Input**: Ensure you check if the input array or string is empty before accessing index 0.
2. **Boundary Conditions**: Pay close attention to loop indices (e.g. \`<=\` vs \`<\`).
3. **Integer Overflow**: In languages like C++ or Java, large additions may exceed $2^{31} - 1$. Consider 64-bit integers (\`long long\` or \`long\`).

Would you like me to walk through a test case trace step-by-step?`;
      followUps = ['Walk through test case 1', 'How to handle empty inputs?'];
    } else {
      aiReplyText = `Great question! When tackling this problem, a high-yield pattern to consider is using a **Two-Pointer** or **Fast-Slow Pointer** technique.

By maintaining invariant pointers, you can prune the search space without allocating extra memory on the heap.

\`\`\`${context?.language || 'python'}
# High-level pattern demonstration:
left, right = 0, len(items) - 1
while left < right:
    # Evaluate current window state
    if condition(items[left], items[right]):
        left += 1
    else:
        right -= 1
\`\`\`

Let me know if you want me to elaborate on the edge cases or generate test inputs!`;
      snippet = {
        language: context?.language || 'python',
        code: `left, right = 0, len(items) - 1\nwhile left < right:\n    if condition(items[left], items[right]):\n        left += 1\n    else:\n        right -= 1`,
      };
      followUps = ['Analyze space complexity', 'Show edge cases to test'];
    }

    const aiMsg: ChatMessage = {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text: aiReplyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      complexityAnalysis: complexity,
      codeSnippet: snippet,
      suggestedFollowUps: followUps,
    };

    this.messages.push(aiMsg);

    return {
      success: true,
      data: aiMsg,
      timestamp: new Date().toISOString(),
    };
  }

  getQuickPresets() {
    return quickPromptPresets;
  }
}

export const aiService = new AIService();
