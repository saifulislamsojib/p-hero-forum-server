import configs from '@/configs';
import { AuthPayload } from '@/types/auth';
import { verify } from 'jsonwebtoken';

const checkJWT = (token?: string): AuthPayload | null => {
  if (token && token.startsWith('Bearer ') && token.split(' ')[1]) {
    return verify(token.split(' ')[1], configs.jwt_secret) as AuthPayload;
  }
  return null;
};

export default checkJWT;
