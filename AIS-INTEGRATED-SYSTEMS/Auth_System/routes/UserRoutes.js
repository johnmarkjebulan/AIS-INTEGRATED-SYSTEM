import * as UserController from '../controllers/UserController.js';
import { authenticateToken } from '../middleware/authHandler.js';
import express from 'express';

const userRoutes = express.Router();

userRoutes.post('/register', UserController.register);
userRoutes.post('/login', UserController.login);
userRoutes.get('/profile', authenticateToken, UserController.getMyProfile);
userRoutes.get('/profile/:legacyStudentId', UserController.getProfileByLegacyId);

export default userRoutes;
