import axios from 'axios';

export async function fanarRag(
  messages: { role: string; content: string }[],
  model: string
): Promise<{ content: string; references?: any[] }> {
  const apiKey = process.env.FANAR_API_KEY;
  if (!apiKey) throw new Error('FANAR_API_KEY not set');
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  const payload = {
    model,
    messages,
    max_tokens: 750,
  };
  const response = await axios.post(
    'https://api.fanar.qa/v1/chat/completions',
    payload,
    { headers }
  );
  const data = response.data;
  const content = data.choices?.[0]?.message?.content || '';
  const references = data.choices?.[0]?.message?.references || [];
  return { content, references };
}

export async function fanarImageGen(
  prompt: string
): Promise<string> {
  const apiKey = process.env.FANAR_API_KEY;
  if (!apiKey) throw new Error('FANAR_API_KEY not set');
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  const payload = {
    model: 'Fanar-ImageGen-1',
    prompt,
  };
  const response = await axios.post(
    'https://api.fanar.qa/v1/images/generations',
    payload,
    { headers }
  );
  const image_b64 = response.data.data?.[0]?.b64_json;
  if (!image_b64) throw new Error('No image returned');

  return image_b64;
}

export async function fanarTranslate(
  text: string,
  langpair: string,
  preprocessing = 'default'
): Promise<any> {
  const apiKey = process.env.FANAR_API_KEY;
  if (!apiKey) throw new Error('FANAR_API_KEY not set');
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  const payload = {
    model: 'Fanar-Shaheen-MT-1',
    text,
    langpair,
    preprocessing,
  };
  const response = await axios.post(
    'https://api.fanar.qa/v1/translations',
    payload,
    { headers }
  );
  return response.data;
} 
