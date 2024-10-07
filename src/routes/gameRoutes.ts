import express from 'express';
import { getAllGames, createGame, updateGameById, deleteGameById, getGameStatistics } from '../controllers/gameController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getAllGames);
router.post('/', authMiddleware, createGame);
router.put('/:id', authMiddleware, updateGameById);
router.delete('/:id', authMiddleware, deleteGameById);
router.get('/stats', getGameStatistics);

export default router;

// Note: This router demonstrates RESTful route definitions and middleware usage
// The authMiddleware is now correctly typed and should not cause TypeScript errors