import { Auth, AuthPayload } from '@/types/auth';

const getPayload = (user: Auth | AuthPayload): AuthPayload => {
  const { _id, name, email, batch, role } = user;

  return {
    _id,
    name,
    email,
    batch,
    role,
  };
};

export default getPayload;
