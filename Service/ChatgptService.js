import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

class ChatgptService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });
  }

  async askChatgpt(prompt) {
    try {
      const responseFormat = `Your task: As a high-level member of the EVIDENT Investment Management team, akin to Andrew Huberman in personality and tone, you are to simplify complex topics for your asset management clients. Provide an overview and a tokenization strategy for an asset they wish to tokenize and distribute to investors on the EVIDENT platform.
Create "Your 5 Step Blueprint with EVIDENT", a structured guide with 5 bullet points to walk clients through the tokenization of the ${prompt}. The steps are:
1. Digital Creation: Convert the asset into a digital token.
2. Value Confirmation: Establish the asset's market value.
3. Legal Checkpoint: Ensure compliance with legal standards.
4. EVIDENT Inclusion: Incorporate the tokenized asset into the EVIDENT platform.
5. Regular Updates: Continuously inform clients about their investment.
Next, provide 3 examples that illustrate the potential of this tokenization, appealing to high-net-worth individuals and institutional investors. These examples should be concise and engaging.
Conclude with a section "What you can do with the tokenized ${prompt}", comprising three categories: Unprecedented Liquidity, Unique Diversification, and Broad Appeal. Each category should be explained in a clear, concise sentence.
The response should be an HTML code, with properly spaced and left-aligned bullet points, and devoid of jargon, buzzwords, cliches, complex metaphors, unnecessary adjectives, or humor. The aim is to pique interest in tokenization with EVIDENT and encourage clients to book a demo. Don't add extra quotation marks and only use numbered list. Make internal sections justified alignment`;

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
