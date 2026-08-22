import { NextRequest, NextResponse } from "next/server";
import {
  CHAT_DEPARTMENT_MAP,
  getDepartmentAssistant,
  isValidDepartmentId,
} from "@/lib/chat-departments";
import { extractLinks, getChatFallbackResponse } from "@/lib/chat-fallback";
import { logger } from "@/lib/logger";

const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";

const BASE_SYSTEM_PROMPT = `You are a helpful customer support assistant for Evermount Capital, a quantitative hedge fund and investment management firm.

Your role is to:
- Diagnose user issues and provide step-by-step resolutions within your department's expertise
- Answer questions about Evermount Capital's services, investment strategies, and platform
- Direct users to specific dashboard pages and website resources with full URLs
- Connect users to human support only when self-service steps cannot resolve the issue
- Be professional, friendly, and knowledgeable about financial services
- Stay strictly within your assigned department — do not answer questions outside your scope; instead, tell the user which department handles that topic

Key information about Evermount Capital:
- AI-powered quantitative trading strategies across equities, fixed income, currencies, commodities
- Machine learning, statistical arbitrage, and high-performance computing
- Individual and institutional investors
- Performance metrics: 1.85+ Information Ratio, $300K AUM, 0.35 Maximum Drawdown, 15%+ Annualized Alpha
- Founded in 2023

Platform routes (use full URLs https://www.evermount.co/...):
- /dashboard/portfolio, /dashboard/wallets, /dashboard/deposit, /dashboard/withdraw
- /dashboard/kyc, /dashboard/setting, /dashboard/invest, /dashboard/funds
- /dashboard/transactions, /dashboard/statements, /dashboard/risk, /dashboard/help
- /pricing, /features, /platform, /book-demo, /investor-tour

Contact: support@evermount.co | info@evermount.co | +254758578816

Response format:
1. Acknowledge the issue briefly
2. Provide numbered troubleshooting or resolution steps
3. Include relevant page links as full URLs
4. If unresolved after steps, provide the department escalation email
5. Keep responses concise and actionable (under 200 words when possible)`;

function buildSystemPrompt(
  assistantName: string,
  departmentId?: string,
): string {
  const namedPrompt = BASE_SYSTEM_PROMPT.replace(
    /You are a helpful customer support assistant/,
    `You are ${assistantName}, a helpful customer support assistant`,
  );

  const department = departmentId
    ? CHAT_DEPARTMENT_MAP[departmentId]
    : undefined;

  if (!department) {
    return (
      namedPrompt +
      `\n\nYour name is ${assistantName}. Ask the user which department they need if their question is unclear.`
    );
  }

  return (
    namedPrompt +
    `\n\n--- DEPARTMENT ASSIGNMENT ---` +
    `\nDepartment: ${department.name}` +
    `\nEscalation email: ${department.escalationEmail}` +
    `\n\n${department.agentPlaybook}` +
    `\n\nIMPORTANT RULES:` +
    `\n- You are ${assistantName} from the ${department.name} team` +
    `\n- ONLY handle ${department.name} issues — redirect other topics to the correct department` +
    `\n- Always try to RESOLVE the issue with concrete steps before escalating` +
    `\n- Use dashboard paths and full evermount.co URLs in your answers`
  );
}

