import express from 'express';
import { addKeyword, searchKeywords } from '../controllers/keywordController.js';

const router = express.Router();

router.post('/keywords', addKeyword);
router.get('/search', searchKeywords);

export default router;