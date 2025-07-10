import axios from 'axios';
import Jimp from 'jimp';

async function resize_image_b64(image_b64: string, max_width: number, max_height: number): Promise<string> {
  const buffer = Buffer.from(image_b64, 'base64');
  const image = await Jimp.read(buffer);
  image.scaleToFit(max_width, max_height);
  const resizedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
  return resizedBuffer.toString('base64');
}

export async function imageUnderstanding(prompt: string, image_b64: string, apiKey: string) {
  if (!apiKey) throw new Error('FANAR_API_KEY not set.');
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  // Resize the image before sending to API
  const resized_b64 = await resize_image_b64(image_b64, 512, 512);
  const image_b64_url = `data:image/jpeg;base64,${resized_b64}`;
  const messages = [
    {
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: image_b64_url } },
      ],
    },
  ];
  const payload_data = {
    model: 'Fanar-Oryx-IVU-1',
    messages,
    max_tokens: 750,
  };
  const response = await axios.post('https://api.fanar.qa/v1/chat/completions', payload_data, { headers });
  const data = response.data;
  const content = data.choices[0].message.content;
  return content;
} 