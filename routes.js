import express from 'express';
import ChatgptsController from './Controller/ChatgptsController.js';
const router = express();

router.get('/', (req, res) => {
  res.render('homepage', {
    title: 'Awesome Homepage',
    name: 'Bob',
  });
});

router.post(
  '/evifi/tokenize',
  ChatgptsController.validationRules(),
  ChatgptsController.askChatgpt,
);

export default router;
