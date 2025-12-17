import { Router } from "express";
import { oracle } from "../../controller";
import { proposeValidator } from "../../middleware/proposeValidator";

const router = Router();

router.post("/registFeed", proposeValidator, oracle.registFeed);

export default router;