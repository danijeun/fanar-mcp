import axios from 'axios';

export async function thinkingMode(prompt: string, apiKey: string) {
  if (!apiKey) throw new Error('FANAR_API_KEY not set.');
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  let messages = [
    { role: 'thinking_user', content: prompt },
  ];
  async function model_api(messages: any, max_tokens = 500) {
    const payload_data = {
      model: 'Fanar',
      messages,
      max_tokens,
    };
    const response = await axios.post('https://api.fanar.qa/v1/chat/completions', payload_data, { headers });
    return response.data;
  }
  let response = await model_api(messages, 2000);
  let output = response.choices[0].message.content;
  let finish_reason = response.choices[0].finish_reason;
  let has_think_tag = output.includes('</think>');
  let hit_length_limit = finish_reason === 'length';
  let final_output;
  if (has_think_tag || hit_length_limit) {
    let thinking_output = has_think_tag ? output.split('</think>')[0] : output;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'thinking_user') {
        messages[i].role = 'user';
        break;
      }
    }
    messages.push({ role: 'thinking', content: thinking_output });
    let final_response = await model_api(messages, 1000);
    final_output = final_response.choices[0].message.content;
  } else {
    final_output = output;
  }
  return final_output;
} 