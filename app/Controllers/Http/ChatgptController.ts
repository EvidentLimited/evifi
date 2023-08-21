import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ChatgptService } from 'App/Providers/ChatGPT/ChatgptService'
import AskChatgptValidator from 'App/Validators/AskChatgptValidator'
import { safeJSON } from 'openai/core'
import Filter from 'bad-words'

export default class ChatgptsController {
  public chatgptService: ChatgptService

  constructor() {
    this.chatgptService = new ChatgptService()
  }

  // ASK CHATGPT
  public async askChatgpt({ response, request }: HttpContextContract) {
    try {
      const data = await request.validate(AskChatgptValidator)

      // Filter bad words
      const filter = new Filter()
      const isBadWord = filter.isProfane(data.prompt)

      if (isBadWord) {
        return response
          .status(400)
          .json({ code: 'OFFESIVE_WORD', message: 'Offensive word cannot be tokenized' })
      }

      const chatgptResponse = await this.chatgptService.askChatgpt(data.prompt)

      if (!chatgptResponse) {
        return response
          .status(408)
          .json({ code: 'TIMEOUT', message: 'ChatGPT taking time to respond' })
      }

      return response.status(200).json(safeJSON(chatgptResponse))
    } catch (e) {
      throw e
    }
  }
}
