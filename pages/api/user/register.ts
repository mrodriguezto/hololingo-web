import { NextApiRequest, NextApiResponse } from 'next';

import { IUser } from 'interfaces';
import { validations } from 'utils/validations';
import db from 'api/db';
import User from 'api/models/User';
import bcrypt from 'bcryptjs';

type Data = { message: string } | IUser;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(400).json({
      message: 'Only allowed on development',
    });
  }

  switch (req.method) {
    case 'POST':
      return registerUser(req, res);

    default:
      res.status(400).json({ message: 'Bad Request' });
  }
}

type RegisterBody = {
  email: string;
  password: string;
  name: string;
};

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email = '', password = '', name = '' } = req.body as RegisterBody;

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
    role: 'user',
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
