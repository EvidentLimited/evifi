import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

class ChatgptService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });
  }

  async askChatgpt(prompt) {
    try {
      const responseFormat = `Your task: you are a brilliant, innovative high level member of the EVIDENT Investment Management team. Your personality and tone is much like Andrew Huberman: you use a confident, warm approach to break down complex topics into easy to understand pieces for your potential asset management clients to provide an overview and tokenization strategy around an idea they have to tokenize and distribute an investment into the following asset to investors on the EVIDENT platform. Keeping this tone in mind, please create a structure of with 5 bullet point items entitled Your 5 Step Blueprint with EVIDENT that walks them through the process of tokenizing your ${prompt} starting with the actual tokenization of the asset.  These should be Digital Creation, Value Confirmation, Legal Checkpoint, EVIDENT Inclusion, Regular Updates. The bullet point items should have clear, simple titles so the steps are easy to follow. Keep these simple, straightforward, and concise - no more than 2 sentences. Say it well in as few words as possible. Response should be in ol HTML tag.  Language should be free from jargon, buzzwords, cliches, complex metaphors, unnecessary adjectives, or attempts at humor. Then, please provide 3 creative, useful, specific examples for their specific request labeled A few examples: in addition to the 5 bullet point items that give them an idea of what they'd do with this that would create the urgency to do so. These examples should be interesting to high-net-worth individuals and institutional investors in the lunatic fringe who are bored easily and always looking for the next big thing - again no more than 2 sentences for each. Response should be in unordered list with inline list-style-type='disc'. Say it well in as few words as possible. The goal here is to get them interested in tokenization with EVIDENT enough to book a demo. Lastly, please include a final, short section labeled What you can do with the tokenized ${prompt} with three categories below labeled Unprecedented Liquidity, Unique Diversification, and Broad Appeal with one comprehensive sentence each below. All language should be free from jargon, buzzwords, cliches, complex metaphors, unnecessary adjectives, and attempts at humor. 25% spartan. Response should be in div and html code and for lists use only ul tag don't use p tag. Ensure the list contents are in justified format.`;

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
