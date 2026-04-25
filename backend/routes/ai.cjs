const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
console.log("🔑 Gemini API Key present:", !!process.env.VITE_GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || '');

/**
 * Helper function to calculate average dropout rate from data
 * Data has fields: Primary, UpperPrimary, Secondary (and gender variants)
 */
const calculateAvgDropout = (dataItem) => {
  const rates = [];
  if (dataItem.Primary !== undefined && dataItem.Primary !== null) rates.push(dataItem.Primary);
  if (dataItem.UpperPrimary !== undefined && dataItem.UpperPrimary !== null) rates.push(dataItem.UpperPrimary);
  if (dataItem.Secondary !== undefined && dataItem.Secondary !== null) rates.push(dataItem.Secondary);

  if (rates.length === 0) return null;
  return rates.reduce((sum, r) => sum + r, 0) / rates.length;
};

/**
 * Analyzes contextData locally to provide basic insights (Fallback)
 */
const analyzeDataLocally = (query, contextData) => {
  const lowerQuery = query.toLowerCase();
  const state = contextData.state || "National";
  const recentData = contextData.recentData || contextData.recentNationalAverages || [];
  const historicalData = contextData.historicalData || contextData.historicalNationalAverages || [];

  const allData = [...recentData, ...historicalData];
  if (allData.length === 0) return null;

  // Sort by year to get latest data
  const sortedData = [...allData].sort((a, b) => b.year.localeCompare(a.year));

  let response = "";
  let insights = [];
  let detailedReport = `# Dropout Analysis Report: ${state}\n\n`;

  if (state && state !== "National") {
    response += `Based on the available data for **${state}**, `;
    detailedReport += `## State: ${state}\n\n`;

    if (sortedData.length > 0) {
      const latestData = sortedData[0];
      const primaryRate = latestData.Primary;
      const secondaryRate = latestData.Secondary;
      const upperPrimaryRate = latestData.UpperPrimary;

      response += `the dropout rates for ${latestData.year} are:\n`;
      response += `- **Primary**: ${primaryRate !== undefined ? primaryRate.toFixed(1) + '%' : 'N/A'}\n`;
      response += `- **Upper Primary**: ${upperPrimaryRate !== undefined ? upperPrimaryRate.toFixed(1) + '%' : 'N/A'}\n`;
      response += `- **Secondary**: ${secondaryRate !== undefined ? secondaryRate.toFixed(1) + '%' : 'N/A'}\n`;

      // Add gender insights if available
      if (latestData.Secondary_Boys !== undefined && latestData.Secondary_Girls !== undefined) {
        const genderGap = latestData.Secondary_Girls - latestData.Secondary_Boys;
        if (Math.abs(genderGap) > 2) {
          insights.push(genderGap > 0 ? "Higher dropout among girls" : "Higher dropout among boys");
        }
      }

      // Calculate trend if multiple years available
      if (sortedData.length > 1) {
        const oldestData = sortedData[sortedData.length - 1];
        const latestAvg = calculateAvgDropout(latestData);
        const oldestAvg = calculateAvgDropout(oldestData);

        if (latestAvg !== null && oldestAvg !== null) {
          const trend = latestAvg - oldestAvg;
          if (trend < -1) {
            insights.push("Dropout rates decreasing");
            response += `\nEncouragingly, there has been an improvement of **${Math.abs(trend).toFixed(1)}%** since ${oldestData.year}. `;
          } else if (trend > 1) {
            insights.push("Dropout rates increasing");
            response += `\nThere has been an increase of **${trend.toFixed(1)}%** since ${oldestData.year}. `;
          } else {
            insights.push("Rates relatively stable");
          }
        }
      }

      insights.push(`Secondary: ${secondaryRate !== undefined ? secondaryRate.toFixed(1) + '%' : 'N/A'}`);
    }
  } else {
    response += "Looking at **national-level data**, ";
    detailedReport += `## National Overview\n\n`;

    if (sortedData.length > 0) {
      const latestData = sortedData[0];
      const avgDropout = calculateAvgDropout(latestData);

      if (avgDropout !== null) {
        response += `the average dropout rate for ${latestData.year} across all education levels is approximately **${avgDropout.toFixed(1)}%**. `;

        response += `\n\nBreakdown by level:\n`;
        response += `- **Primary**: ${latestData.Primary !== undefined ? latestData.Primary.toFixed(1) + '%' : 'N/A'}\n`;
        response += `- **Upper Primary**: ${latestData.UpperPrimary !== undefined ? latestData.UpperPrimary.toFixed(1) + '%' : 'N/A'}\n`;
        response += `- **Secondary**: ${latestData.Secondary !== undefined ? latestData.Secondary.toFixed(1) + '%' : 'N/A'}\n`;

        insights.push(`Avg dropout: ${avgDropout.toFixed(1)}%`);
      } else {
        response += "no dropout data is currently available.";
        insights.push("Data unavailable");
      }
    }
  }

  return {
    chatResponse: response || "I've analyzed the available data. Please explore the dashboard for detailed visualizations.",
    detailedReport,
    keyInsights: insights
  };
};