export async function POST(request: NextRequest) {
  try {
    const { messages, assistantName, department } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 },
      );
    }

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "At least one message is required" },
        { status: 400 },
      );
    }

    if (!department || typeof department !== "string") {
      return NextResponse.json(
        { error: "Department is required" },
        { status: 400 },
      );
    }

    if (!isValidDepartmentId(department)) {
      return NextResponse.json(
        { error: "Invalid department" },
        { status: 400 },
      );
    }

    const resolvedAssistant =
      typeof assistantName === "string" && assistantName.trim()
        ? assistantName.trim()
        : getDepartmentAssistant(department);

    const apiKey = process.env.OPENAI_API_KEY;
    const orgId = process.env.OPENAI_ORG_ID;

    if (process.env.NODE_ENV === "development") {
      console.log("Chat request:", {
        department,
        assistantName: resolvedAssistant,
        messageCount: messages.length,
        hasApiKey: !!apiKey,
        hasOrgId: !!orgId,
        model: CHAT_MODEL,
      });
    }

    if (!apiKey) {
      console.error("OPENAI_API_KEY environment variable is not set");
      return NextResponse.json({
        message:
          "I'm here to help! However, the AI assistant is not fully configured yet. Please contact our support team at support@evermount.co or book a demo at https://www.evermount.co/book-demo.",
        error: "API key not configured",
      });
    }

    const systemPrompt = buildSystemPrompt(resolvedAssistant, department);

    const formattedMessages = [
      { role: "system" as const, content: systemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    ];

    const openAiHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };
    if (orgId) {
      openAiHeaders["OpenAI-Organization"] = orgId;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: openAiHeaders,
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: formattedMessages,
        temperature: 0.5,
        max_tokens: 800,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData: Record<string, unknown> = {};
      try {
        errorData = JSON.parse(errorText);
      } catch (parseError) {
        logger.warn("Failed to parse OpenAI error response as JSON", {
          error: String(parseError),
        });
        errorData = { raw: errorText };
      }

      console.error("OpenAI API error:", {
        status: response.status,
        error: errorData,
      });

      let errorMessage =
        "I apologize, but I'm experiencing technical difficulties. Please try again or contact our support team at support@evermount.co";

      const openAiError = errorData?.error as
        { code?: string; type?: string } | undefined;

      if (response.status === 401) {
        errorMessage =
          "Authentication error. Please contact support@evermount.co for assistance.";
      } else if (
        response.status === 429 ||
        openAiError?.code === "insufficient_quota"
      ) {
        const lastUserMessage = [...messages]
          .reverse()
          .find((m: { role: string }) => m.role === "user");
        const userText =
          typeof lastUserMessage?.content === "string"
            ? lastUserMessage.content
            : "";

        const fallbackMessage = getChatFallbackResponse(
          department,
          resolvedAssistant,
          userText,
        );
        const fallbackLinks = extractLinks(fallbackMessage);
        const dept = CHAT_DEPARTMENT_MAP[department];

        console.warn("OpenAI unavailable, using playbook fallback:", {
          code: openAiError?.code,
          department,
        });

        return NextResponse.json({
          message: fallbackMessage,
          links: fallbackLinks,
          needsHumanSupport: false,
          fallback: true,
          escalationEmail: dept?.escalationEmail,
        });
      }

      return NextResponse.json(
        {
          message: errorMessage,
          error: "API request failed",
          details:
            process.env.NODE_ENV === "development" ? errorData : undefined,
        },
        { status: 500 },
      );
    }

    const data = await response.json();
    const aiMessage =
      data.choices[0]?.message?.content ||
      "I apologize, but I couldn't generate a response. Please try again.";

    const linkRegex = /https?:\/\/[^\s)]+/g;
    const links = aiMessage.match(linkRegex) || [];

    const dept = department ? CHAT_DEPARTMENT_MAP[department] : undefined;

    return NextResponse.json({
      message: aiMessage,
      links,
      needsHumanSupport:
        aiMessage.toLowerCase().includes("support@evermount.co") ||
        aiMessage.toLowerCase().includes(dept?.escalationEmail ?? "") ||
        aiMessage.toLowerCase().includes("book a demo") ||
        aiMessage.toLowerCase().includes("book-demo"),
    });
  } catch (error) {
    logger.error("Chat API error", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const devMessage =
      process.env.NODE_ENV === "development"
        ? `Technical difficulties. Error: ${errorMessage}. Contact support@evermount.co`
        : "I apologize, but I'm experiencing technical difficulties. Please try again or contact support@evermount.co";

    return NextResponse.json(
      {
        message: devMessage,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
