import express from 'express';
import { startInterview, submitInterview, getInterviewResult } from '../controllers/interview.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/start', protect, startInterview);
router.post('/submit', protect, submitInterview);
router.get('/:sessionId/result', protect, getInterviewResult);

export default router;
