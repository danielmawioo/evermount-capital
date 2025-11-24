import { NextRequest, NextResponse } from "next/server";

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are a helpful customer support assistant for Evermount Capital, a quantitative hedge fund and investment management firm. 

Your role is to:
- Answer questions about Evermount Capital's services, investment strategies, and platform
- Provide information about quantitative investing, hedge funds, and our systematic approaches
- Help users understand our products, pricing, and how to get started
- Direct users to appropriate resources or pages when needed
- Provide relevant links to website pages when helpful
- Connect users to real human support when you cannot fully answer their question
- Be professional, friendly, and knowledgeable about financial services

Key information about Evermount Capital:
- We offer AI-powered quantitative trading strategies
- We provide systematic investment solutions across multiple asset classes (equities, fixed income, currencies, commodities)
- Our platform uses machine learning, statistical arbitrage, and high-performance computing
- We serve both individual and institutional investors
- Performance metrics: 1.85+ Information Ratio, $50M+ AUM, 0.35 Maximum Drawdown, 15%+ Annualized Alpha
- Founded in 2023, combining quantitative finance expertise with cutting-edge technology

Available Website Pages and Resources:
- Homepage (/): Overview of services, company information, key highlights
- About (/about): Company story, mission, vision, leadership team, core values, technology
- Features (/features): Detailed information about our quantitative trading strategies and features
- Pricing (/pricing): Investment pricing tiers and institutional options
- Platform (/platform): Technology infrastructure, research capabilities, system details
- Portfolio Insights (/portfolio-insights): Performance analytics and portfolio management tools
- Investor Tour (/investor-tour): Step-by-step guide to using our platform
- Book Demo (/book-demo): Schedule a personalized demo with our team
- Careers (/careers): Job opportunities and company culture
- Terms (/terms): Terms of Service
- Privacy (/privacy): Privacy Policy
- Risk Disclosure (/risk-disclosure): Risk disclosure statement
- Regulatory Compliance (/regulatory-compliance): Compliance information
- AML Policy (/aml-policy): Anti-Money Laundering policy
- Investment Agreement (/investment-agreement): Investment agreement details

Contact Information:
- Support Email: support@evermount.co
- General Email: info@evermount.co
- Phone: +254758578816

When providing information:
1. Always try to answer questions directly using the knowledge above
2. When relevant, suggest specific pages using format: "You can learn more at [page name] (https://www.evermount.co/[route])"
3. For complex questions you cannot fully answer, suggest booking a demo: "For detailed information, I recommend booking a demo at https://www.evermount.co/book-demo"
4. When you cannot help, provide contact information: "For further assistance, please contact our support team at support@evermount.co or call +254758578816"
5. Always be helpful, accurate, and professional
6. If you're uncertain about something, admit it and direct them to appropriate resources or human support`;

export async function POST(request: NextRequest) {
  try {
    const { messages, assistantName = "Ethan" } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Log in development to help debug
    if (process.env.NODE_ENV === "development") {
      console.log("🔍 Environment check:");
      console.log("- OPENAI_API_KEY exists:", !!apiKey);
      console.log("- OPENAI_API_KEY length:", apiKey?.length || 0);
      console.log("- OPENAI_API_KEY starts with:", apiKey?.substring(0, 7) || "N/A");
    }
    
    if (!apiKey) {
      // Fallback to a simple response if API key is not configured
      console.error("❌ OPENAI_API_KEY environment variable is not set!");
      return NextResponse.json({
        message: "I'm here to help! However, the AI assistant is not fully configured yet. Please contact our support team at support@evermount.co or book a demo to speak with our team directly.",
        error: "API key not configured"
      });
    }

    // Create personalized system prompt with assistant name
    const personalizedSystemPrompt = SYSTEM_PROMPT.replace(
      /You are a helpful customer support assistant/,
      `You are ${assistantName}, a helpful customer support assistant`
    ) + `\n\nYour name is ${assistantName}. Always introduce yourself as ${assistantName} when appropriate, and sign off with your name when it feels natural.`;

    // Prepare messages for OpenAI (include system prompt)
    const formattedMessages = [
      { role: "system", content: personalizedSystemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Call OpenAI API
    if (process.env.NODE_ENV === "development") {
      console.log("📡 Calling OpenAI API with model: gpt-4o-mini");
      console.log("📨 Messages count:", formattedMessages.length);
    }
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using the more cost-effective model
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 800, // Increased for more detailed responses with links
        stream: false,
      }),
    });
    
    if (process.env.NODE_ENV === "development") {
      console.log("📥 OpenAI API response status:", response.status);
    }

    if (!response.ok) {
      const errorText = await response.text();
      let errorData = {};
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { raw: errorText };
      }
      
      console.error("❌ OpenAI API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        errorText: errorText.substring(0, 500) // First 500 chars
      });
      
      // Provide more specific error messages
      let errorMessage = "I apologize, but I'm experiencing technical difficulties. Please try again or contact our support team at support@evermount.co";
      
      if (response.status === 401) {
        errorMessage = "Authentication error. Please contact support@evermount.co for assistance.";
      } else if (response.status === 429) {
        errorMessage = "I'm currently experiencing high demand. Please try again in a moment or contact support@evermount.co";
      } else if (response.status === 500) {
        errorMessage = "OpenAI service is temporarily unavailable. Please try again later or contact support@evermount.co";
      }
      
      return NextResponse.json(
        {
          message: errorMessage,
          error: "API request failed",
          details: process.env.NODE_ENV === "development" ? errorData : undefined
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    // Extract links from the message for better formatting
    const linkRegex = /https?:\/\/[^\s]+/g;
    const links = aiMessage.match(linkRegex) || [];

    return NextResponse.json({ 
      message: aiMessage,
      links: links,
      needsHumanSupport: aiMessage.toLowerCase().includes('support@evermount.co') || 
                         aiMessage.toLowerCase().includes('contact our support') ||
                         aiMessage.toLowerCase().includes('book a demo')
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error details:", errorMessage);
    
    return NextResponse.json(
      {
        message: "I apologize, but I'm experiencing technical difficulties. Please try again or contact our support team at support@evermount.co",
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

