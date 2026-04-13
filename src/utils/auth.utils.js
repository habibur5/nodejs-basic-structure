import jwt from 'jsonwebtoken';


export const generateToken = (user) => {
  const payload = {
    id: user._id
  };
  const secretKey = process.env.JWT_SECRET;
  const cokie = jwt.sign(
    payload, 
    secretKey, 
    { 
      expiresIn: '1h',
      algorithm: 'HS256',
      domain: 'localhost',  
    }
  );
  return cokie;
};

export const verifyToken = (token) => {
  try {
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
};

export const clearToken = (res) => {
  res.clearCookie('token', 
    { domain: 'localhost' }
  );
};

