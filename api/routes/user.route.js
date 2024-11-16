import express from "express";

import { verifyToken } from '../utils/verifyUser.js';
import { deleteUser, getUsers, signout, test, updateUser } from '../controllers/user.controller.js';
const router=express.Router();
router.get('/test', test);
router.delete('/delete/:userId', verifyToken,deleteUser);
router.put('/update/:userId', verifyToken,updateUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);

export default router;