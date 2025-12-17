import { Router } from "express";
import { getProfile } from "../../controller";

const router = Router();

router.get("/", getProfile.getProfileData);

export default router;