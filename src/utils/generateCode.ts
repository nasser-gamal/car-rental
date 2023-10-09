import * as crypto from 'crypto';

export const hash = (code: string) =>
  crypto.createHash('sha512').update(code).digest('hex');

export const generateCode = () => {
  const randomCode = crypto.randomInt(100000, 999999).toString();
  const hashCode = hash(randomCode);
  return { randomCode, hashCode };
};
