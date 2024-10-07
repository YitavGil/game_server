// ייבוא הטיפוסים הנדרשים מ-Express
import { Request, Response, NextFunction } from 'express';
// ייבוא ספריית JWT לטיפול בטוקנים
import jwt from 'jsonwebtoken';

// הגדרת ממשק מורחב של Request שכולל שדה user אופציונלי
interface AuthRequest extends Request {
  user?: { userId: string };
}

// middleware לאימות המשתמש
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // ניסיון לחלץ את הטוקן מכותרת ה-Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // אם אין טוקן, מחזיר שגיאת 401
  if (!token) {
    res.status(401).json({ message: 'אין טוקן, הגישה נדחתה' });
    return;
  }

  try {
    // ניסיון לאמת את הטוקן
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    // אם האימות הצליח, מוסיף את פרטי המשתמש לאובייקט הבקשה
    req.user = decoded;
    // ממשיך לפונקציה הבאה בשרשרת הטיפול בבקשה
    next();
  } catch (error) {
    // אם יש שגיאה באימות, מחזיר שגיאת 401
    res.status(401).json({ message: 'הטוקן אינו תקף' });
  }
};

// הערה: middleware זה בודק את תקפות הטוקן JWT ומוסיף את פרטי המשתמש לבקשה אם הטוקן תקף

// Note: This middleware demonstrates JWT-based authentication
// The function signature has been updated to match Express middleware expectations