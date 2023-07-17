import { Auth, AuthPayload } from '@/types/auth';

const getPayload = (user: Auth | AuthPayload): AuthPayload => {
  const { name, email, phone, _id } = user;

  return {
    name,
    email,
    phone,
    _id,
  };
};

export default getPayload;
