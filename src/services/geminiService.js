
/**
 * Generates an AI response based on user query, context data, and chat history.
 * Calls the backend API which proxies to Gemini for security.
 * @param {string} query - The user's question.
 * @param {object} contextData - Relevant dropout data to contextualize the answer.
 * @param {array} chatHistory - Previous messages in the conversation.
 * @returns {Promise<object>} - JSON object with chatResponse and detailedReport.
 */
export const generateDropoutAnalysis = async (query, contextData, chatHistory = []) => {
  const apiUrl = '/api/chat/analyze';
  console.log(`🚀 Calling AI Analysis Service at ${apiUrl}...`, { query, historyLength: chatHistory.length });
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, contextData, chatHistory }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Service Error Response:", response.status, errorText);
      throw new Error(`Failed to fetch analysis: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("AI Service Error:", error);

    // Provide a polite fallback response
    return {
      chatResponse: "I'm having trouble connecting to my analysis engine right now. Please try again in a moment.",
      detailedReport: "# Service Unavailable\n\nThe AI analysis service is currently experiencing connectivity issues.",
      keyInsights: ["Service Offline"]
    };
  }
};
