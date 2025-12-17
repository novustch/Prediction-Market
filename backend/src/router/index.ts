import { Router, Request, Response } from "express";
import marketRouter from "./market";
import oracleRouter from "./oracle";
import referralRouter from './referral';
import getProfile from './profile'

const router = Router();
router.use("/market", marketRouter);
router.use("/oracle", oracleRouter);
router.use("/referral", referralRouter);
router.use("/profile", getProfile);

export default router;
