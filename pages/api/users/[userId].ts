import type { NextApiRequest, NextApiResponse } from 'next';

import db from 'api/db';
import User from 'api/models/User';
import { IUser } from 'interfaces';
import { isValidObjectId } from 'mongoose';

type Data = { message: string } | IUser | IUser[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { userId = '' } = req.query;

  if (!isValidObjectId(userId))
    return res.status(400).json({
      message: 'The given id is not valid:' + userId,
    });

  switch (req.method) {
    case 'GET':
      return getUserById(req, res);
    case 'PUT':
      return updateUser(req, res);
    case 'DELETE':
      return deleteUser(req, res);

    default:
      res.status(400).json({ message: 'Bad Request' });
  }
}

async function getUserById(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { userId = '' } = req.query;

  await db.connect();

  const user = await User.findById(userId);

  if (!user)
    return res.status(400).json({
      message: "User with the given id doesn't exist",
    });

  await db.disconnect();

  res.status(200).json(user);
}

async function updateUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { userId = '' } = req.query;
  const data = req.body;

  await db.connect();

  let userUpdated;

  userUpdated = await User.findByIdAndUpdate(userId, data, {
    new: true,
  });

  if (!userUpdated) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  await db.disconnect();

  return res.status(200).json(userUpdated);
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { userId = '' } = req.query;

  await db.connect();

  let userDeleted;

  userDeleted = await User.findByIdAndDelete(userId, {
    new: true,
  });

  if (!userDeleted) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  await db.disconnect();

  return res.status(200).json(userDeleted);
}
