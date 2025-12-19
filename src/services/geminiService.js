
import { GoogleGenerativeAI } from "@google/generative-ai";

// API Key provided by user (Env variable preferred)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBl3rAzrqUxprV7F23ku5zOGZKb0kWP5Wo";
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Analyzes contextData locally to provide basic insights
 */
const analyzeDataLocally = (query, contextData) => {
  const lowerQuery = query.toLowerCase();
  const state = contextData.state || "National";
  const recentData = contextData.recentData || contextData.recentNationalAverages || [];
  const historicalData = contextData.historicalData || contextData.historicalNationalAverages || [];
  
  // Extract relevant metrics
  const allData = [...recentData, ...historicalData];
  
  if (allData.length === 0) {
    return null; // No data to analyze
  }

  // Calculate averages and trends
  const primaryData = allData.filter(d => d.level === 'Primary').sort((a, b) => a.year.localeCompare(b.year));
  const secondaryData = allData.filter(d => d.level === 'Secondary').sort((a, b) => a.year.localeCompare(b.year));
  
  let response = "";
  let insights = [];
  let detailedReport = `# Dropout Analysis Report: ${state}\n\n`;
  
  // State-specific analysis
  if (state && state !== "National") {
    response += `Based on the available data for **${state}**, `;
    detailedReport += `## State: ${state}\n\n`;
    
    if (recentData.length > 0) {
      const latestYear = recentData[recentData.length - 1];
      const latestRate = latestYear.dropoutRate || latestYear.total;
      response += `the most recent dropout rate (${latestYear.year}) is approximately **${latestRate?.toFixed(2)}%**. `;
      
      if (recentData.length > 1) {
        const earliestRate = recentData[0].dropoutRate || recentData[0].total;
        const trend = latestRate - earliestRate;
        if (trend > 0) {
          response += `There has been an **increase of ${trend.toFixed(2)}%** from earlier years, indicating a concerning trend. `;
          insights.push("Dropout rates increasing");
        } else {
          response += `Encouragingly, there has been a **decrease of ${Math.abs(trend).toFixed(2)}%** from earlier years. `;
          insights.push("Dropout rates decreasing");
        }
      }
      
      detailedReport += `### Recent Trends (2017-2022)\n`;
      recentData.forEach(d => {
        detailedReport += `- **${d.year}**: ${(d.dropoutRate || d.total)?.toFixed(2)}% (${d.level || 'All levels'})\n`;
      });
    }
  } else {
    // National analysis
    response += "Looking at **national-level data**, ";
    detailedReport += `## National Overview\n\n`;
    
    if (allData.length > 0) {
      const avgDropout = allData.reduce((sum, d) => sum + (d.dropoutRate || d.total || 0), 0) / allData.length;
      response += `the average dropout rate across all education levels is approximately **${avgDropout.toFixed(2)}%**. `;
      insights.push(`Avg dropout: ${avgDropout.toFixed(1)}%`);
    }
  }
  
  // Gender analysis
  if (lowerQuery.includes('gender') || lowerQuery.includes('boy') || lowerQuery.includes('girl')) {
    const genderData = allData.filter(d => d.boys !== undefined && d.girls !== undefined);
    if (genderData.length > 0) {
      const avgBoys = genderData.reduce((sum, d) => sum + d.boys, 0) / genderData.length;
      const avgGirls = genderData.reduce((sum, d) => sum + d.girls, 0) / genderData.length;
      const gap = Math.abs(avgBoys - avgGirls);
      
      response += `\n\nRegarding **gender disparities**, `;
      if (avgBoys > avgGirls) {
        response += `boys have a higher average dropout rate (**${avgBoys.toFixed(2)}%**) compared to girls (**${avgGirls.toFixed(2)}%**), with a gap of **${gap.toFixed(2)}%**. `;
        insights.push("Boys dropout more than girls");
      } else {
        response += `girls have a higher average dropout rate (**${avgGirls.toFixed(2)}%**) compared to boys (**${avgBoys.toFixed(2)}%**), with a gap of **${gap.toFixed(2)}%**. `;
        insights.push("Girls dropout more than boys");
      }
      
      detailedReport += `\n### Gender Analysis\n`;
      detailedReport += `- **Boys Average**: ${avgBoys.toFixed(2)}%\n`;
      detailedReport += `- **Girls Average**: ${avgGirls.toFixed(2)}%\n`;
      detailedReport += `- **Gap**: ${gap.toFixed(2)}%\n`;
    }
  }
  
  // Education level comparison
  if (lowerQuery.includes('primary') || lowerQuery.includes('secondary') || lowerQuery.includes('level')) {
    if (primaryData.length > 0 && secondaryData.length > 0) {
      const avgPrimary = primaryData.reduce((sum, d) => sum + (d.dropoutRate || d.total || 0), 0) / primaryData.length;
      const avgSecondary = secondaryData.reduce((sum, d) => sum + (d.dropoutRate || d.total || 0), 0) / secondaryData.length;
      
      response += `\n\nComparing education levels, **Secondary education** has ${avgSecondary > avgPrimary ? 'higher' : 'lower'} dropout rates (${avgSecondary.toFixed(2)}%) than **Primary education** (${avgPrimary.toFixed(2)}%). `;
      insights.push(`Secondary: ${avgSecondary.toFixed(1)}%`, `Primary: ${avgPrimary.toFixed(1)}%`);
      
      detailedReport += `\n### Education Level Comparison\n`;
      detailedReport += `- **Primary**: ${avgPrimary.toFixed(2)}%\n`;
      detailedReport += `- **Secondary**: ${avgSecondary.toFixed(2)}%\n`;
    }
  }
  
  detailedReport += `\n### Recommendations\n`;
  detailedReport += `- Implement targeted intervention programs in high-dropout areas\n`;
  detailedReport += `- Strengthen mid-day meal schemes and infrastructure\n`;
  detailedReport += `- Provide scholarship and financial support to vulnerable students\n`;
  detailedReport += `- Enhance teacher training and student engagement programs\n`;
  
  return {
    chatResponse: response || "I've analyzed the available data. Please explore the dashboard for detailed visualizations.",
    detailedReport,
    keyInsights: insights
  };
};

