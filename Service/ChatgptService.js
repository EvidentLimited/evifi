import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

class ChatgptService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });
  }

  async askChatgpt(prompt) {
    try {
      const responseFormat = `Your task: As a high-level member of the EVIDENT Investment Management team with a personality akin to Andrew Huberman, use your confident and warm approach to explain complex topics in a simple manner. Provide a clear overview and a tokenization strategy for an asset. The aim is to tokenize and distribute this investment on the EVIDENT platform. Create a structured guide titled "Your 5 Step Blueprint with EVIDENT" that walks clients through tokenizing the ${prompt}. The structure should include 5 numbered points: 1. Digital Creation: Convert the asset into a digital token. 2. Value Confirmation: Determine the asset's market value. 3. Legal Checkpoint: Ensure all legal standards are met. 4. EVIDENT Inclusion: Add the tokenized asset to the EVIDENT platform. 5.Regular Updates: Keep clients informed about their investment. Include 3 compelling examples in bullet points with justify alignment to illustrate the practical application and advantages of this tokenization, targeting high-net-worth individuals and institutional investors. Conclude with a section titled "What you can do with the tokenized ${prompt}". This section should have three categories - Unprecedented Liquidity, Unique Diversification, and Broad Appeal - each described in a concise sentence and should be in bullet points. The language should be clear, devoid of jargon, buzzwords, clichés, complex metaphors, and humor. The response should be formatted as HTML code, ensuring proper spacing, bullet points, left alignment, and the use of in-line styles for spacing and padding. Avoid using '\n' for line breaks. The goal is to engage clients and encourage them to book a demo with EVIDENT. 25% Spartan`;

      const data = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: responseFormat }],
        model: 'gpt-4',
      });
      return data.choices[0].message.content;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export default ChatgptService;
