import { OpenAI } from 'openai';

export async function generateImage(prompt: string, apiKey: string) {
  const client = new OpenAI({ baseURL: 'https://api.fanar.qa/v1', apiKey });
  const response = await client.images.generate({
    model: 'Fanar-ImageGen-1',
    prompt,
    response_format: 'b64_json',
  });
  const image_b64 = Array.isArray(response.data) && response.data[0]?.b64_json;
  if (!image_b64) throw new Error('API returned no image data.');
  return image_b64;
} 