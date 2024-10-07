// ייבוא של מודל המשחק והממשק שלו
import Game, { IGame } from '../models/Game';

// פונקציה להחזרת כל המשחקים
export const getGames = async (): Promise<IGame[]> => {
  return Game.find();
};

// פונקציה להוספת משחק חדש
export const addGame = async (gameData: IGame): Promise<IGame> => {
  const newGame = new Game(gameData);
  return newGame.save();
};

// פונקציה לעדכון משחק קיים
export const updateGame = async (id: string, gameData: Partial<IGame>): Promise<IGame | null> => {
  // מחפשת משחק לפי ID, מעדכנת אותו ומחזירה את המסמך המעודכן
  return Game.findByIdAndUpdate(id, gameData, { new: true });
};

// פונקציה למחיקת משחק
export const deleteGame = async (id: string): Promise<IGame | null> => {
  // מוחקת משחק לפי ID ומחזירה את המסמך שנמחק
  return Game.findByIdAndDelete(id);
};

// פונקציה להחזרת סטטיסטיקות על המשחקים
export const getGameStats = async () => {
  // שימוש ב-Aggregation Framework ל-שאילתות מורכבות
  return Game.aggregate([
    {
      // קיבוץ המשחקים לפי ז'אנר
      $group: {
        _id: '$genre',
        count: { $sum: 1 },  // ספירת המשחקים בכל ז'אנר
        avgPrice: { $avg: '$price' },  // חישוב המחיר הממוצע
        titles: { $push: '$title' }  // איסוף כל הכותרות
      }
    },
    {
      // מיון התוצאות לפי מספר המשחקים בסדר יורד
      $sort: { count: -1 }
    },
    {
      // עיצוב הפלט הסופי
      $project: {
        _id: 0,  // הסרת שדה ה-ID המקורי
        genre: '$_id',  // שינוי שם השדה מ-_id ל-genre
        count: 1,  // כלילת שדה ה-count
        avgPrice: { $round: ['$avgPrice', 2] },  // עיגול המחיר הממוצע לשתי ספרות אחרי הנקודה
        titles: { $slice: ['$titles', 5] }  // הגבלה ל-5 הכותרות הראשונות
      }
    }
  ]);
};

// הערה: ה-DAL הזה מדגים פעולות MongoDB מתקדמות, כולל אגרגציה