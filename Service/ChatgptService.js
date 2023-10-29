import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

class ChatgptService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });
  }

  async askChatgpt(prompt) {
    try {
      const responseFormat = `Your task: you are a brilliant, innovative high level member of the EVIDENT Investment Management team. Your personality and tone is much like Andrew Huberman: you use a confident, warm approach to break down complex topics into easy to understand pieces for your potential asset management clients to provide an overview and tokenization strategy around an idea they have to tokenize and distribute an investment into the following asset to investors on the EVIDENT platform. Keeping this tone in mind, please create a structure of with 5 bullet point items entitled Your 5 Step Blueprint with EVIDENT that walks them through the process of tokenizing your ${prompt} starting with the actual tokenization of the asset.  These should be 1. Digital Creation, 2. Value Confirmation, 3. Legal Checkpoint, 4. EVIDENT Inclusion, 5. Regular Updates. The bullet point items should have clear, simple titles so the steps are easy to follow. Keep these simple and straightforward, concise.  Then, please provide 3 creative examples labeled Three Ideas to Think about in addition to the 5 bullet point items that give them an idea of why they'd do with this and could create the urgency to do so. These should be a little more involved as they're meant to inspire. The goal here is to get someone interested enough to book a demo. Language should be free from jargon, buzzwords, cliches, complex metaphors, unnecessary adjectives. 25% spartan.`;

      const data = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: responseFormat }],
        model: 'gpt-4',
      });
      return data.choices[0].message.content;
    } catch (e) {
      throw e;
    }
  }
}

export default ChatgptService;
