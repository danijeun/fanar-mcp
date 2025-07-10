import axios from 'axios';

export async function translate(text: string, langpair: string, apiKey: string, preprocessing: string = 'default') {
  if (!apiKey) throw new Error('FANAR_API_KEY not set.');
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  const json_data = {
    model: 'Fanar-Shaheen-MT-1',
    text,
    langpair,
    preprocessing,
  };
  try {
    const response = await axios.post('https://api.fanar.qa/v1/translations', json_data, { headers });
    return response.data;
  } catch (e: any) {
    if (e.response) {
      try {
        const error_json = e.response.data;
        if (error_json.code === 'content_filter') {
          throw new Error('Sorry, your request was blocked by the content filter. Please try rephrasing your input.');
        }
      } catch {}
      if ([403, 500].includes(e.response.status)) {
        throw new Error('Translation is not enabled for your account. Please contact support to enable this feature.');
      }
    }
    throw new Error(`Failed to run translation: ${e.message}`);
  }
} 