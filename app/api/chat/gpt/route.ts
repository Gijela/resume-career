import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();
  const baseURL = process.env.GPT_BASE_URL;
  const ApiKey = process.env.GPT_ApiKey;

  if (!baseURL || !ApiKey) {
    return NextResponse.json(
      { error: "without Base_URL or ApiKey " },
      { status: 500 }
    );
  }

  const url = `${baseURL}/v1/chat/completions`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${ApiKey}`,
      },
      body: JSON.stringify({
        messages: messages,
        model: "gpt-3.5-turbo",
        stream: true,
      }),
    });

    if (!response.body) throw new Error("No response body");
    const reader = response.body.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            break;
          }
          controller.enqueue(decoder.decode(value));
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Content-Encoding": "none",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
