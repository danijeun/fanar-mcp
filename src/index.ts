#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fanarRag, fanarImageGen, fanarTranslate } from './fanarTools.js';

const server = new McpServer({
  name: "FanarTools",
  version: "0.1.0"
});

server.tool(
  "fanar_rag",
  {
    messages: z.array(z.object({ role: z.string(), content: z.string() })),
    model: z.string().default('Islamic-RAG')
  },
  async ({ messages, model }: { messages: { role: string, content: string }[], model: string }) => {
    try {
      const result = await fanarRag(messages, model);
      return { content: [{ type: "text", text: result.content }], references: result.references };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { content: [{ type: "text", text: `Error: ${errorMessage}` }], isError: true };
    }
  }
);

server.tool(
  "fanar_image_gen",
  {
    prompt: z.string()
  },
  async ({ prompt }: { prompt: string }) => {
    try {
      const image_b64 = await fanarImageGen(prompt);
      return { content: [{ type: "image", data: image_b64, mimeType: "image/png" }] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { content: [{ type: "text", text: `Error: ${errorMessage}` }], isError: true };
    }
  }
);

server.tool(
  "fanar_translate",
  {
    text: z.string(),
    langpair: z.string(),
    preprocessing: z.string().optional()
  },
  async ({ text, langpair, preprocessing }: { text: string, langpair: string, preprocessing?: string }) => {
    try {
      const result = await fanarTranslate(text, langpair, preprocessing);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { content: [{ type: "text", text: `Error: ${errorMessage}` }], isError: true };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  console.error("Fanar Tools MCP Server starting...");
  try {
    await server.connect(transport);
    console.error("Fanar Tools MCP Server running");
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main(); 