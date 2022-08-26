import type { NextApiRequest, NextApiResponse } from 'next';
import { ILesson } from 'interfaces';
import Lesson from 'api/models/Lesson';
import db from 'api/db';

type Data = { message: string } | ILesson | ILesson[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getLessons(req, res);
    case 'POST':
      return createLesson(req, res);

    default:
      res.status(400).json({ message: 'Bad Request' });
  }
}

async function getLessons(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();
  let lessons;
  try {
    lessons = await Lesson.find().lean();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
  await db.disconnect();

  return res.status(200).json(lessons);
}

interface LessonBody {
  title: string;
  description: string;
  example: string;
  category_name: string;
}

async function createLesson(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { title, description, example, category_name } = req.body as LessonBody;

  const newLesson = new Lesson({
    title,
    description,
    category_name,
    example,
  });

  await db.connect();

  try {
    await newLesson.save();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Something went wrong',
    });
  }

  await db.disconnect();

  return res.status(201).json(newLesson);
}
