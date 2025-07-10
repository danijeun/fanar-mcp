import axios from 'axios';

export async function islamicRag(prompt: string, apiKey: string) {
  if (!apiKey) throw new Error('FANAR_API_KEY not set.');
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  const messages = [
    { role: 'user', content: prompt },
  ];
  const payload_data = {
    model: 'Islamic-RAG',
    messages,
    max_tokens: 750,
  };
  const response = await axios.post('https://api.fanar.qa/v1/chat/completions', payload_data, { headers });
  const data = response.data;
  const content = data.choices[0].message.content;
  const references = data.choices[0].message.references || [];
  return { content, references };
} 