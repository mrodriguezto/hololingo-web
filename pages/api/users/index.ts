import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import db from 'api/db';
import User from 'api/models/User';
import { IUser } from 'interfaces';
import { validations } from 'utils/validations';

type Data = { message: string } | IUser | IUser[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res);
    case 'POST':
      return registerUser(req, res);

    default:
      res.status(400).json({ message: 'Bad Request' });
  }
}

async function getUsers(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();
  let users;
  try {
    users = await User.find().lean();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
  await db.disconnect();

  return res.status(200).json(users);
}

type RegisterBody = {
  email: string;
  password: string;
  name: string;
  role: string;
};

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    email = '',
    password = '',
    name = '',
    role = 'user',
  } = req.body as RegisterBody;

  // Validations

  if (name.length < 2)
    return res.status(400).json({
      message: 'Name must be at least 2 characters long',
    });

  if (password.length < 8)
    return res.status(400).json({
      message: 'Password must be at least 8 characters long',
    });

  if (!validations.isValidEmail(email))
    return res.status(400).json({
      message: 'Email has an invalid format',
    });

  // Validate existing user

  await db.connect();

  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: 'This email already has an associated account' });
  }

  // Create new user

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role,
    name,
    score: 0,
    issuer: 'admin-platform',
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Something went wrong',
    });
  }

  await db.disconnect();

  return res.status(201).json(newUser);
}
