import AnyObject from '@/types/anyObject';
import { ValidationError } from '@/types/auth';

const handleError = (err: ValidationError): AnyObject => {
  const errors = {} as AnyObject;

  // duplicate email and phone error
  if (err.code === 11000) {
    if (err.keyPattern.email) {
      errors.email = 'This email is already used in an another account';
    }
    if (err.keyPattern.phone) {
      errors.phone = 'This phone number is already used in an another account';
    }
  }

  // validation error
  if (err.message.includes('validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

export default handleError;
