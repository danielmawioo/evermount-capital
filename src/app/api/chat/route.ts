import { NextRequest, NextResponse } from "next/server";

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are a helpful customer support assistant for Evermount Capital, a quantitative hedge fund and investment management firm. 

Your role is to:
- Answer questions about Evermount Capital's services, investment strategies, and platform
- Provide information about quantitative investing, hedge funds, and our systematic approaches
- Help users understand our products, pricing, and how to get started
- Direct users to appropriate resources or pages when needed
- Be professional, friendly, and knowledgeable about financial services

Key information about Evermount Capital:
- We offer AI-powered quantitative trading strategies
- We provide systematic investment solutions across multiple asset classes
- Our platform uses machine learning and advanced analytics
- We serve both individual and institutional investors
- Users can book demos, view portfolio insights, and access educational resources

Always be helpful, accurate, and professional. If you don't know something, admit it and suggest they contact support or book a demo.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      // Fallback to a simple response if API key is not configured
      return NextResponse.json({
        message: "I'm here to help! However, the AI assistant is not fully configured yet. Please contact our support team at support@evermount.co or book a demo to speak with our team directly.",
        error: "API key not configured"
      });
    }

    // Prepare messages for OpenAI (include system prompt)
    const formattedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Call OpenAI API
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
        max_tokens: 500,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API error:", errorData);
      
      return NextResponse.json(
        {
          message: "I apologize, but I'm experiencing technical difficulties. Please try again or contact our support team at support@evermount.co",
          error: "API request failed"
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        message: "I apologize, but I'm experiencing technical difficulties. Please try again or contact our support team at support@evermount.co",
        error: "Internal server error"
      },
      { status: 500 }
    );
  }
}