router.post('/chat/analyze', async (req, res) => {
  const { query, contextData, chatHistory = [] } = req.body;
  console.log(`🤖 AI Analysis Request: "${query}" (${chatHistory.length} previous messages)`);

  if (!process.env.VITE_GEMINI_API_KEY) {
    console.warn("VITE_GEMINI_API_KEY is missing, using local analysis fallback");
    const local = analyzeDataLocally(query, contextData);
    return res.json(local || { chatResponse: "AI Assistant is currently in offline mode.", detailedReport: "No data available.", keyInsights: [] });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // System prompt that makes it a general assistant with dropout data expertise
    const systemPrompt = `You are EduRetain AI Assistant - a friendly, helpful, and knowledgeable AI assistant.

CAPABILITIES:
1. **General Assistant**: You can help with any question - coding, math, science, writing, general knowledge, etc.
2. **Education Policy Expert**: You have special expertise in Indian education dropout data and can analyze trends.
3. **Conversational Memory**: You remember the previous messages in this conversation.

AVAILABLE DATA (when relevant):
${contextData && Object.keys(contextData).length > 0 && contextData.state ? JSON.stringify(contextData, null, 2).substring(0, 8000) : 'No specific dropout data requested for this query.'}

RESPONSE FORMAT:
Always respond with a JSON object:
{
  "chatResponse": "Your natural, conversational response. Use **bold** for emphasis. Be helpful and friendly.",
  "detailedReport": "If the query is about dropout data or education, provide a detailed markdown report. Otherwise, leave as empty string.",
  "keyInsights": ["2-3 short insight tags if relevant, otherwise empty array"]
}

IMPORTANT RULES:
- Be conversational and friendly - respond naturally to greetings like "hi", "hello"
- If asked about dropout data, use the provided context data
- For general questions (math, coding, writing, etc.), answer helpfully WITHOUT mentioning dropout data
- Keep responses concise but informative
- ALWAYS return valid JSON (no markdown code blocks around the JSON)`;

    let result;

    // Filter history to ensure it starts with 'user' role (Gemini requirement)
    let validHistory = chatHistory.filter(msg => msg.role && msg.content);

    // Find first user message index
    const firstUserIndex = validHistory.findIndex(msg => msg.role === 'user');
    if (firstUserIndex > 0) {
      validHistory = validHistory.slice(firstUserIndex);
    } else if (firstUserIndex === -1) {
      validHistory = []; // No user messages, use empty history
    }

    // Format history for Gemini
    const formattedHistory = validHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // If we have valid history, use multi-turn chat
    if (formattedHistory.length > 0) {
      console.log(`📜 Using chat history with ${formattedHistory.length} messages`);
      const chat = model.startChat({
        history: formattedHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      });
      result = await chat.sendMessage(`${systemPrompt}\n\nUSER QUERY: "${query}"`);
    } else {
      // No history, use simple generateContent
      console.log(`📝 No history, using simple generation`);
      result = await model.generateContent(`${systemPrompt}\n\nUSER QUERY: "${query}"`);
    }

    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      res.json(JSON.parse(cleanedText));
    } catch (e) {
      // If JSON parsing fails, wrap the response
      console.log("⚠️ JSON parse failed, wrapping response");
      res.json({
        chatResponse: text,
        detailedReport: "",
        keyInsights: []
      });
    }
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    const local = analyzeDataLocally(query, contextData);
    res.json(local || { chatResponse: "I encountered an error. Please try again.", detailedReport: "Error: " + error.message, keyInsights: [] });
  }
});

module.exports = router;
