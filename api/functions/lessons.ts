import db from 'api/db';
import Lesson from 'api/models/Lesson';
import { ILesson } from 'interfaces';

export const getLessons = async (): Promise<ILesson[]> => {
  await db.connect();

  const lessons = await Lesson.find();

  await db.disconnect();

  return JSON.parse(JSON.stringify(lessons));
};
