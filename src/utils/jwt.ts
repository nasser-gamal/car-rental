import jwt from 'jsonwebtoken';

const createToken = (payload: Record<string, unknown>) => {
  return jwt.sign({ user: payload }, 'config.JWT_SECRET_TOKEN', {
    // expiresIn: config.JWT_EXPIRE,
  });
};

export default createToken;
