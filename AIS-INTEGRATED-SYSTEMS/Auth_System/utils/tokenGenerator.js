import jwt from "jsonwebtoken";

const tokenGenerator = (id) => {
    const secret = process.env.SECRET || 'ais_dev_secret_2026';
    return jwt.sign({ id }, secret, { expiresIn: '3d' });
};

export default tokenGenerator;
