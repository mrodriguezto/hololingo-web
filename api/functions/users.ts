import bcrypt from 'bcryptjs';
import db from 'api/db';
import User from 'api/models/User';

export const checkUserEmailPassword = async (email: string, password: string) => {
  await db.connect();

  const user = await User.findOne({ email });

  await db.disconnect();

  if (!user || user.role !== 'admin') {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password!)) return null;

  return user;
};
