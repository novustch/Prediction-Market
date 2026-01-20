/**
 * Polymarket Routes
 */

import { Router } from 'express';
import { getBitcoinMarkets, getMarketById } from '../../controller/polymarket';

const router = Router();

// Get all Bitcoin markets
router.get('/bitcoin', getBitcoinMarkets);

// Get specific market by ID
router.get('/market/:id', getMarketById);

export default router;
