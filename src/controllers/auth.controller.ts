import { createUser, getUserByEmail, getUserById } from '@/services/auth.service';
import AnyObject from '@/types/anyObject';
import { Auth, LoginBody, ValidationError } from '@/types/auth';
import createJwtToken from '@/utils/createJwtToken';
import getPayload from '@/utils/getPayload';
import handleError from '@/utils/handleError';
import { compare, hash } from 'bcrypt';
import { Request, Response } from 'express';

export const registration = async (req: Request<AnyObject, AnyObject, Auth>, res: Response) => {
  const { name, email, password: plainPassword, batch, role } = req.body;
  try {
    const password = await hash(plainPassword, 10);
    const user = await createUser({
      name,
      email,
      password,
      batch,
      role,
    });
    const payload = getPayload(user);
    const token = createJwtToken(payload);
    res
      .cookie('jwtToken', `Bearer ${token}`, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 182 * 24 * 60 * 60,
      })
      .status(201)
      .json({ auth: payload, token, message: 'Account Register Successfully' });
  } catch (err) {
    const errors = handleError(err as ValidationError);
    res.status(203).json({ errors });
  }
};

export const login = async (req: Request<AnyObject, AnyObject, LoginBody>, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user?._id) {
      const isValidPassword = await compare(password, user.password);
      if (isValidPassword) {
        const auth = getPayload(user);
        const token = createJwtToken(auth);
        res
          .cookie('jwtToken', `Bearer ${token}`, {
            secure: true,
            httpOnly: true,
            sameSite: 'none',
            maxAge: 182 * 24 * 60 * 60,
          })
          .status(201)
          .json({ auth, token, message: 'Account Login Successfully' });
      } else {
        res.status(203).json({ error: 'Invalid Email or Password' });
      }
    } else {
      res.status(203).json({ error: 'Invalid Email or Password' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export const authCheckResponse = async (req: Request, res: Response) => {
  res.status(201).json({ auth: req.auth });
};

export const getLoggedInUser = async (req: Request, res: Response) => {
  const { _id } = req.auth!;
  try {
    const user = await getUserById(_id);
    if (user?._id) {
      const auth = getPayload(user);
      res.status(201).json({ auth });
    } else {
      res.status(401).json({ message: 'Invalid token' });
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
