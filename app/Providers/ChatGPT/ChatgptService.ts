import { OpenAI } from 'openai'
import { ChatgptContract } from 'App/Providers/ChatGPT/ChatgptServiceProvider'

export class ChatgptService implements ChatgptContract {
  public openai: OpenAI

  constructor() {
    const API_KEY = { apiKey: process.env.CHATGPT_API_KEY }
    this.openai = new OpenAI(API_KEY)
  }

  public async askChatgpt(prompt: string) {
    try {
      // ChatGPT Response Format
      const responseFormat = `Use words - Integration, Token Generation, Value Proposition. \
         I want the content in format: {"Integration": ,"Token Generation": , "Value Proposition": }. \
         Also make it Short and precise.`

      // make the prompt
      const fullPrompt = `I want to tokenize ${prompt}. ${responseFormat}`

      // give prompt to chatgpt
      const data = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: fullPrompt }],
        model: 'gpt-3.5-turbo',
      })

      // frame the response
      // const response = JSON.parse(data.choices[0].message.content)

      // return the response
      return data.choices[0].message.content
    } catch (e) {
      throw e
    }
  }
}
