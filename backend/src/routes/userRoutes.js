import express from 'express';
import { loginUser } from '../controllers/userController.js';

const router = express.Router();

// POST /api/users/login
router.post('/login', loginUser);

export default router;
