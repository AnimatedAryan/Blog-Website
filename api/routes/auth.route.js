import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';
import { google } from '../controllers/auth.controller.js';
const router=express();
router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google)
export default router;