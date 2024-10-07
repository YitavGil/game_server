import express from 'express';
import { getAllGames, createGame } from '../controllers/gameController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllGames);
router.post('/', authenticate, createGame);

export default router;