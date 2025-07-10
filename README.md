# Fanar MCP Tools

A modular Node.js package providing Fanar MCP tools for image generation, Islamic RAG, thinking mode, image understanding, and translation. Use as a library in any Node.js project.

## Features
- Generate images from prompts
- Islamic RAG (Retrieval-Augmented Generation)
- Thinking mode (multi-step reasoning)
- Image understanding (with base64 input)
- Translation (multi-language)

## Installation
```sh
npm install fanar-mcp
```

## Usage (Library)
```typescript
import { generateImage, islamicRag, thinkingMode, imageUnderstanding, translate } from 'fanar-mcp';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.FANAR_API_KEY!;

async function main() {
  const img = await generateImage('A mosque at sunset', apiKey);
  console.log(img);

  const rag = await islamicRag('What is zakat?', apiKey);
  console.log(rag);

  // ...and so on for other tools
}
main();
```

## API

### `generateImage(prompt: string, apiKey: string): Promise<string>`
- Generate an image from a prompt. Returns base64 image string.

### `islamicRag(prompt: string, apiKey: string): Promise<{ content: string, references: any[] }>`
- Islamic RAG (Retrieval-Augmented Generation).

### `thinkingMode(prompt: string, apiKey: string): Promise<string>`
- Multi-step reasoning/thinking mode.

### `imageUnderstanding(prompt: string, image_b64: string, apiKey: string): Promise<string>`
- Image understanding with base64-encoded image input.

### `translate(text: string, langpair: string, apiKey: string, preprocessing?: string): Promise<any>`
- Translate text between languages.

## Environment Variables
- `FANAR_API_KEY` (required): Your Fanar API key.

## License
MIT