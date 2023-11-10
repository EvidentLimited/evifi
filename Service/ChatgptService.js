import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

class ChatgptService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });
  }

  async askChatgpt(prompt) {
    try {
      const responseFormat = `Your task: As a high-level member of the EVIDENT Investment Management team, with a personality and tone akin to Andrew Huberman, your role is to demystify complex topics for potential asset management clients. You are tasked with providing an overview and tokenization strategy for an idea they have, to tokenize and distribute an investment into ${prompt} to investors on the EVIDENT platform. Create a structure with 5 bullet points titled "Your 5 Step Blueprint with EVIDENT". This blueprint will guide clients through the process of tokenizing ${prompt}, starting with the actual tokenization of the asset. The steps are: Digital Creation: Convert ${prompt} into a digital token. Value Confirmation: Accurately determine the market value of ${prompt}. Legal Checkpoint: Ensure compliance with relevant laws and regulations for ${prompt}. EVIDENT Inclusion: Integrate the tokenized ${prompt} into the EVIDENT platform. Regular Updates: Provide ongoing information about the investment in ${prompt}. Additionally, provide 3 examples that illustrate the practical application and benefits of this process for ${prompt}. These should be engaging and relevant to high-net-worth individuals and institutional investors, sparking interest in the novelty and potential of ${prompt}. Finally, include a section titled "What you can do with the tokenized ${prompt}". This section should have three categories: Unprecedented Liquidity, Unique Diversification, and Broad Appeal, each explained in a clear, concise sentence. The language should be straightforward and free from jargon, buzzwords, clichés, complex metaphors, unnecessary adjectives, or humor. The style should be direct and to the point, focusing on clarity and brevity. This content is designed to intrigue clients about the potential of tokenizing ${prompt} with EVIDENT and encourage them to book a demo. Ensure the text is presented in a well-spaced, bullet-point format, left-aligned, without the use of '\n' for new lines, and with appropriate in-line styles for spacing and padding in a div`;

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
