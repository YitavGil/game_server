import { Request, Response } from 'express';
import Game from '../models/Game';

export const getAllGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games' });
  }
};

export const createGame = async (req: Request, res: Response) => {
  try {
    const { title, genre, price, releaseDate } = req.body;

    const newGame = new Game({
      title,
      genre,
      price,
      releaseDate
    });

    await newGame.save();

    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ message: 'Error creating game' });
  }
};