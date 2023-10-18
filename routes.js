import express from 'express';
import ChatgptsController from './Controller/ChatgptsController.js';
const router = express();

router.get('/', (req, res) => {
    res.render('welcome');
});

router.post('/evifi/tokenize', ChatgptsController.validationRules(), ChatgptsController.askChatgpt);

export default router;
