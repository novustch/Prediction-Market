import { Router } from "express";
import { referral } from "../../controller"
const router = Router();

router.post("/", referral.getReferCode);
router.post("/claim", referral.claimReward);

export default router