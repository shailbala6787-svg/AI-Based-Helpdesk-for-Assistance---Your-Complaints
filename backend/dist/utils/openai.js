import OpenAI from 'openai';
import { config } from '../config/env.js';
const openai = new OpenAI({ apiKey: config.openaiApiKey });
const PARSE_PROMPT = `You are a document parser that extracts structured data from complaint images.
Extract the following fields from the complaint image and return them as a JSON object:

{
  "title": "Short action-phrase title, maximum 12 characters (e.g., 'Chain Snatch', 'Land Grab')",
  "complainantName": "Full name of the complainant",
  "complainantContact": "Contact information and/or address of the complainant",
  "incidentDatetime": "Date and time of the incident in ISO 8601 format",
  "incidentPlace": "Place of incident including District/Police Station",
  "accusedDetails": "Details about the accused/suspect, or empty string if unknown",
  "description": "Detailed description of the complaint",
  "ipcSections": ["Array of relevant IPC section numbers as strings, e.g. '302', '420'"]
}

Rules:
- title MUST be ≤12 characters, an action-phrase describing the crime/complaint
- ipcSections should contain relevant Indian Penal Code section numbers you can identify or suggest
- If a field cannot be determined from the image, provide a reasonable empty value ("" for strings, [] for arrays)
- incidentDatetime should be in ISO 8601 format; if only date is available, use midnight
- Return ONLY the JSON object, no other text`;
export async function parseComplaintImage(base64DataUrl) {
    const response = await openai.responses.create({
        model: 'gpt-5.4-mini',
        input: [
            {
                role: 'user',
                content: [
                    { type: 'input_text', text: PARSE_PROMPT },
                    { type: 'input_image', image_url: base64DataUrl, detail: 'auto' },
                ],
            },
        ],
    });
    const text = response.output_text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Failed to parse AI response as JSON');
    }
    return JSON.parse(jsonMatch[0]);
}
export async function generateEmbedding(text) {
    const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
    });
    return response.data[0].embedding;
}
//# sourceMappingURL=openai.js.map