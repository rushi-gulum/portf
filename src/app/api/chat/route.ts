import { NextRequest, NextResponse } from 'next/server';

function getResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('attention') || lower.includes('transformer')) {
    return "The attention mechanism is the core innovation behind Transformers. It allows models to weigh the importance of different tokens in a sequence relative to each other. Multi-head attention computes multiple attention distributions in parallel, enabling the model to capture different types of relationships. The formula: Attention(Q,K,V) = softmax(QK^T / √d_k)V.";
  }

  if (lower.includes('rag') || lower.includes('retrieval')) {
    return "RAG (Retrieval-Augmented Generation) combines a retrieval system with an LLM. First, the user query is embedded and used to search a vector database for relevant documents. Those documents are then injected into the LLM's context as additional knowledge. This approach reduces hallucinations and enables the model to reference up-to-date or proprietary information without retraining.";
  }

  if (lower.includes('agent') || lower.includes('orchestrate')) {
    return "AI agents are systems that use LLMs as reasoning engines to plan, use tools, and execute multi-step tasks. They typically follow a ReAct (Reason + Act) loop: think about what to do, take an action (API call, code execution, web search), observe the result, and repeat until the task is complete. Frameworks like LangChain and AutoGPT build on this pattern.";
  }

  if (lower.includes('fine-tun') || lower.includes('lora')) {
    return "Fine-tuning adapts a pre-trained model to a specific task or domain using a smaller labeled dataset. Techniques like LoRA (Low-Rank Adaptation) freeze the base weights and train small rank decomposition matrices, dramatically reducing compute requirements. QLoRA further quantizes the base model to 4-bit. This makes fine-tuning accessible even on consumer GPUs.";
  }

  return "That's a great question! AI is a vast and rapidly evolving field. Key areas include deep learning, natural language processing, computer vision, and reinforcement learning. Each has transformative applications across industries. Feel free to ask about any specific topic like transformers, RAG, agents, or fine-tuning!";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages: Array<{ role: string; content: string }> = body.messages || [];

    // Get the last user message
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    const userInput = lastUserMessage?.content || '';

    const content = getResponse(userInput);

    return NextResponse.json({
      role: 'assistant',
      content,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}