import type { NextApiRequest, NextApiResponse } from 'next';
import db from 'api/db';
import Lesson from 'api/models/Lesson';
import { ILesson } from 'interfaces';
import { isValidObjectId } from 'mongoose';

type Data = { message: string } | ILesson;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { lessonId = '' } = req.query;

  if (!isValidObjectId(lessonId))
    return res.status(400).json({
      message: 'The given id is not valid:' + lessonId,
    });

  switch (req.method) {
    case 'GET':
      return getLessonById(req, res);
    case 'PUT':
      return updateLesson(req, res);
    case 'DELETE':
      return deleteLesson(req, res);

    default:
      res.status(400).json({ message: 'Bad Request' });
  }
}

async function getLessonById(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { lessonId = '' } = req.query;

  await db.connect();

  const lesson = await Lesson.findById(lessonId);

  if (!lesson)
    return res.status(400).json({
      message: "Lesson with the given id doesn't exist",
    });

  await db.disconnect();

  res.status(200).json(lesson);
}

async function updateLesson(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { lessonId = '' } = req.query;
  const data = req.body;

  await db.connect();

  let lessonUpdated;

  lessonUpdated = await Lesson.findByIdAndUpdate(lessonId, data, {
    new: true,
  });

  if (!lessonUpdated) {
    return res.status(400).json({
      message: 'Lesson not found',
    });
  }

  await db.disconnect();

  return res.status(200).json(lessonUpdated);
}

async function deleteLesson(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { lessonId = '' } = req.query;

  await db.connect();

  let lessonDeleted;

  lessonDeleted = await Lesson.findByIdAndDelete(lessonId, {
    new: true,
  });

  if (!lessonDeleted) {
    return res.status(400).json({
      message: 'Lesson not found',
    });
  }

  await db.disconnect();

  return res.status(200).json(lessonDeleted);
}