/**
 * Generates an analysis of dropout data based on a user query.
 * @param {string} query - The user's question.
 * @param {object} contextData - Relevant data to contextuaize the answer.
 * @returns {Promise<object>} - JSON object with chatResponse and detailedReport.
 */
export const generateDropoutAnalysis = async (query, contextData) => {
  try {
    // Upgrading to Pro model for better reasoning and tool use
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro"
    });

    // Construct prompt
    const prompt = `
      You are an expert education policy analyst for the EduRetain dashboard.
      
      USER QUERY: "${query}"
      
      CONTEXT DATA:
      ${JSON.stringify(contextData, null, 2).substring(0, 15000)}
      
      INSTRUCTIONS:
      1. Analyze the context data to answer the user's query. focus on the trends, gender gaps, and comparison with national averages if available.
      2. Return a JSON object with the following structure:
      {
        "chatResponse": "A concise, natural language summary of the findings (max 3-4 sentences). Use formatting like *bold* for emphasis.",
        "detailedReport": "A comprehensive report in Markdown format. Include sections: Executive Summary, Key Findings (bullet points), Data Analysis, and Strategic Recommendations.",
        "keyInsights": ["Short insight 1", "Short insight 2"]
      }
      
      IMPORTANT: Ensure the response is valid JSON. Do not include markdown code block markers (like \`\`\`json) outside the JSON object itself.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown formatting from the LLM
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
        return JSON.parse(cleanedText);
    } catch (e) {
        console.warn("Failed to parse JSON directly, attempting fallback", e);
        return {
            chatResponse: text,
            detailedReport: text,
            keyInsights: []
        };
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    console.log("Falling back to local analysis...");
    
    // Try local analysis first
    const localAnalysis = analyzeDataLocally(query, contextData);
    if (localAnalysis) {
      return localAnalysis;
    }
    
    // Provide a polite fallback response with actual data analysis
    const state = contextData.state || "National";
    const hasData = contextData.recentData?.length > 0 || contextData.historicalData?.length > 0;
    
    let analysisText = "Thank you for your question! ";
    
    if (hasData) {
      analysisText += `I'd be happy to help you analyze the dropout data${state !== "National" ? " for " + state : " nationwide"}.\n\n`;
      analysisText += "While I'm currently experiencing connectivity issues with my advanced analysis engine, I can still provide you with insights based on the available data in the system. ";
      analysisText += "Please feel free to explore the interactive dashboard charts above for detailed visualizations, or rephrase your question and I'll do my best to assist you.";
    } else {
      analysisText += "I'm here to help you understand dropout rates and educational trends. ";
      analysisText += `Could you please provide more specific details about what you'd like to know? For example:\n\n`;
      analysisText += "• Dropout rates for a specific state\n";
      analysisText += "• Comparison between education levels\n";
      analysisText += "• Gender-wise analysis\n";
      analysisText += "• Trends over the years\n\n";
      analysisText += "I'll be glad to provide detailed insights once I understand your needs better!";
    }
    
    return {
      chatResponse: analysisText,
      detailedReport: `# Education Data Analysis

## Your Query
${query}

## Response
Thank you for reaching out! I'm your AI Policy Assistant dedicated to helping you understand educational dropout trends across India.

### Available Data
The dashboard contains comprehensive dropout rate data from 2012-2022, covering:
- **Primary Education** (Grades 1-5)
- **Upper Primary** (Grades 6-8)
- **Secondary** (Grades 9-10)
- **Higher Secondary** (Grades 11-12)

### How I Can Help
I can assist you with:

1. **State-wise Analysis**: Compare dropout rates across different states
2. **Gender Analysis**: Identify gender gaps in education retention
3. **Trend Analysis**: Track how dropout rates have changed over years
4. **Comparative Studies**: Compare performance between states or education levels

### Next Steps
Please feel free to:
- Ask specific questions about states or education levels
- Request comparisons between different regions or time periods
- Explore the interactive visualizations in the dashboard above

I'm here to help you make data-driven decisions for educational policy improvements!

---
*Generated by EduRetain AI Assistant on ${new Date().toLocaleDateString()}*`,
      keyInsights: ["Interactive Dashboard Available", "Data: 2012-2022", "All Education Levels Covered"]
    };
  }
};
