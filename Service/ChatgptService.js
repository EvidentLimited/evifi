import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

class ChatgptService {
    constructor() {
        this.openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });
    }

    async askChatgpt(prompt) {
        try {
            const responseFormat = `Use words - Integration, Token Generation, Value Proposition,. \
            I want the content in format: {"Integration": ,"Token Generation": , "Value Proposition": }. \
            Also make it concise.`;

            const fullPrompt = `I want to tokenize ${prompt}. ${responseFormat}`;

            const data = await this.openai.chat.completions.create({
                messages: [{ role: 'user', content: fullPrompt }],
                model: 'gpt-3.5-turbo',
            });

            return data.choices[0].message.content;
        } catch (e) {
            throw e;
        }
    }
}

export default ChatgptService;
