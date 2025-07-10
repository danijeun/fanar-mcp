import express from 'express';
import dotenv from 'dotenv';
import { generateImage, islamicRag, thinkingMode, imageUnderstanding, translate } from './index.js';

dotenv.config();
const apiKey = process.env.FANAR_API_KEY;

const app = express();
app.use(express.json({ limit: '10mb' }));

app.post('/mcp/generate_image', async (req, res) => {
  try {
    const image_b64 = await generateImage(req.body.prompt, apiKey!);
    res.json({ result: 'Image generated successfully', image_b64 });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/mcp/islamic_rag', async (req, res) => {
  try {
    const result = await islamicRag(req.body.prompt, apiKey!);
    res.json({ result: 'RAG completed', ...result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/mcp/thinking_mode', async (req, res) => {
  try {
    const result = await thinkingMode(req.body.prompt, apiKey!);
    res.json({ result: 'Thinking mode completed', content: result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/mcp/image_understanding', async (req, res) => {
  try {
    const result = await imageUnderstanding(req.body.prompt, req.body.image_b64, apiKey!);
    res.json({ result: 'Image understanding completed', content: result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/mcp/translate', async (req, res) => {
  try {
    const result = await translate(req.body.text, req.body.langpair, apiKey!, req.body.preprocessing);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Fanar MCP Tools API is running.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Fanar MCP Tools API server running on port ${PORT}`);
}); 