import express from 'express';
import { sendCode, validateCode } from '../controllers/AuthController';

const router = express.Router();

router.post('/send-code', async (req, res, next) => {
  try {
    await sendCode(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/validate-code', async (req, res, next) => {
  try {
    await validateCode(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
