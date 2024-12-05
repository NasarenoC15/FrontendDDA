// lib/auth.js
import jwt from 'jsonwebtoken';

const secret = 'asdsa109w3u31jas0d0iasn01i0nasd01`230nidas0nd029i3'; // Deberías almacenar esto de forma segura

export const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn : '5m'}); // El token expirará en 1 hora
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
};
