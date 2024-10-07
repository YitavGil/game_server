import { Request, Response, NextFunction } from 'express';
import { getGames, addGame, updateGame, deleteGame, getGameStats } from '../DAL/gameDAL';
import { CustomError } from '../middleware/errorMiddleware';

export const getAllGames = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const games = await getGames();
    res.json(games);
  } catch (error) {
    next(new CustomError('Error fetching games', 500));
  }
};

export const createGame = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newGame = await addGame(req.body);
    res.status(201).json(newGame);
  } catch (error) {
    next(new CustomError('Error creating game', 400));
  }
};

export const updateGameById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedGame = await updateGame(req.params.id, req.body);
    if (!updatedGame) {
      throw new CustomError('Game not found', 404);
    }
    res.json(updatedGame);
  } catch (error) {
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError('Error updating game', 400));
    }
  }
};

export const deleteGameById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await deleteGame(req.params.id);
    if (!result) {
      throw new CustomError('Game not found', 404);
    }
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError('Error deleting game', 400));
    }
  }
};

export const getGameStatistics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stats = await getGameStats();
    res.json(stats);
  } catch (error) {
    next(new CustomError('Error fetching game statistics', 500));
  }
};

// Note: This controller now uses CustomError for more specific error handling