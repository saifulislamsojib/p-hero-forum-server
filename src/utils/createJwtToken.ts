import configs from '@/configs';
import { AuthPayload } from '@/types/auth';
import { sign } from 'jsonwebtoken';

const createJwtToken = (payload: AuthPayload): string => {
  const { jwt_secret, jwt_expires } = configs;
  return sign(payload, jwt_secret, {
    expiresIn: jwt_expires,
  });
};

export default createJwtToken;
