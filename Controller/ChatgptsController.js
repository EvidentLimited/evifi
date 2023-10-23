import ChatgptService from '../Service/ChatgptService.js';
import Filter from 'bad-words';
import { safeJSON } from 'openai/core';
import { body, validationResult } from 'express-validator';

class ChatgptsController {
  validationRules() {
    return [
      body('prompt')
        .exists()
        .withMessage('Prompt not provided')
        .isString()
        .withMessage('Prompt must be a string')
        .trim()
        .notEmpty()
        .withMessage('Prompt cannot be empty'),
    ];
  }

  async askChatgpt(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const data = req.body;
      console.log('data:', data.prompt);

      // Filter bad words
      const filter = new Filter();
      const isBadWord = filter.isProfane(data.prompt);
      if (isBadWord) {
        return res.status(400).json({
          code: 'OFFESIVE_WORD',
          message: 'Offensive word cannot be tokenized',
        });
      }

      // send the prompt to service
      const chatgptService = new ChatgptService();

      const chatgptResponse = await chatgptService.askChatgpt(data.prompt);
      if (!chatgptResponse) {
        return res
          .status(408)
          .json({ code: 'TIMEOUT', message: 'ChatGPT taking time to respond' });
      }

      return res.status(200).json(safeJSON(chatgptResponse));
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new ChatgptsController();
